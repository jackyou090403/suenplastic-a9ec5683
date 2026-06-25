
DROP POLICY IF EXISTS "Anyone can submit inquiries" ON public.inquiries;

CREATE POLICY "Anyone can submit inquiries"
ON public.inquiries
FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(btrim(name)) BETWEEN 1 AND 200
  AND length(email) BETWEEN 3 AND 254
  AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
  AND length(coalesce(phone,'')) <= 50
  AND length(coalesce(company,'')) <= 200
  AND length(coalesce(country,'')) <= 100
  AND length(coalesce(message,'')) <= 5000
  AND length(coalesce(product_slug,'')) <= 200
  AND coalesce(source,'website') IN ('website','product-detail','material-selector','contact-page','inquiry-page')
  AND coalesce(status,'new') = 'new'
);
