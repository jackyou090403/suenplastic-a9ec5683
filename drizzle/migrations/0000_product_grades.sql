CREATE TABLE public.product_grades (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id uuid REFERENCES public.brands(id) ON DELETE SET NULL,
  product_id uuid REFERENCES public.products(id) ON DELETE SET NULL,
  brand_name text NOT NULL DEFAULT '',
  series_slug text NOT NULL,
  series_name text NOT NULL DEFAULT '',
  material text NOT NULL DEFAULT '',
  material_full_en text NOT NULL DEFAULT '',
  material_full_zh text NOT NULL DEFAULT '',
  grade_code text NOT NULL,
  grade_name text NOT NULL DEFAULT '',
  slug text NOT NULL,
  subtitle_en text NOT NULL DEFAULT '',
  subtitle_zh text NOT NULL DEFAULT '',
  focus_en text NOT NULL DEFAULT '',
  focus_zh text NOT NULL DEFAULT '',
  description_en text NOT NULL DEFAULT '',
  description_zh text NOT NULL DEFAULT '',
  meta_description_en text NOT NULL DEFAULT '',
  meta_description_zh text NOT NULL DEFAULT '',
  features jsonb NOT NULL DEFAULT '[]'::jsonb,
  key_features jsonb NOT NULL DEFAULT '[]'::jsonb,
  application_en text NOT NULL DEFAULT '',
  application_zh text NOT NULL DEFAULT '',
  applications jsonb NOT NULL DEFAULT '[]'::jsonb,
  performance jsonb NOT NULL DEFAULT '[]'::jsonb,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (series_slug, slug)
);
GRANT SELECT ON public.product_grades TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.product_grades TO authenticated;
GRANT ALL ON public.product_grades TO service_role;
ALTER TABLE public.product_grades ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read active grades" ON public.product_grades FOR SELECT TO anon, authenticated USING (is_active OR public.has_role(auth.uid(),'admin'::app_role));
CREATE POLICY "Admins insert grades" ON public.product_grades FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(),'admin'::app_role));
CREATE POLICY "Admins update grades" ON public.product_grades FOR UPDATE TO authenticated USING (public.has_role(auth.uid(),'admin'::app_role)) WITH CHECK (public.has_role(auth.uid(),'admin'::app_role));
CREATE POLICY "Admins delete grades" ON public.product_grades FOR DELETE TO authenticated USING (public.has_role(auth.uid(),'admin'::app_role));
CREATE TRIGGER trg_grades_updated BEFORE UPDATE ON public.product_grades FOR EACH ROW EXECUTE FUNCTION public.tg_set_updated_at();

CREATE TABLE public.physical_properties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  grade_id uuid NOT NULL REFERENCES public.product_grades(id) ON DELETE CASCADE,
  property_name text NOT NULL,
  property_name_zh text NOT NULL DEFAULT '',
  unit text NOT NULL DEFAULT '',
  test_method text NOT NULL DEFAULT '',
  value text NOT NULL DEFAULT '',
  display_order integer NOT NULL DEFAULT 0
);
GRANT SELECT ON public.physical_properties TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.physical_properties TO authenticated;
GRANT ALL ON public.physical_properties TO service_role;
ALTER TABLE public.physical_properties ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read properties" ON public.physical_properties FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins write properties" ON public.physical_properties FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin'::app_role)) WITH CHECK (public.has_role(auth.uid(),'admin'::app_role));

CREATE TABLE public.product_documents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  grade_id uuid NOT NULL REFERENCES public.product_grades(id) ON DELETE CASCADE,
  document_name text NOT NULL,
  document_type text NOT NULL DEFAULT 'technical-data-sheet',
  language text NOT NULL DEFAULT 'zh',
  storage_path text NOT NULL DEFAULT '',
  public_url text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.product_documents TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.product_documents TO authenticated;
GRANT ALL ON public.product_documents TO service_role;
ALTER TABLE public.product_documents ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read documents" ON public.product_documents FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins write documents" ON public.product_documents FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin'::app_role)) WITH CHECK (public.has_role(auth.uid(),'admin'::app_role));

