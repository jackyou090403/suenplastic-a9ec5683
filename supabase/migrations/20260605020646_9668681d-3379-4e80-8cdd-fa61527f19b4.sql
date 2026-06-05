
-- 1. 扩展 products 表
ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS image_url text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS images jsonb NOT NULL DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS docs jsonb NOT NULL DEFAULT '[]'::jsonb;

-- 2. storage.objects 策略：product-images 与 product-docs
-- 公开读
CREATE POLICY "public read product-images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'product-images');

CREATE POLICY "public read product-docs"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'product-docs');

-- 管理员写
CREATE POLICY "admin write product-images"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'product-images' AND public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "admin update product-images"
  ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'product-images' AND public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "admin delete product-images"
  ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'product-images' AND public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "admin write product-docs"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'product-docs' AND public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "admin update product-docs"
  ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'product-docs' AND public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "admin delete product-docs"
  ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'product-docs' AND public.has_role(auth.uid(), 'admin'::public.app_role));
