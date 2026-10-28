import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export type Bi = { en: string; zh: string };
export type Perf = { title_en: string; title_zh: string; en: string; zh: string };

export type GradeProperty = {
  property_name: string;
  property_name_zh: string;
  unit: string;
  test_method: string;
  value: string;
};

export type GradeDoc = { document_name: string; document_type: string; language: string; url: string | null };

export type GradeData = {
  brand_name: string;
  series_slug: string;
  series_name: string;
  material: string;
  material_full_en: string;
  material_full_zh: string;
  grade_code: string;
  grade_name: string;
  slug: string;
  subtitle_en: string;
  subtitle_zh: string;
  focus_en: string;
  focus_zh: string;
  description_en: string;
  description_zh: string;
  meta_description_en: string;
  meta_description_zh: string;
  features: Bi[];
  key_features: Bi[];
  applications: Bi[];
  performance: Perf[];
  updated_at: string;
};

export type GradeLink = { grade_code: string; grade_name: string; slug: string; series_slug: string };

async function publicClient() {
  const { createClient } = await import("@supabase/supabase-js");
  return createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_PUBLISHABLE_KEY!, {
    auth: { persistSession: false, autoRefreshToken: false, storage: undefined },
  });
}

const slugRe = /^[a-z0-9-]+$/;

export const getGradePage = createServerFn({ method: "GET" })
  .inputValidator((d: unknown) =>
    z.object({ series: z.string().max(120).regex(slugRe), grade: z.string().max(120).regex(slugRe) }).parse(d),
  )
  .handler(async ({ data }) => {
    const sb = await publicClient();
    const { data: g, error } = await sb
      .from("product_grades")
      .select("*")
      .eq("series_slug", data.series)
      .eq("slug", data.grade)
      .eq("is_active", true)
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!g) return null;

    const [{ data: props }, { data: docs }, { data: siblings }] = await Promise.all([
      sb.from("physical_properties")
        .select("property_name, property_name_zh, unit, test_method, value")
        .eq("grade_id", g.id)
        .order("display_order", { ascending: true }),
      sb.from("product_documents").select("document_name, document_type, language, storage_path, public_url").eq("grade_id", g.id),
      sb.from("product_grades")
        .select("grade_code, grade_name, slug, series_slug")
        .eq("series_slug", data.series)
        .eq("is_active", true)
        .neq("id", g.id)
        .order("grade_code"),
    ]);

    // Documents live in a private bucket; hand out short-lived signed links.
    const outDocs: GradeDoc[] = [];
    if (docs?.length) {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      for (const d of docs) {
        let url: string | null = d.public_url || null;
        if (d.storage_path) {
          const { data: s } = await supabaseAdmin.storage
            .from("product-documents")
            .createSignedUrl(d.storage_path, 60 * 60 * 6, { download: d.document_name });
          url = s?.signedUrl ?? url;
        }
        outDocs.push({ document_name: d.document_name, document_type: d.document_type, language: d.language, url });
      }
    }

    return {
      grade: g as unknown as GradeData,
      properties: (props ?? []) as GradeProperty[],
      documents: outDocs,
      related: (siblings ?? []) as GradeLink[],
    };
  });

export const listGradesBySeries = createServerFn({ method: "GET" })
  .inputValidator((d: unknown) => z.object({ series: z.string().max(120).regex(slugRe) }).parse(d))
  .handler(async ({ data }) => {
    const sb = await publicClient();
    const { data: rows } = await sb
      .from("product_grades")
      .select("grade_code, grade_name, slug, series_slug")
      .eq("series_slug", data.series)
      .eq("is_active", true)
      .order("grade_code");
    return (rows ?? []) as GradeLink[];
  });
