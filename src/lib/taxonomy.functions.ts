import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

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

// ===== Brands =====
const brandSchema = z.object({
  id: z.string().uuid().optional(),
  code: z.string().min(1).max(60).regex(/^[a-z0-9-]+$/, "code 仅允许小写字母、数字、短横"),
  name: z.string().min(1).max(120),
  country: z.string().max(60).default(""),
  description: z.string().max(2000).default(""),
  logo_url: z.string().max(2000).default(""),
  sort_order: z.number().int().default(0),
});

export const upsertBrand = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => brandSchema.parse(input))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    await assertAdmin(userId);
    const { error, data: row } = await supabase
      .from("brands")
      .upsert(data, { onConflict: "code" })
      .select()
      .single();
    if (error) throw new Error(error.message);
    return row;
  });

export const deleteBrand = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    await assertAdmin(userId);
    const { error } = await supabase.from("brands").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

// ===== Material Categories =====
const materialSchema = z.object({
  id: z.string().uuid().optional(),
  code: z.string().min(1).max(60).regex(/^[a-z0-9-]+$/, "code 仅允许小写字母、数字、短横"),
  name_zh: z.string().min(1).max(120),
  name_en: z.string().min(1).max(120),
  description: z.string().max(2000).default(""),
  sort_order: z.number().int().default(0),
});

export const upsertMaterialCategory = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => materialSchema.parse(input))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    await assertAdmin(userId);
    const { error, data: row } = await supabase
      .from("material_categories")
      .upsert(data, { onConflict: "code" })
      .select()
      .single();
    if (error) throw new Error(error.message);
    return row;
  });

export const deleteMaterialCategory = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    await assertAdmin(userId);
    const { error } = await supabase.from("material_categories").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
