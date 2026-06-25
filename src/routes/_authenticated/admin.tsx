import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import { Layout, PageHeader } from "@/components/site/Layout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { checkIsAdmin } from "@/lib/products.functions";
import { ProductsTab } from "@/components/admin/ProductsTab";
import { BrandsTab } from "@/components/admin/BrandsTab";
import { MaterialsTab } from "@/components/admin/MaterialsTab";
import { InquiriesTab } from "@/components/admin/InquiriesTab";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "产品管理后台 — 塑恩贸易" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const navigate = useNavigate();
  const check = useServerFn(checkIsAdmin);
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    check().then((r) => setIsAdmin(r.isAdmin)).catch(() => setIsAdmin(false));
  }, [check]);

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/auth" });
  };

  if (isAdmin === null) {
    return <Layout><div className="p-10 text-center text-muted-foreground">权限校验中...</div></Layout>;
  }
  if (!isAdmin) {
    return (
      <Layout>
        <section className="mx-auto max-w-2xl px-4 py-16 text-center">
          <h1 className="text-2xl font-semibold">无访问权限</h1>
          <p className="mt-2 text-muted-foreground">您的账号尚未授予管理员权限。</p>
          <div className="mt-6 flex justify-center gap-2">
            <Button variant="outline" onClick={signOut}>退出登录</Button>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <PageHeader kicker="Admin" title="选材数据库后台" desc="产品 · 物性 · 品牌 · 材料分类 · 询盘" />
      <section className="mx-auto max-w-[1400px] px-4 py-8 md:px-6">
        <div className="mb-4 flex justify-end">
          <Button variant="ghost" size="sm" onClick={signOut}>退出登录</Button>
        </div>
        <Tabs defaultValue="products">
          <TabsList className="mb-6 flex-wrap">
            <TabsTrigger value="products">产品</TabsTrigger>
            <TabsTrigger value="brands">品牌</TabsTrigger>
            <TabsTrigger value="materials">材料分类</TabsTrigger>
            <TabsTrigger value="inquiries">询盘</TabsTrigger>
          </TabsList>
          <TabsContent value="products"><ProductsTab /></TabsContent>
          <TabsContent value="brands"><BrandsTab /></TabsContent>
          <TabsContent value="materials"><MaterialsTab /></TabsContent>
          <TabsContent value="inquiries"><InquiriesTab /></TabsContent>
        </Tabs>
      </section>
    </Layout>
  );
}
