import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";
import { formatPct, formatValue, splitValueUnit, toneFromChange } from "@/lib/format";
import type { MetricSnapshot } from "@/lib/mock-data";

const toneClass = {
  positive: "text-success",
  negative: "text-danger",
  neutral: "text-muted-foreground",
} as const;

function ValueUnit({ formatted, valueClass, unitClass }: { formatted: string; valueClass: string; unitClass: string }) {
  const { value, unit } = splitValueUnit(formatted);
  return (
    <>
      <span className={valueClass}>{value}</span>
      {unit && <span className={`${unitClass} text-muted-foreground ml-1`}>{unit}</span>}
    </>
  );
}

export function MetricCard({ metric }: { metric: MetricSnapshot }) {
  const dodTone = toneFromChange(metric.dodChangePct);
  const Icon = dodTone === "positive" ? ArrowUpRight : dodTone === "negative" ? ArrowDownRight : Minus;

  return (
    <div className="min-w-0 rounded-xl border bg-card px-3 py-2.5">
      <div className="text-[9px] font-medium uppercase tracking-[0.1em] text-muted-foreground truncate">
        {metric.label}
      </div>
      <div className="mt-1 font-display text-ink leading-none tabular truncate">
        <ValueUnit formatted={formatValue(metric.yesterday, metric.unit)} valueClass="text-lg" unitClass="text-[11px]" />
      </div>
      <div className={`mt-1 inline-flex items-center gap-0.5 text-[10px] font-medium tabular ${toneClass[dodTone]}`}>
        <Icon className="h-2.5 w-2.5" />
        {formatPct(metric.dodChangePct)}
      </div>
    </div>
  );
}
