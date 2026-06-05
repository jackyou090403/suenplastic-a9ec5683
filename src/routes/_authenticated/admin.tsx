import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import { Layout, PageHeader } from "@/components/site/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
  upsertProduct,
  deleteProduct,
  bulkImportProducts,
  checkIsAdmin,
} from "@/lib/products.functions";
import { toast } from "sonner";
import * as XLSX from "xlsx";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({
    meta: [
      { title: "产品管理后台 — 塑恩贸易" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: AdminPage,
});

type DocItem = { name: string; url: string };

type Row = {
  id: string;
  slug: string;
  brand: string;
  series: string;
  material: string;
  grades: string[];
  feature: string;
  applications: string[];
  image_url: string;
  images: string[];
  docs: DocItem[];
  sort_order: number;
};

const empty: Omit<Row, "id"> = {
  slug: "",
  brand: "",
  series: "",
  material: "",
  grades: [],
  feature: "",
  applications: [],
  image_url: "",
  images: [],
  docs: [],
  sort_order: 0,
};

function AdminPage() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const check = useServerFn(checkIsAdmin);
  const upsertFn = useServerFn(upsertProduct);
  const deleteFn = useServerFn(deleteProduct);
  const bulkFn = useServerFn(bulkImportProducts);

  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    check()
      .then((r) => setIsAdmin(r.isAdmin))
      .catch(() => setIsAdmin(false));
  }, [check]);

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["admin-products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("brand")
        .order("sort_order");
      if (error) throw error;
      return (data ?? []).map((d: any) => ({
        ...d,
        images: Array.isArray(d.images) ? d.images : [],
        docs: Array.isArray(d.docs) ? d.docs : [],
      })) as Row[];
    },
  });

  const [q, setQ] = useState("");
  const filtered = useMemo(
    () =>
      products.filter(
        (p) =>
          !q ||
          [p.slug, p.brand, p.series, p.material, p.feature]
            .join(" ")
            .toLowerCase()
            .includes(q.toLowerCase()),
      ),
    [products, q],
  );

  const [editing, setEditing] = useState<Row | null>(null);
  const [creating, setCreating] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/auth" });
  };

  const handleSave = async (row: Row | (Omit<Row, "id"> & { id?: string })) => {
    try {
      await upsertFn({ data: row as any });
      toast.success("已保存");
      qc.invalidateQueries({ queryKey: ["admin-products"] });
      setEditing(null);
      setCreating(false);
    } catch (e: any) {
      toast.error(e.message || "保存失败");
    }
  };

  const handleDelete = async (id: string, slug: string) => {
    if (!confirm(`确认删除 ${slug} ?`)) return;
    try {
      await deleteFn({ data: { id } });
      toast.success("已删除");
      qc.invalidateQueries({ queryKey: ["admin-products"] });
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  const handleImport = async (file: File) => {
    try {
      const ext = file.name.split(".").pop()?.toLowerCase();
      let rows: any[] = [];
      if (ext === "json") {
        const text = await file.text();
        rows = JSON.parse(text);
      } else {
        const buf = await file.arrayBuffer();
        const wb = XLSX.read(buf, { type: "array" });
        const ws = wb.Sheets[wb.SheetNames[0]];
        rows = XLSX.utils.sheet_to_json(ws);
      }
      const normalized = rows.map((r: any) => ({
        slug: String(r.slug || "").trim(),
        brand: String(r.brand || "").trim(),
        series: String(r.series || ""),
        material: String(r.material || ""),
        grades: typeof r.grades === "string"
          ? r.grades.split(/[,;|\n]/).map((s: string) => s.trim()).filter(Boolean)
          : Array.isArray(r.grades) ? r.grades : [],
        applications: typeof r.applications === "string"
          ? r.applications.split(/[,;|\n]/).map((s: string) => s.trim()).filter(Boolean)
          : Array.isArray(r.applications) ? r.applications : [],
        feature: String(r.feature || ""),
        sort_order: Number(r.sort_order) || 0,
      })).filter((r) => r.slug && r.brand);
      if (!normalized.length) {
        toast.error("未发现有效数据行（需 slug + brand 字段）");
        return;
      }
      const res = await bulkFn({ data: { rows: normalized, mode: "upsert" } });
      toast.success(`成功导入 ${res.inserted} 条`);
      qc.invalidateQueries({ queryKey: ["admin-products"] });
    } catch (e: any) {
      toast.error("导入失败: " + (e.message || ""));
    } finally {
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  const exportCsv = () => {
    const ws = XLSX.utils.json_to_sheet(
      products.map((p) => ({
        slug: p.slug, brand: p.brand, series: p.series, material: p.material,
        grades: p.grades.join("|"), feature: p.feature,
        applications: p.applications.join("|"), sort_order: p.sort_order,
      })),
    );
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "products");
    XLSX.writeFile(wb, "products.xlsx");
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
          <p className="mt-1 text-sm text-muted-foreground">
            请联系系统管理员在 Cloud → user_roles 表中为该账号添加 admin 角色。
          </p>
          <div className="mt-6 flex justify-center gap-2">
            <Button variant="outline" onClick={signOut}>退出登录</Button>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <PageHeader kicker="Admin" title="产品管理后台" desc="对接 Lovable Cloud · 在线编辑 / 新增 / 批量导入" />
      <section className="mx-auto max-w-[1400px] px-4 py-8 md:px-6">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <Input
            placeholder="搜索 slug / 品牌 / 系列 / 材料..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="max-w-xs"
          />
          <div className="ml-auto flex flex-wrap gap-2">
            <Button variant="outline" onClick={() => fileRef.current?.click()}>
              批量导入 (CSV / XLSX / JSON)
            </Button>
            <input
              ref={fileRef}
              type="file"
              accept=".csv,.xlsx,.xls,.json"
              hidden
              onChange={(e) => e.target.files?.[0] && handleImport(e.target.files[0])}
            />
            <Button variant="outline" onClick={exportCsv}>导出 Excel</Button>
            <Button onClick={() => setCreating(true)}>+ 新增产品</Button>
            <Button variant="ghost" onClick={signOut}>退出</Button>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/50 text-left">
              <tr>
                <th className="p-2">slug</th>
                <th className="p-2">品牌</th>
                <th className="p-2">系列</th>
                <th className="p-2">材料</th>
                <th className="p-2">牌号</th>
                <th className="p-2">特性</th>
                <th className="p-2">应用</th>
                <th className="p-2">排序</th>
                <th className="p-2 text-right">操作</th>
              </tr>
            </thead>
            <tbody>
              {isLoading && <tr><td colSpan={9} className="p-6 text-center text-muted-foreground">加载中...</td></tr>}
              {!isLoading && filtered.length === 0 && (
                <tr><td colSpan={9} className="p-6 text-center text-muted-foreground">暂无数据</td></tr>
              )}
              {filtered.map((p) => (
                <tr key={p.id} className="border-t border-border align-top hover:bg-muted/30">
                  <td className="p-2 font-mono text-xs">{p.slug}</td>
                  <td className="p-2">{p.brand}</td>
                  <td className="p-2">{p.series}</td>
                  <td className="p-2">{p.material}</td>
                  <td className="p-2 max-w-[200px] text-xs">{p.grades.join(", ")}</td>
                  <td className="p-2 max-w-[280px] text-xs">{p.feature}</td>
                  <td className="p-2 max-w-[200px] text-xs">{p.applications.join(", ")}</td>
                  <td className="p-2">{p.sort_order}</td>
                  <td className="p-2 text-right whitespace-nowrap">
                    <button className="text-primary text-xs underline mr-3" onClick={() => setEditing(p)}>编辑</button>
                    <button className="text-destructive text-xs underline" onClick={() => handleDelete(p.id, p.slug)}>删除</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-3 text-xs text-muted-foreground">
          导入格式示例（CSV/XLSX 表头）: <code>slug, brand, series, material, grades, feature, applications, sort_order</code>。
          <br />grades 与 applications 可用 <code>|</code> / <code>;</code> / <code>,</code> 分隔。
        </p>
      </section>

      <EditDialog
        open={creating || !!editing}
        row={editing ?? { id: undefined as any, ...empty }}
        onClose={() => { setEditing(null); setCreating(false); }}
        onSave={handleSave}
        isNew={creating}
      />
    </Layout>
  );
}

function EditDialog({
  open, row, onClose, onSave, isNew,
}: {
  open: boolean;
  row: any;
  onClose: () => void;
  onSave: (r: any) => Promise<void>;
  isNew: boolean;
}) {
  const [form, setForm] = useState<any>(row);
  useEffect(() => { setForm(row); }, [row]);
  const update = (k: string, v: any) => setForm((f: any) => ({ ...f, [k]: v }));

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isNew ? "新增产品" : "编辑产品"}</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-3">
          <Field label="slug *"><Input value={form.slug || ""} onChange={(e) => update("slug", e.target.value)} placeholder="duracon-pom" /></Field>
          <Field label="品牌 *"><Input value={form.brand || ""} onChange={(e) => update("brand", e.target.value)} placeholder="polyplastics" /></Field>
          <Field label="系列"><Input value={form.series || ""} onChange={(e) => update("series", e.target.value)} /></Field>
          <Field label="材料"><Input value={form.material || ""} onChange={(e) => update("material", e.target.value)} /></Field>
          <Field label="排序"><Input type="number" value={form.sort_order ?? 0} onChange={(e) => update("sort_order", Number(e.target.value))} /></Field>
          <div />
          <Field label="牌号（每行一个 或 | 分隔）" full>
            <Textarea
              rows={3}
              value={Array.isArray(form.grades) ? form.grades.join("\n") : ""}
              onChange={(e) => update("grades", e.target.value.split(/\n|\|/).map((s) => s.trim()).filter(Boolean))}
            />
          </Field>
          <Field label="特性" full>
            <Textarea rows={2} value={form.feature || ""} onChange={(e) => update("feature", e.target.value)} />
          </Field>
          <Field label="应用领域（每行一个 或 | 分隔）" full>
            <Textarea
              rows={2}
              value={Array.isArray(form.applications) ? form.applications.join("\n") : ""}
              onChange={(e) => update("applications", e.target.value.split(/\n|\|/).map((s) => s.trim()).filter(Boolean))}
            />
          </Field>

          <Field label="主图（建议 1200×900，自动上传）" full>
            <ImageUploader
              slug={form.slug}
              value={form.image_url || ""}
              onChange={(url) => update("image_url", url)}
            />
          </Field>

          <Field label="图集（可多张）" full>
            <GalleryUploader
              slug={form.slug}
              values={Array.isArray(form.images) ? form.images : []}
              onChange={(arr) => update("images", arr)}
            />
          </Field>

          <Field label="附件（COA / 物性表 PDF，可多个）" full>
            <DocsUploader
              slug={form.slug}
              values={Array.isArray(form.docs) ? form.docs : []}
              onChange={(arr) => update("docs", arr)}
            />
          </Field>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>取消</Button>
          <Button onClick={() => onSave(form)}>保存</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function Field({ label, children, full }: { label: string; children: React.ReactNode; full?: boolean }) {
  return (
    <div className={full ? "col-span-2 space-y-1.5" : "space-y-1.5"}>
      <Label className="text-xs">{label}</Label>
      {children}
    </div>
  );
}

// ===== 上传工具 =====
const ONE_YEAR = 60 * 60 * 24 * 365;

async function uploadToBucket(bucket: string, slug: string, file: File): Promise<string> {
  const safeSlug = (slug || "untitled").toLowerCase().replace(/[^a-z0-9-]/g, "-");
  const ts = Date.now();
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const path = `${safeSlug}/${ts}-${safeName}`;
  const { error } = await supabase.storage.from(bucket).upload(path, file, {
    cacheControl: "31536000",
    upsert: false,
    contentType: file.type || undefined,
  });
  if (error) throw error;
  const { data, error: signErr } = await supabase.storage
    .from(bucket)
    .createSignedUrl(path, ONE_YEAR);
  if (signErr) throw signErr;
  return data.signedUrl;
}

function ImageUploader({ slug, value, onChange }: { slug: string; value: string; onChange: (url: string) => void }) {
  const [busy, setBusy] = useState(false);
  const ref = useRef<HTMLInputElement>(null);
  const onPick = async (f: File) => {
    setBusy(true);
    try {
      const url = await uploadToBucket("product-images", slug, f);
      onChange(url);
      toast.success("上传成功");
    } catch (e: any) { toast.error("上传失败: " + e.message); }
    finally { setBusy(false); if (ref.current) ref.current.value = ""; }
  };
  return (
    <div className="space-y-2">
      <div className="flex gap-2 items-center">
        <input ref={ref} type="file" accept="image/*" hidden onChange={(e) => e.target.files?.[0] && onPick(e.target.files[0])} />
        <Button type="button" variant="outline" size="sm" onClick={() => ref.current?.click()} disabled={busy || !slug}>
          {busy ? "上传中..." : "选择图片上传"}
        </Button>
        {!slug && <span className="text-xs text-muted-foreground">请先填写 slug</span>}
        {value && <Button type="button" variant="ghost" size="sm" onClick={() => onChange("")}>清除</Button>}
      </div>
      <Input placeholder="或粘贴图片 URL" value={value} onChange={(e) => onChange(e.target.value)} />
      {value && <img src={value} alt="" className="h-24 w-auto rounded border border-border object-cover" />}
    </div>
  );
}

function GalleryUploader({ slug, values, onChange }: { slug: string; values: string[]; onChange: (arr: string[]) => void }) {
  const [busy, setBusy] = useState(false);
  const ref = useRef<HTMLInputElement>(null);
  const onPick = async (files: FileList) => {
    setBusy(true);
    try {
      const uploaded: string[] = [];
      for (const f of Array.from(files)) {
        uploaded.push(await uploadToBucket("product-images", slug, f));
      }
      onChange([...values, ...uploaded]);
      toast.success(`成功上传 ${uploaded.length} 张`);
    } catch (e: any) { toast.error("上传失败: " + e.message); }
    finally { setBusy(false); if (ref.current) ref.current.value = ""; }
  };
  return (
    <div className="space-y-2">
      <div className="flex gap-2 items-center">
        <input ref={ref} type="file" accept="image/*" multiple hidden onChange={(e) => e.target.files?.length && onPick(e.target.files)} />
        <Button type="button" variant="outline" size="sm" onClick={() => ref.current?.click()} disabled={busy || !slug}>
          {busy ? "上传中..." : "添加图片（可多选）"}
        </Button>
        {!slug && <span className="text-xs text-muted-foreground">请先填写 slug</span>}
      </div>
      {values.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {values.map((u, i) => (
            <div key={i} className="relative">
              <img src={u} alt="" className="h-20 w-20 rounded border border-border object-cover" />
              <button type="button" className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full w-5 h-5 text-xs"
                onClick={() => onChange(values.filter((_, idx) => idx !== i))}>×</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function DocsUploader({ slug, values, onChange }: { slug: string; values: DocItem[]; onChange: (arr: DocItem[]) => void }) {
  const [busy, setBusy] = useState(false);
  const ref = useRef<HTMLInputElement>(null);
  const onPick = async (files: FileList) => {
    setBusy(true);
    try {
      const added: DocItem[] = [];
      for (const f of Array.from(files)) {
        const url = await uploadToBucket("product-docs", slug, f);
        added.push({ name: f.name, url });
      }
      onChange([...values, ...added]);
      toast.success(`成功上传 ${added.length} 个附件`);
    } catch (e: any) { toast.error("上传失败: " + e.message); }
    finally { setBusy(false); if (ref.current) ref.current.value = ""; }
  };
  return (
    <div className="space-y-2">
      <div className="flex gap-2 items-center">
        <input ref={ref} type="file" accept=".pdf,application/pdf" multiple hidden onChange={(e) => e.target.files?.length && onPick(e.target.files)} />
        <Button type="button" variant="outline" size="sm" onClick={() => ref.current?.click()} disabled={busy || !slug}>
          {busy ? "上传中..." : "添加 PDF 附件"}
        </Button>
        {!slug && <span className="text-xs text-muted-foreground">请先填写 slug</span>}
      </div>
      {values.length > 0 && (
        <ul className="space-y-1 text-sm">
          {values.map((d, i) => (
            <li key={i} className="flex items-center gap-2">
              <a href={d.url} target="_blank" rel="noreferrer" className="text-primary underline truncate flex-1">{d.name}</a>
              <Input
                value={d.name}
                onChange={(e) => onChange(values.map((x, idx) => idx === i ? { ...x, name: e.target.value } : x))}
                className="h-7 max-w-[200px]"
                placeholder="显示名称"
              />
              <button type="button" className="text-destructive text-xs"
                onClick={() => onChange(values.filter((_, idx) => idx !== i))}>删除</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
