import { useEffect, useMemo, useRef, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  upsertProduct, deleteProduct, bulkImportProducts,
} from "@/lib/products.functions";
import { upsertProductProperties } from "@/lib/properties.functions";
import { toast } from "sonner";
import * as XLSX from "xlsx";

type DocItem = { name: string; url: string };
type Row = any;

const TAG_FIELDS: { key: string; label: string }[] = [
  { key: "flame_retardant", label: "阻燃" },
  { key: "high_temperature", label: "耐高温" },
  { key: "wear_resistance", label: "耐磨" },
  { key: "food_contact", label: "食品接触" },
  { key: "high_flow", label: "高流动" },
  { key: "transparent", label: "透明" },
];

const empty = {
  slug: "", brand: "", brand_id: null, material_category_id: null,
  series: "", material: "", model: "", grades: [], feature: "",
  description_zh: "", description_en: "",
  applications: [], image_url: "", images: [], docs: [],
  datasheet_url: "", sort_order: 0,
  flame_retardant: false, high_temperature: false, wear_resistance: false,
  food_contact: false, high_flow: false, transparent: false,
};

export function ProductsTab() {
  const qc = useQueryClient();
  const upsertFn = useServerFn(upsertProduct);
  const deleteFn = useServerFn(deleteProduct);
  const bulkFn = useServerFn(bulkImportProducts);

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["admin-products"],
    queryFn: async () => {
      const { data, error } = await supabase.from("products").select("*").order("brand").order("sort_order");
      if (error) throw error;
      return (data ?? []).map((d: any) => ({
        ...d,
        images: Array.isArray(d.images) ? d.images : [],
        docs: Array.isArray(d.docs) ? d.docs : [],
      })) as Row[];
    },
  });

  const { data: brands = [] } = useQuery({
    queryKey: ["admin-brands"],
    queryFn: async () => (await supabase.from("brands").select("id,code,name").order("sort_order")).data ?? [],
  });
  const { data: materials = [] } = useQuery({
    queryKey: ["admin-materials"],
    queryFn: async () => (await supabase.from("material_categories").select("id,code,name_zh").order("sort_order")).data ?? [],
  });

  const [q, setQ] = useState("");
  const filtered = useMemo(
    () => products.filter((p) => !q || [p.slug, p.brand, p.series, p.material, p.model, p.feature].join(" ").toLowerCase().includes(q.toLowerCase())),
    [products, q],
  );

  const [editing, setEditing] = useState<Row | null>(null);
  const [creating, setCreating] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleSave = async (row: any) => {
    try {
      // strip null FK strings -> null
      const payload = { ...row };
      if (payload.brand_id === "") payload.brand_id = null;
      if (payload.material_category_id === "") payload.material_category_id = null;
      await upsertFn({ data: payload });
      toast.success("已保存");
      qc.invalidateQueries({ queryKey: ["admin-products"] });
      setEditing(null);
      setCreating(false);
    } catch (e: any) { toast.error(e.message || "保存失败"); }
  };

  const handleDelete = async (id: string, slug: string) => {
    if (!confirm(`确认删除 ${slug} ?`)) return;
    try {
      await deleteFn({ data: { id } });
      toast.success("已删除");
      qc.invalidateQueries({ queryKey: ["admin-products"] });
    } catch (e: any) { toast.error(e.message); }
  };

  const handleImport = async (file: File) => {
    try {
      const ext = file.name.split(".").pop()?.toLowerCase();
      let rows: any[] = [];
      if (ext === "json") rows = JSON.parse(await file.text());
      else {
        const wb = XLSX.read(await file.arrayBuffer(), { type: "array" });
        rows = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
      }
      const splitList = (v: any) =>
        typeof v === "string" ? v.split(/[,;|\n]/).map((s: string) => s.trim()).filter(Boolean) : Array.isArray(v) ? v : [];
      const bool = (v: any) => v === true || v === 1 || /^(true|1|yes|y|是)$/i.test(String(v ?? ""));
      const normalized = rows.map((r: any) => ({
        slug: String(r.slug || "").trim(),
        brand: String(r.brand || "").trim(),
        series: String(r.series || ""),
        material: String(r.material || ""),
        model: String(r.model || ""),
        grades: splitList(r.grades),
        applications: splitList(r.applications),
        feature: String(r.feature || ""),
        description_zh: String(r.description_zh || ""),
        description_en: String(r.description_en || ""),
        datasheet_url: String(r.datasheet_url || ""),
        image_url: String(r.image_url || ""),
        images: splitList(r.images),
        docs: [],
        sort_order: Number(r.sort_order) || 0,
        flame_retardant: bool(r.flame_retardant),
        high_temperature: bool(r.high_temperature),
        wear_resistance: bool(r.wear_resistance),
        food_contact: bool(r.food_contact),
        high_flow: bool(r.high_flow),
        transparent: bool(r.transparent),
      })).filter((r) => r.slug && r.brand);
      if (!normalized.length) { toast.error("未发现有效数据（需 slug + brand）"); return; }
      const res = await bulkFn({ data: { rows: normalized, mode: "upsert" } });
      toast.success(`成功导入 ${res.inserted} 条`);
      qc.invalidateQueries({ queryKey: ["admin-products"] });
    } catch (e: any) { toast.error("导入失败: " + (e.message || "")); }
    finally { if (fileRef.current) fileRef.current.value = ""; }
  };

  const exportXlsx = () => {
    const ws = XLSX.utils.json_to_sheet(
      products.map((p) => ({
        slug: p.slug, brand: p.brand, series: p.series, material: p.material, model: p.model,
        grades: (p.grades || []).join("|"),
        feature: p.feature, description_zh: p.description_zh, description_en: p.description_en,
        applications: (p.applications || []).join("|"),
        image_url: p.image_url, images: (p.images || []).join("|"),
        datasheet_url: p.datasheet_url, sort_order: p.sort_order,
        flame_retardant: p.flame_retardant, high_temperature: p.high_temperature,
        wear_resistance: p.wear_resistance, food_contact: p.food_contact,
        high_flow: p.high_flow, transparent: p.transparent,
      })),
    );
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "products");
    XLSX.writeFile(wb, "products.xlsx");
  };

  const downloadTemplate = () => {
    const ws = XLSX.utils.json_to_sheet([{
      slug: "example-pom-1", brand: "polyplastics", series: "Duracon",
      material: "POM", model: "M90-44", grades: "M90-44|M270-44",
      feature: "高强度高刚性 POM 共聚物",
      description_zh: "适合精密齿轮、轴承等结构件。",
      description_en: "Suitable for precision gears and bearings.",
      applications: "汽车|电子电气|机械工业",
      image_url: "", images: "", datasheet_url: "", sort_order: 0,
      flame_retardant: false, high_temperature: false, wear_resistance: true,
      food_contact: false, high_flow: false, transparent: false,
    }]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "products");
    XLSX.writeFile(wb, "products-template.xlsx");
  };

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <Input placeholder="搜索 slug / 品牌 / 系列 / 材料 / 型号..." value={q} onChange={(e) => setQ(e.target.value)} className="max-w-xs" />
        <div className="ml-auto flex flex-wrap gap-2">
          <Button variant="ghost" size="sm" onClick={downloadTemplate}>下载模板</Button>
          <Button variant="outline" onClick={() => fileRef.current?.click()}>批量导入 (CSV/XLSX/JSON)</Button>
          <input ref={fileRef} type="file" accept=".csv,.xlsx,.xls,.json" hidden
            onChange={(e) => e.target.files?.[0] && handleImport(e.target.files[0])} />
          <Button variant="outline" onClick={exportXlsx}>导出 Excel</Button>
          <Button onClick={() => setCreating(true)}>+ 新增产品</Button>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 text-left">
            <tr>
              <th className="p-2">slug</th><th className="p-2">品牌</th><th className="p-2">材料</th>
              <th className="p-2">型号</th><th className="p-2">标签</th><th className="p-2">特性</th>
              <th className="p-2">排序</th><th className="p-2 text-right">操作</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && <tr><td colSpan={8} className="p-6 text-center text-muted-foreground">加载中...</td></tr>}
            {!isLoading && filtered.length === 0 && <tr><td colSpan={8} className="p-6 text-center text-muted-foreground">暂无数据</td></tr>}
            {filtered.map((p) => (
              <tr key={p.id} className="border-t border-border align-top hover:bg-muted/30">
                <td className="p-2 font-mono text-xs">{p.slug}</td>
                <td className="p-2">{p.brand}</td>
                <td className="p-2">{p.material}</td>
                <td className="p-2 text-xs">{p.model}</td>
                <td className="p-2 text-xs">{TAG_FIELDS.filter(t => p[t.key]).map(t => t.label).join(" · ")}</td>
                <td className="p-2 max-w-[280px] text-xs">{p.feature}</td>
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
        模板列：slug, brand, series, material, model, grades, feature, description_zh, description_en, applications, image_url, images, datasheet_url, sort_order, flame_retardant, high_temperature, wear_resistance, food_contact, high_flow, transparent。
        多值字段（grades / applications / images）支持 <code>|</code> / <code>;</code> / <code>,</code> 分隔。布尔字段填 true/false。
      </p>

      <EditDialog
        open={creating || !!editing}
        row={editing ?? { id: undefined as any, ...empty }}
        brands={brands}
        materials={materials}
        onClose={() => { setEditing(null); setCreating(false); }}
        onSave={handleSave}
        isNew={creating}
      />
    </div>
  );
}

function EditDialog({ open, row, brands, materials, onClose, onSave, isNew }: any) {
  const [form, setForm] = useState<any>(row);
  useEffect(() => { setForm(row); }, [row]);
  const update = (k: string, v: any) => setForm((f: any) => ({ ...f, [k]: v }));

  const upsertProps = useServerFn(upsertProductProperties);
  const [props, setProps] = useState<any>({
    density: null, tensile_strength: null, elongation: null, flexural_modulus: null,
    impact_strength: null, heat_deflection_temperature: null, melt_flow_index: null,
    ul94_rating: "", notes: "",
  });
  const updateP = (k: string, v: any) => setProps((p: any) => ({ ...p, [k]: v }));

  useEffect(() => {
    if (!form?.id) { setProps({ density: null, tensile_strength: null, elongation: null, flexural_modulus: null, impact_strength: null, heat_deflection_temperature: null, melt_flow_index: null, ul94_rating: "", notes: "" }); return; }
    (async () => {
      const { data } = await supabase.from("product_properties").select("*").eq("product_id", form.id).maybeSingle();
      if (data) setProps(data);
    })();
  }, [form?.id]);

  const saveProps = async () => {
    if (!form?.id) { toast.error("请先保存产品基础信息"); return; }
    try {
      const num = (v: any) => v === "" || v === null || v === undefined ? null : Number(v);
      await upsertProps({ data: {
        product_id: form.id,
        density: num(props.density), tensile_strength: num(props.tensile_strength),
        elongation: num(props.elongation), flexural_modulus: num(props.flexural_modulus),
        impact_strength: num(props.impact_strength),
        heat_deflection_temperature: num(props.heat_deflection_temperature),
        melt_flow_index: num(props.melt_flow_index),
        ul94_rating: props.ul94_rating || "", notes: props.notes || "",
      } });
      toast.success("物性已保存");
    } catch (e: any) { toast.error(e.message); }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader><DialogTitle>{isNew ? "新增产品" : "编辑产品"}</DialogTitle></DialogHeader>
        <div className="grid grid-cols-2 gap-3">
          <Field label="slug *"><Input value={form.slug || ""} onChange={(e) => update("slug", e.target.value)} placeholder="duracon-pom" /></Field>
          <Field label="品牌 code *"><Input value={form.brand || ""} onChange={(e) => update("brand", e.target.value)} placeholder="polyplastics" /></Field>

          <Field label="品牌（关联）">
            <Select value={form.brand_id || "none"} onValueChange={(v) => update("brand_id", v === "none" ? null : v)}>
              <SelectTrigger><SelectValue placeholder="选择品牌" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="none">— 未关联 —</SelectItem>
                {brands.map((b: any) => <SelectItem key={b.id} value={b.id}>{b.name} ({b.code})</SelectItem>)}
              </SelectContent>
            </Select>
          </Field>
          <Field label="材料分类（关联）">
            <Select value={form.material_category_id || "none"} onValueChange={(v) => update("material_category_id", v === "none" ? null : v)}>
              <SelectTrigger><SelectValue placeholder="选择材料分类" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="none">— 未关联 —</SelectItem>
                {materials.map((m: any) => <SelectItem key={m.id} value={m.id}>{m.name_zh} ({m.code})</SelectItem>)}
              </SelectContent>
            </Select>
          </Field>

          <Field label="系列"><Input value={form.series || ""} onChange={(e) => update("series", e.target.value)} /></Field>
          <Field label="材料文本"><Input value={form.material || ""} onChange={(e) => update("material", e.target.value)} /></Field>
          <Field label="型号"><Input value={form.model || ""} onChange={(e) => update("model", e.target.value)} /></Field>
          <Field label="排序"><Input type="number" value={form.sort_order ?? 0} onChange={(e) => update("sort_order", Number(e.target.value))} /></Field>

          <Field label="牌号（每行一个 或 | 分隔）" full>
            <Textarea rows={3} value={Array.isArray(form.grades) ? form.grades.join("\n") : ""}
              onChange={(e) => update("grades", e.target.value.split(/\n|\|/).map((s) => s.trim()).filter(Boolean))} />
          </Field>

          <Field label="特性（短句）" full>
            <Textarea rows={2} value={form.feature || ""} onChange={(e) => update("feature", e.target.value)} />
          </Field>
          <Field label="中文描述" full>
            <Textarea rows={3} value={form.description_zh || ""} onChange={(e) => update("description_zh", e.target.value)} />
          </Field>
          <Field label="English description" full>
            <Textarea rows={3} value={form.description_en || ""} onChange={(e) => update("description_en", e.target.value)} />
          </Field>

          <Field label="应用领域（每行一个 或 | 分隔）" full>
            <Textarea rows={2} value={Array.isArray(form.applications) ? form.applications.join("\n") : ""}
              onChange={(e) => update("applications", e.target.value.split(/\n|\|/).map((s) => s.trim()).filter(Boolean))} />
          </Field>

          <Field label="选材标签" full>
            <div className="flex flex-wrap gap-4">
              {TAG_FIELDS.map((t) => (
                <label key={t.key} className="flex items-center gap-2 text-sm">
                  <Switch checked={!!form[t.key]} onCheckedChange={(v) => update(t.key, v)} />
                  {t.label}
                </label>
              ))}
            </div>
          </Field>

          <Field label="物性表 PDF URL" full>
            <Input value={form.datasheet_url || ""} onChange={(e) => update("datasheet_url", e.target.value)} placeholder="https://..." />
          </Field>

          <Field label="主图 URL" full>
            <Input value={form.image_url || ""} onChange={(e) => update("image_url", e.target.value)} placeholder="https://..." />
            {form.image_url && <img src={form.image_url} alt="" className="mt-2 h-24 w-auto rounded border border-border object-cover" />}
          </Field>

          {/* === 物性数据（仅编辑模式） === */}
          {!isNew && form.id && (
            <div className="col-span-2 mt-4 rounded-lg border border-border bg-muted/30 p-4">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-semibold">物性参数</h3>
                <Button type="button" size="sm" variant="outline" onClick={saveProps}>保存物性</Button>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <Field label="密度 (g/cm³)"><Input type="number" step="0.001" value={props.density ?? ""} onChange={(e) => updateP("density", e.target.value)} /></Field>
                <Field label="拉伸强度 (MPa)"><Input type="number" step="0.1" value={props.tensile_strength ?? ""} onChange={(e) => updateP("tensile_strength", e.target.value)} /></Field>
                <Field label="断裂伸长率 (%)"><Input type="number" step="0.1" value={props.elongation ?? ""} onChange={(e) => updateP("elongation", e.target.value)} /></Field>
                <Field label="弯曲模量 (MPa)"><Input type="number" step="1" value={props.flexural_modulus ?? ""} onChange={(e) => updateP("flexural_modulus", e.target.value)} /></Field>
                <Field label="冲击强度 (kJ/m²)"><Input type="number" step="0.1" value={props.impact_strength ?? ""} onChange={(e) => updateP("impact_strength", e.target.value)} /></Field>
                <Field label="热变形温度 (°C)"><Input type="number" step="0.1" value={props.heat_deflection_temperature ?? ""} onChange={(e) => updateP("heat_deflection_temperature", e.target.value)} /></Field>
                <Field label="熔流指数 MFI (g/10min)"><Input type="number" step="0.1" value={props.melt_flow_index ?? ""} onChange={(e) => updateP("melt_flow_index", e.target.value)} /></Field>
                <Field label="UL94 阻燃等级"><Input value={props.ul94_rating ?? ""} onChange={(e) => updateP("ul94_rating", e.target.value)} placeholder="V-0 / V-1 / HB" /></Field>
                <Field label="备注" full><Textarea rows={2} value={props.notes ?? ""} onChange={(e) => updateP("notes", e.target.value)} /></Field>
              </div>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>取消</Button>
          <Button onClick={() => onSave(form)}>保存产品</Button>
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