CREATE POLICY "Admins read product-documents" ON storage.objects FOR SELECT TO authenticated USING (bucket_id = 'product-documents' AND public.has_role(auth.uid(),'admin'::app_role));
CREATE POLICY "Admins upload product-documents" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'product-documents' AND public.has_role(auth.uid(),'admin'::app_role));
CREATE POLICY "Admins update product-documents" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'product-documents' AND public.has_role(auth.uid(),'admin'::app_role));
CREATE POLICY "Admins delete product-documents" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'product-documents' AND public.has_role(auth.uid(),'admin'::app_role));

WITH g AS (
  INSERT INTO public.product_grades (brand_id, product_id, brand_name, series_slug, series_name, material, material_full_en, material_full_zh, grade_code, grade_name, slug, subtitle_en, subtitle_zh, focus_en, focus_zh, description_en, description_zh, meta_description_en, meta_description_zh, features, key_features, application_en, application_zh, applications, performance)
  VALUES (
    (SELECT id FROM public.brands WHERE name ILIKE 'polyplastics%' OR code ILIKE 'polyplastics%' LIMIT 1),
    (SELECT id FROM public.products WHERE slug = 'duracon-pom' LIMIT 1),
    'Polyplastics','duracon-pom','DURACON® POM','POM','POM (Polyoxymethylene)','POM（聚甲醛）','NW-02','DURACON® POM NW-02','nw-02',
    'High Sliding Grade','高滑动级',
    'Sliding / Wear-resistant Components','滑动 / 耐磨部件',
    E'DURACON® POM NW-02 is a sliding grade of polyacetal (POM) developed for applications requiring improved sliding properties, wear resistance and low sliding noise.\n\nNW-02 provides stable friction and wear characteristics over a broad range of loads and temperatures. It combines the sliding characteristics of previously developed DURACON® POM grades and is suitable for a wide range of sliding components.',
    E'DURACON® POM NW-02 是一款聚甲醛（POM）滑动级牌号，适用于需要更佳滑动性能、耐磨性和低滑动噪音的应用。\n\nNW-02 在较宽的负荷与温度范围内具有稳定的摩擦磨耗特性，兼具此前开发的 DURACON® POM 各滑动牌号的特点，适用于多种滑动部件。',
    'DURACON POM NW-02 is a high-sliding POM grade from Polyplastics, offering stable friction and wear characteristics, low sliding noise and good flowability. Contact Suen Plastic for material availability and quotation.',
    'DURACON POM NW-02 是宝理（Polyplastics）的高滑动 POM 牌号，具有稳定的摩擦磨耗特性、低滑动噪音和良好的流动性。欢迎联系塑恩贸易咨询货源与报价。',
    '[{"en":"Stable friction and wear characteristics from low to high loads.","zh":"从低负荷到高负荷均具有稳定的摩擦磨耗特性。"},{"en":"Stable friction and wear characteristics from low to high temperatures.","zh":"从低温到高温均具有稳定的摩擦磨耗特性。"},{"en":"Good friction and wear characteristics regardless of the mating material.","zh":"无论对磨材料为何，均具有良好的摩擦磨耗特性。"},{"en":"Low sliding noise in applications such as gears.","zh":"在齿轮等应用中滑动噪音低。"},{"en":"High flowability.","zh":"高流动性。"},{"en":"Good moldability comparable to general DURACON® POM grades.","zh":"成型性良好，与通用 DURACON® POM 牌号相当。"}]'::jsonb,
    '[{"en":"High Sliding Performance","zh":"高滑动性能"},{"en":"Stable Friction & Wear","zh":"稳定的摩擦磨耗"},{"en":"Low Sliding Noise","zh":"低滑动噪音"},{"en":"High Flowability","zh":"高流动性"},{"en":"Good Moldability","zh":"良好成型性"},{"en":"Suitable for Sliding Components","zh":"适用于滑动部件"}]'::jsonb,
    'Sliding Applications; Gear Applications','滑动应用；齿轮应用',
    '[{"en":"Sliding Components","zh":"滑动部件"},{"en":"Gears","zh":"齿轮"},{"en":"Mechanical Components","zh":"机械部件"},{"en":"Wear-resistant Parts","zh":"耐磨零件"},{"en":"Sliding Parts","zh":"滑动零件"},{"en":"Gear Components","zh":"齿轮部件"}]'::jsonb,
    '[{"title_en":"Sliding Performance","title_zh":"滑动性能","en":"NW-02 demonstrates stable friction and wear characteristics across a broad range of load and temperature conditions.","zh":"NW-02 在较宽的负荷与温度条件下表现出稳定的摩擦磨耗特性。"},{"title_en":"Gear Wear Performance","title_zh":"齿轮耐磨性能","en":"NW-02 provides good gear wear characteristics under a broad range of operating conditions.","zh":"NW-02 在较宽的运行条件下具有良好的齿轮磨耗特性。"},{"title_en":"Noise Performance","title_zh":"噪音性能","en":"NW-02 provides good sliding noise and gear noise characteristics.","zh":"NW-02 具有良好的滑动噪音和齿轮噪音特性。"},{"title_en":"Flowability","title_zh":"流动性","en":"NW-02 has higher flowability than conventional grades, which may provide advantages in productivity and dimensional accuracy.","zh":"NW-02 流动性高于常规牌号，有助于提升生产效率和尺寸精度。"},{"title_en":"Mold Shrinkage","title_zh":"成型收缩率","en":"Typical mold shrinkage is 2.4% in the flow direction and 2.3% in the transverse direction (ISO 294-4).","zh":"典型成型收缩率：流动方向 2.4%，垂直方向 2.3%（ISO 294-4）。"},{"title_en":"Moldability","title_zh":"成型性","en":"NW-02 offers good moldability comparable to general DURACON® POM grades.","zh":"NW-02 成型性良好，与通用 DURACON® POM 牌号相当。"}]'::jsonb
  ) RETURNING id
)
INSERT INTO public.physical_properties (grade_id, property_name, property_name_zh, unit, test_method, value, display_order)
SELECT g.id, v.n, v.nz, v.u, v.t, v.val, v.o FROM g, (VALUES
 ('Density','密度','g/cm³','ISO 1183','1.36',10),
 ('Water Absorption (23°C, water, 24 h, 1 mm thickness)','吸水率（23°C，水中，24 h，1 mm 厚）','%','ISO 62','0.7',20),
 ('MFR (190°C, 2.16 kg)','熔体质量流动速率 MFR（190°C，2.16 kg）','g/10 min','ISO 1133','20',30),
 ('MVR (190°C, 2.16 kg)','熔体体积流动速率 MVR（190°C，2.16 kg）','cm³/10 min','ISO 1133','18',40),
 ('Tensile Strength','拉伸强度','MPa','ISO 527-1,2','52',50),
 ('Tensile Strain at Break','断裂拉伸应变','%','ISO 527-1,2','20',60),
 ('Tensile Modulus','拉伸模量','MPa','ISO 527-1,2','2350',70),
 ('Flexural Strength','弯曲强度','MPa','ISO 178','72',80),
 ('Flexural Modulus','弯曲模量','MPa','ISO 178','2200',90),
 ('Notched Charpy Impact Strength (23°C)','简支梁缺口冲击强度（23°C）','kJ/m²','ISO 179/1eA','5.9',100),
 ('Deflection Temperature Under Load (1.8 MPa)','负荷变形温度（1.8 MPa）','°C','ISO 75-1,2','85',110),
 ('Linear Thermal Expansion Coefficient — Flow Direction','线膨胀系数 — 流动方向','x10⁻⁵/°C','Manufacturer''s standard','12',120),
 ('Linear Thermal Expansion Coefficient — Transverse Direction','线膨胀系数 — 垂直方向','x10⁻⁵/°C','Manufacturer''s standard','12',130),
 ('Dielectric Breakdown Strength (3 mm thickness)','介电击穿强度（3 mm 厚）','kV/mm','IEC 60243-1','20',140),
 ('Volume Resistivity','体积电阻率','Ω·cm','IEC 60093','1 × 10¹⁴',150),
 ('Surface Resistivity','表面电阻率','Ω','IEC 60093','3 × 10¹⁵',160),
 ('Mold Shrinkage — Flow Direction','成型收缩率 — 流动方向','%','ISO 294-4','2.4',170),
 ('Mold Shrinkage — Transverse Direction','成型收缩率 — 垂直方向','%','ISO 294-4','2.3',180),
 ('Rockwell Hardness','洛氏硬度','M Scale','ISO 2039-2','70',190),
 ('Wear Rate','比磨耗量','x10⁻³ mm³/(N·km)','JIS K7218','0.19',200),
 ('Coefficient of Friction','摩擦系数','-','JIS K7218','0.17',210),
 ('Flammability','阻燃等级','-','UL94','HB',220),
 ('UL Yellow Card','UL 黄卡','-','-','E45034',230)
) AS v(n,nz,u,t,val,o);