
-- ============ MATERIAL CATEGORIES ============
CREATE TABLE public.material_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text NOT NULL UNIQUE,
  name_zh text NOT NULL,
  name_en text NOT NULL,
  description text NOT NULL DEFAULT '',
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.material_categories TO anon, authenticated;
GRANT ALL ON public.material_categories TO service_role;
GRANT INSERT, UPDATE, DELETE ON public.material_categories TO authenticated;
ALTER TABLE public.material_categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read material categories" ON public.material_categories FOR SELECT USING (true);
CREATE POLICY "Admins can insert material categories" ON public.material_categories FOR INSERT TO authenticated WITH CHECK (has_role(auth.uid(),'admin'::app_role));
CREATE POLICY "Admins can update material categories" ON public.material_categories FOR UPDATE TO authenticated USING (has_role(auth.uid(),'admin'::app_role)) WITH CHECK (has_role(auth.uid(),'admin'::app_role));
CREATE POLICY "Admins can delete material categories" ON public.material_categories FOR DELETE TO authenticated USING (has_role(auth.uid(),'admin'::app_role));
CREATE TRIGGER trg_mc_updated BEFORE UPDATE ON public.material_categories FOR EACH ROW EXECUTE FUNCTION public.tg_set_updated_at();

INSERT INTO public.material_categories (code, name_zh, name_en, sort_order) VALUES
  ('POM','聚甲醛','POM',10),
  ('PA66','尼龙66','PA66',20),
  ('PBT','聚对苯二甲酸丁二醇酯','PBT',30),
  ('PC','聚碳酸酯','PC',40),
  ('PPS','聚苯硫醚','PPS',50),
  ('LCP','液晶聚合物','LCP',60),
  ('PPA','聚邻苯二甲酰胺','PPA',70),
  ('EVA','乙烯-醋酸乙烯共聚物','EVA',80),
  ('LDPE','低密度聚乙烯','LDPE',90),
  ('VAE','醋酸乙烯-乙烯共聚乳液','VAE',100),
  ('PEEK','聚醚醚酮','PEEK',110),
  ('PPSU','聚亚苯基砜','PPSU',120),
  ('COC','环烯烃共聚物','COC',130);

