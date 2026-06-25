import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const docSchema = z.object({
  name: z.string().min(1).max(200),
  url: z.string().url().max(2000),
});

const productSchema = z.object({
  id: z.string().uuid().optional(),
  slug: z.string().min(1).max(120).regex(/^[a-z0-9-]+$/, "slug 仅允许小写字母、数字、短横"),
  brand: z.string().min(1).max(60),
  brand_id: z.string().uuid().nullable().optional(),
  material_category_id: z.string().uuid().nullable().optional(),
  series: z.string().max(120).default(""),
  material: z.string().max(120).default(""),
  model: z.string().max(120).default(""),
  grades: z.array(z.string().max(120)).max(500).default([]),
  feature: z.string().max(2000).default(""),
  description_zh: z.string().max(5000).default(""),
  description_en: z.string().max(5000).default(""),
  applications: z.array(z.string().max(200)).max(50).default([]),
  image_url: z.string().max(2000).default(""),
  images: z.array(z.string().url().max(2000)).max(20).default([]),
  docs: z.array(docSchema).max(20).default([]),
  datasheet_url: z.string().max(2000).default(""),
  flame_retardant: z.boolean().default(false),
  high_temperature: z.boolean().default(false),
  wear_resistance: z.boolean().default(false),
  food_contact: z.boolean().default(false),
  high_flow: z.boolean().default(false),
  transparent: z.boolean().default(false),
  sort_order: z.number().int().optional(),
});

async function assertAdmin(userId: string) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin
    .from("user_roles")
    .select("role")
    .eq("user_id", userId)
    .eq("role", "admin")
    .maybeSingle();
  if (error) throw new Error(error.message);
  if (!data) throw new Error("Forbidden: 仅管理员可执行此操作");
}

export const upsertProduct = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => productSchema.parse(input))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    await assertAdmin(userId);
    const { error, data: row } = await supabase
      .from("products")
      .upsert(data, { onConflict: "slug" })
      .select()
      .single();
    if (error) throw new Error(error.message);
    return row;
  });

export const deleteProduct = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    await assertAdmin(userId);
    const { error } = await supabase.from("products").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const bulkImportProducts = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) =>
    z.object({
      rows: z.array(productSchema.omit({ id: true })).min(1).max(2000),
      mode: z.enum(["upsert", "insert"]).default("upsert"),
    }).parse(input),
  )
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    await assertAdmin(userId);
    const q =
      data.mode === "upsert"
        ? supabase.from("products").upsert(data.rows, { onConflict: "slug" })
        : supabase.from("products").insert(data.rows);
    const { error, data: rows } = await q.select();
    if (error) throw new Error(error.message);
    return { inserted: rows?.length ?? 0 };
  });

export const checkIsAdmin = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { userId } = context;
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data, error } = await supabaseAdmin
      .from("user_roles")
      .select("role")
      .eq("user_id", userId)
      .eq("role", "admin")
      .maybeSingle();
    if (error) throw new Error(error.message);
    return { isAdmin: !!data, userId };
  });
