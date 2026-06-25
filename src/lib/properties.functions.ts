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

const propsSchema = z.object({
  product_id: z.string().uuid(),
  density: z.number().nullable().optional(),
  tensile_strength: z.number().nullable().optional(),
  elongation: z.number().nullable().optional(),
  flexural_modulus: z.number().nullable().optional(),
  impact_strength: z.number().nullable().optional(),
  heat_deflection_temperature: z.number().nullable().optional(),
  melt_flow_index: z.number().nullable().optional(),
  ul94_rating: z.string().max(40).default(""),
  notes: z.string().max(2000).default(""),
});

export const upsertProductProperties = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input) => propsSchema.parse(input))
  .handler(async ({ data, context }) => {
    const { supabase, userId } = context;
    await assertAdmin(userId);
    const { error, data: row } = await supabase
      .from("product_properties")
      .upsert(data, { onConflict: "product_id" })
      .select()
      .single();
    if (error) throw new Error(error.message);
    return row;
  });