-- ============ BRANDS ============
CREATE TABLE public.brands (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  code text NOT NULL UNIQUE,
  name text NOT NULL,
  country text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  logo_url text NOT NULL DEFAULT '',
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.brands TO anon, authenticated;
GRANT ALL ON public.brands TO service_role;
GRANT INSERT, UPDATE, DELETE ON public.brands TO authenticated;
ALTER TABLE public.brands ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read brands" ON public.brands FOR SELECT USING (true);
CREATE POLICY "Admins can insert brands" ON public.brands FOR INSERT TO authenticated WITH CHECK (has_role(auth.uid(),'admin'::app_role));
CREATE POLICY "Admins can update brands" ON public.brands FOR UPDATE TO authenticated USING (has_role(auth.uid(),'admin'::app_role)) WITH CHECK (has_role(auth.uid(),'admin'::app_role));
CREATE POLICY "Admins can delete brands" ON public.brands FOR DELETE TO authenticated USING (has_role(auth.uid(),'admin'::app_role));
CREATE TRIGGER trg_brands_updated BEFORE UPDATE ON public.brands FOR EACH ROW EXECUTE FUNCTION public.tg_set_updated_at();

INSERT INTO public.brands (code, name, country, sort_order) VALUES
  ('polyplastics','Polyplastics','日本',10),
  ('celanese','Celanese','美国',20),
  ('lati','LATI','意大利',30),
  ('umg','UMG','日本',40),
  ('usi','USI','中国台湾',50),
  ('ccp','CCP','中国台湾',60),
  ('solvay','Solvay','比利时',70),
  ('asahi-kasei','Asahi Kasei','日本',80),
  ('teijin','Teijin','日本',90);

-- ============ EXTEND PRODUCTS ============
ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS model text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS description_zh text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS description_en text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS datasheet_url text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS brand_id uuid REFERENCES public.brands(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS material_category_id uuid REFERENCES public.material_categories(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS flame_retardant boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS high_temperature boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS wear_resistance boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS food_contact boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS high_flow boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS transparent boolean NOT NULL DEFAULT false;

-- 自动按文本匹配关联
UPDATE public.products p
SET brand_id = b.id
FROM public.brands b
WHERE p.brand_id IS NULL
  AND lower(p.brand) IN (lower(b.code), lower(b.name));

UPDATE public.products p
SET material_category_id = m.id
FROM public.material_categories m
WHERE p.material_category_id IS NULL
  AND upper(trim(p.material)) = upper(m.code);

CREATE INDEX IF NOT EXISTS idx_products_brand_id ON public.products(brand_id);
CREATE INDEX IF NOT EXISTS idx_products_material_category_id ON public.products(material_category_id);

-- ============ PRODUCT PROPERTIES ============
CREATE TABLE public.product_properties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid NOT NULL UNIQUE REFERENCES public.products(id) ON DELETE CASCADE,
  density numeric,                      -- g/cm3
  melt_flow_index numeric,              -- g/10min
  tensile_strength numeric,             -- MPa
  elongation numeric,                   -- %
  flexural_modulus numeric,             -- MPa
  impact_strength numeric,              -- kJ/m2
  heat_deflection_temperature numeric,  -- °C
  ul94_rating text NOT NULL DEFAULT '',
  notes text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.product_properties TO anon, authenticated;
GRANT ALL ON public.product_properties TO service_role;
GRANT INSERT, UPDATE, DELETE ON public.product_properties TO authenticated;
ALTER TABLE public.product_properties ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read product properties" ON public.product_properties FOR SELECT USING (true);
CREATE POLICY "Admins can insert product properties" ON public.product_properties FOR INSERT TO authenticated WITH CHECK (has_role(auth.uid(),'admin'::app_role));
CREATE POLICY "Admins can update product properties" ON public.product_properties FOR UPDATE TO authenticated USING (has_role(auth.uid(),'admin'::app_role)) WITH CHECK (has_role(auth.uid(),'admin'::app_role));
CREATE POLICY "Admins can delete product properties" ON public.product_properties FOR DELETE TO authenticated USING (has_role(auth.uid(),'admin'::app_role));
CREATE TRIGGER trg_pp_updated BEFORE UPDATE ON public.product_properties FOR EACH ROW EXECUTE FUNCTION public.tg_set_updated_at();

-- ============ INQUIRIES ============
CREATE TABLE public.inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL DEFAULT '',
  company text NOT NULL DEFAULT '',
  country text NOT NULL DEFAULT '',
  product_id uuid REFERENCES public.products(id) ON DELETE SET NULL,
  product_slug text NOT NULL DEFAULT '',
  message text NOT NULL DEFAULT '',
  source text NOT NULL DEFAULT 'website',
  status text NOT NULL DEFAULT 'new',
  ip_address text NOT NULL DEFAULT '',
  user_agent text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.inquiries TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.inquiries TO authenticated;
GRANT ALL ON public.inquiries TO service_role;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit inquiries" ON public.inquiries FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Admins can read inquiries" ON public.inquiries FOR SELECT TO authenticated USING (has_role(auth.uid(),'admin'::app_role));
CREATE POLICY "Admins can update inquiries" ON public.inquiries FOR UPDATE TO authenticated USING (has_role(auth.uid(),'admin'::app_role)) WITH CHECK (has_role(auth.uid(),'admin'::app_role));
CREATE POLICY "Admins can delete inquiries" ON public.inquiries FOR DELETE TO authenticated USING (has_role(auth.uid(),'admin'::app_role));
CREATE TRIGGER trg_inquiries_updated BEFORE UPDATE ON public.inquiries FOR EACH ROW EXECUTE FUNCTION public.tg_set_updated_at();

CREATE INDEX idx_inquiries_status ON public.inquiries(status);
CREATE INDEX idx_inquiries_created_at ON public.inquiries(created_at DESC);
