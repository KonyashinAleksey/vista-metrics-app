import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { formatPct, formatValue, splitValueUnit, toneFromChange } from "@/lib/format";
import type { MetricSnapshot } from "@/lib/mock-data";

export function HeadlineKpi({
  metric,
  title,
  secondary,
}: {
  metric: MetricSnapshot;
  title: string;
  secondary?: { metric: MetricSnapshot; title: string };
}) {
  return (
    <section className="rounded-2xl border bg-card p-4">
      <div className={secondary ? "grid grid-cols-2 gap-4" : ""}>
        <KpiBlock metric={metric} title={title} />
        {secondary && <KpiBlock metric={secondary.metric} title={secondary.title} />}
      </div>
    </section>
  );
}

export function RunRateCard({ metric, title }: { metric: MetricSnapshot; title: string }) {
  const runRateVsPlan = ((metric.runRate - metric.planTarget) / metric.planTarget) * 100;
  const rrTone = runRateVsPlan >= 0 ? "positive" : "negative";
  const toneClass = rrTone === "positive" ? "text-success" : "text-danger";

  return (
    <section className="flex flex-col">
      <div className="mb-1.5">
        <h2 className="text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
          {title}
        </h2>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <RrTile
          label="по месяцу"
          value={formatValue(metric.mtd, metric.unit)}
          sub={<span className={toneClass}>{formatPct(runRateVsPlan)} к плану</span>}
        />
        <RrTile
          label="по году"
          value={formatValue(metric.runRate, metric.unit)}
          sub={<span className={toneClass}>{formatPct(runRateVsPlan)} к плану</span>}
        />
      </div>
    </section>
  );
}

function RrTile({ label, value, sub }: { label: string; value: string; sub?: React.ReactNode }) {
  return (
    <div className="min-w-0 rounded-xl border bg-card px-3 py-2.5 text-left">
      <div className="text-[9px] font-medium uppercase tracking-[0.1em] text-muted-foreground truncate">
        {label}
      </div>
      <div className="mt-1 font-display text-ink leading-none tabular truncate">
        <ValueUnit formatted={value} valueClass="text-lg" unitClass="text-[11px]" />
      </div>
      {sub && <div className="mt-1 text-[10px] tabular truncate">{sub}</div>}
    </div>
  );
}

function KpiBlock({ metric, title }: { metric: MetricSnapshot; title: string }) {
  const tone = toneFromChange(metric.dodChangePct);
  const Arrow = tone === "negative" ? ArrowDownRight : ArrowUpRight;
  return (
    <div>
      <div className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
        <span className="h-1 w-1 rounded-full bg-ink" />
        {title}
      </div>
      <h1 className="mt-1.5 font-display leading-[1] text-ink tabular flex items-baseline gap-1.5">
        <ValueUnit formatted={formatValue(metric.yesterday, metric.unit)} valueClass="text-[40px]" unitClass="text-xl" />
        {metric.displayUnit && (
          <span className="text-xl text-muted-foreground">{metric.displayUnit}</span>
        )}
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
