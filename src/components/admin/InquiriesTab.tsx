import { useMemo, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { updateInquiryStatus, deleteInquiry } from "@/lib/inquiries.functions";
import { toast } from "sonner";
import * as XLSX from "xlsx";

const STATUS = [
  { v: "new", l: "新询盘" },
  { v: "contacted", l: "已联系" },
  { v: "qualified", l: "有意向" },
  { v: "won", l: "成交" },
  { v: "lost", l: "无效" },
  { v: "spam", l: "垃圾" },
];

export function InquiriesTab() {
  const qc = useQueryClient();
  const upd = useServerFn(updateInquiryStatus);
  const del = useServerFn(deleteInquiry);
  const { data: rows = [], isLoading } = useQuery({
    queryKey: ["admin-inquiries"],
    queryFn: async () => (await supabase.from("inquiries").select("*").order("created_at", { ascending: false })).data ?? [],
  });
  const [filter, setFilter] = useState<string>("all");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => rows.filter((r: any) =>
    (filter === "all" || r.status === filter) &&
    (!q || [r.name, r.email, r.company, r.message, r.phone, r.product_slug].join(" ").toLowerCase().includes(q.toLowerCase())),
  ), [rows, filter, q]);

  const changeStatus = async (id: string, status: any) => {
    try { await upd({ data: { id, status } }); toast.success("已更新"); qc.invalidateQueries({ queryKey: ["admin-inquiries"] }); }
    catch (e: any) { toast.error(e.message); }
  };

  const remove = async (id: string) => {
    if (!confirm("删除此询盘？")) return;
    try { await del({ data: { id } }); toast.success("已删除"); qc.invalidateQueries({ queryKey: ["admin-inquiries"] }); }
    catch (e: any) { toast.error(e.message); }
  };

  const exportXlsx = () => {
    const ws = XLSX.utils.json_to_sheet(filtered.map((r: any) => ({
      时间: r.created_at, 姓名: r.name, 公司: r.company, 邮箱: r.email, 电话: r.phone, 国家: r.country,
      产品: r.product_slug, 留言: r.message, 状态: r.status, 来源: r.source,
    })));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "inquiries");
    XLSX.writeFile(wb, `inquiries-${Date.now()}.xlsx`);
  };

  const statusCount = (s: string) => rows.filter((r: any) => r.status === s).length;

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <Input placeholder="搜索姓名 / 邮箱 / 公司 / 留言..." value={q} onChange={(e) => setQ(e.target.value)} className="max-w-xs" />
        <Select value={filter} onValueChange={setFilter}>
          <SelectTrigger className="w-[180px]"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">全部状态 ({rows.length})</SelectItem>
            {STATUS.map(s => <SelectItem key={s.v} value={s.v}>{s.l} ({statusCount(s.v)})</SelectItem>)}
          </SelectContent>
        </Select>
        <Button variant="outline" className="ml-auto" onClick={exportXlsx}>导出 Excel</Button>
      </div>

      <div className="rounded-lg border border-border bg-card overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 text-left">
            <tr>
              <th className="p-2">时间</th><th className="p-2">姓名/公司</th><th className="p-2">联系方式</th>
              <th className="p-2">产品</th><th className="p-2">留言</th><th className="p-2">状态</th><th className="p-2 text-right">操作</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && <tr><td colSpan={7} className="p-6 text-center text-muted-foreground">加载中...</td></tr>}
            {!isLoading && filtered.length === 0 && <tr><td colSpan={7} className="p-6 text-center text-muted-foreground">暂无询盘</td></tr>}
            {filtered.map((r: any) => (
              <tr key={r.id} className="border-t border-border align-top hover:bg-muted/30">
                <td className="p-2 text-xs whitespace-nowrap">{new Date(r.created_at).toLocaleString("zh-CN")}</td>
                <td className="p-2">
                  <div className="font-medium">{r.name}</div>
                  <div className="text-xs text-muted-foreground">{r.company}{r.country ? ` · ${r.country}` : ""}</div>
                </td>
                <td className="p-2 text-xs">
                  <div>{r.email}</div>
                  {r.phone && <div className="text-muted-foreground">{r.phone}</div>}
                </td>
                <td className="p-2 text-xs">{r.product_slug || "—"}</td>
                <td className="p-2 text-xs max-w-[280px] whitespace-pre-wrap">{r.message}</td>
                <td className="p-2">
                  <Select value={r.status} onValueChange={(v) => changeStatus(r.id, v)}>
                    <SelectTrigger className="h-8 w-[110px] text-xs"><SelectValue /></SelectTrigger>
                    <SelectContent>{STATUS.map(s => <SelectItem key={s.v} value={s.v}>{s.l}</SelectItem>)}</SelectContent>
                  </Select>
                </td>
                <td className="p-2 text-right">
                  <button className="text-destructive text-xs underline" onClick={() => remove(r.id)}>删除</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
