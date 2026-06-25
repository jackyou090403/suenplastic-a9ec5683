import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { upsertMaterialCategory, deleteMaterialCategory } from "@/lib/taxonomy.functions";
import { toast } from "sonner";

const blank = { code: "", name_zh: "", name_en: "", description: "", sort_order: 0 };

export function MaterialsTab() {
  const qc = useQueryClient();
  const up = useServerFn(upsertMaterialCategory);
  const del = useServerFn(deleteMaterialCategory);
  const { data: rows = [], isLoading } = useQuery({
    queryKey: ["admin-materials-full"],
    queryFn: async () => (await supabase.from("material_categories").select("*").order("sort_order")).data ?? [],
  });
  const [editing, setEditing] = useState<any>(null);
  const [creating, setCreating] = useState(false);

  const save = async (row: any) => {
    try { await up({ data: row }); toast.success("已保存"); qc.invalidateQueries({ queryKey: ["admin-materials-full"] }); qc.invalidateQueries({ queryKey: ["admin-materials"] }); setEditing(null); setCreating(false); }
    catch (e: any) { toast.error(e.message); }
  };
  const remove = async (id: string, code: string) => {
    if (!confirm(`删除材料分类 ${code}?`)) return;
    try { await del({ data: { id } }); toast.success("已删除"); qc.invalidateQueries({ queryKey: ["admin-materials-full"] }); }
    catch (e: any) { toast.error(e.message); }
  };

  return (
    <div>
      <div className="mb-4 flex justify-end"><Button onClick={() => setCreating(true)}>+ 新增材料分类</Button></div>
      <div className="rounded-lg border border-border bg-card overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 text-left">
            <tr><th className="p-2">code</th><th className="p-2">中文名</th><th className="p-2">English</th><th className="p-2">排序</th><th className="p-2 text-right">操作</th></tr>
          </thead>
          <tbody>
            {isLoading && <tr><td colSpan={5} className="p-6 text-center text-muted-foreground">加载中...</td></tr>}
            {rows.map((m: any) => (
              <tr key={m.id} className="border-t border-border hover:bg-muted/30">
                <td className="p-2 font-mono text-xs">{m.code}</td>
                <td className="p-2">{m.name_zh}</td>
                <td className="p-2">{m.name_en}</td>
                <td className="p-2">{m.sort_order}</td>
                <td className="p-2 text-right whitespace-nowrap">
                  <button className="text-primary text-xs underline mr-3" onClick={() => setEditing(m)}>编辑</button>
                  <button className="text-destructive text-xs underline" onClick={() => remove(m.id, m.code)}>删除</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <EditDlg open={creating || !!editing} row={editing ?? blank} onSave={save} onClose={() => { setEditing(null); setCreating(false); }} isNew={creating} />
    </div>
  );
}

function EditDlg({ open, row, onSave, onClose, isNew }: any) {
  const [form, setForm] = useState<any>(row);
  useEffect(() => setForm(row), [row]);
  const u = (k: string, v: any) => setForm((f: any) => ({ ...f, [k]: v }));
  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-xl">
        <DialogHeader><DialogTitle>{isNew ? "新增材料分类" : "编辑材料分类"}</DialogTitle></DialogHeader>
        <div className="grid grid-cols-2 gap-3">
          <F label="code *"><Input value={form.code} onChange={(e) => u("code", e.target.value)} placeholder="pa66" /></F>
          <F label="排序"><Input type="number" value={form.sort_order ?? 0} onChange={(e) => u("sort_order", Number(e.target.value))} /></F>
          <F label="中文名 *"><Input value={form.name_zh} onChange={(e) => u("name_zh", e.target.value)} /></F>
          <F label="English name *"><Input value={form.name_en} onChange={(e) => u("name_en", e.target.value)} /></F>
          <F label="说明" full><Textarea rows={3} value={form.description || ""} onChange={(e) => u("description", e.target.value)} /></F>
        </div>
        <DialogFooter><Button variant="outline" onClick={onClose}>取消</Button><Button onClick={() => onSave(form)}>保存</Button></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
function F({ label, children, full }: any) {
  return <div className={full ? "col-span-2 space-y-1.5" : "space-y-1.5"}><Label className="text-xs">{label}</Label>{children}</div>;
}
