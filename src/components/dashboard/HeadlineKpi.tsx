import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { formatPct, formatValue, splitValueUnit, toneFromChange } from "@/lib/format";
import type { MetricSnapshot } from "@/lib/mock-data";

export function HeadlineKpi({ metric, title }: { metric: MetricSnapshot; title: string }) {
  const tone = toneFromChange(metric.dodChangePct);
  const Arrow = tone === "negative" ? ArrowDownRight : ArrowUpRight;

  const runRateVsPlan = ((metric.runRate - metric.planTarget) / metric.planTarget) * 100;
  const rrTone = runRateVsPlan >= 0 ? "positive" : "negative";


  return (
    <section className="rounded-2xl border bg-card p-4">
      <div>
        <div className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
          <span className="h-1 w-1 rounded-full bg-ink" />
          {title}
        </div>
        <h1 className="mt-1.5 font-display leading-[1] text-ink tabular flex items-baseline gap-1.5">
          <ValueUnit formatted={formatValue(metric.yesterday, metric.unit)} valueClass="text-[40px]" unitClass="text-xl" />
        </h1>
        <div className="mt-1.5 flex items-center gap-2 text-[11px] text-muted-foreground">
          <span>-1d</span>
          <span
            className={`inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[10px] font-medium tabular ${
              tone === "negative"
                ? "bg-danger/10 text-danger"
                : tone === "positive"
                  ? "bg-success/10 text-success"
                  : "bg-muted text-muted-foreground"
            }`}
          >
            <Arrow className="h-2.5 w-2.5" />
            {formatPct(metric.dodChangePct)}
          </span>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2 border-t hairline pt-2.5">
        <Stat
          label="MTD RR"
          value={formatValue(metric.mtd, metric.unit)}
          sub={
            <span className={rrTone === "positive" ? "text-success" : "text-danger"}>
              {formatPct(runRateVsPlan)} к плану
            </span>
          }
        />
        <Stat
          label="YTD RR"
          value={formatValue(metric.runRate, metric.unit)}
          sub={
            <span className={rrTone === "positive" ? "text-success" : "text-danger"}>
              {formatPct(runRateVsPlan)} к плану
            </span>
          }
        />
      </div>
    </section>
  );
}

function ValueUnit({ formatted, valueClass, unitClass }: { formatted: string; valueClass: string; unitClass: string }) {
  const { value, unit } = splitValueUnit(formatted);
  return (
    <>
      <span className={valueClass}>{value}</span>
      {unit && <span className={`${unitClass} text-muted-foreground ml-1`}>{unit}</span>}
    </>
  );
}

function Stat({ label, value, sub }: { label: string; value: string; sub?: React.ReactNode }) {
  return (
    <div className="min-w-0">
      <div className="text-[9px] font-medium uppercase tracking-[0.1em] text-muted-foreground">{label}</div>
      <div className="mt-0.5 font-display text-ink tabular leading-tight truncate">
        <ValueUnit formatted={value} valueClass="text-lg" unitClass="text-[11px]" />
      </div>
      {sub && <div className="mt-0.5 text-[10px] tabular truncate">{sub}</div>}
    </div>
  );
}
