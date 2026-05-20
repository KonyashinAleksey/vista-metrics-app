import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatCompact } from "@/lib/format";
import { buildMonthProjection } from "@/lib/mock-data";

export function RevenueChart() {
  const data = buildMonthProjection();

  return (
    <section className="rounded-3xl border bg-card p-5 md:p-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
            Накопительная динамика дохода
          </div>
          <h2 className="mt-1 font-display text-xl text-ink">Факт · План · Прогноз</h2>
        </div>
        <Legend />
      </div>

      <div className="mt-5 h-[280px] w-full md:h-[340px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data} margin={{ top: 10, right: 8, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="actualFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-ink)" stopOpacity={0.18} />
                <stop offset="100%" stopColor="var(--color-ink)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="var(--color-hairline)" vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
              interval={2}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fontSize: 11, fill: "var(--color-muted-foreground)" }}
              tickFormatter={(v) => formatCompact(v)}
              width={60}
            />
            <Tooltip
              cursor={{ stroke: "var(--color-hairline)" }}
              contentStyle={{
                background: "var(--color-card)",
                border: "1px solid var(--color-border)",
                borderRadius: 12,
                fontSize: 12,
              }}
              formatter={(v: number, n: string) => [`${formatCompact(v)} ₽`, labelMap[n] ?? n]}
              labelFormatter={(l) => `День ${l}`}
            />
            <Area
              type="monotone"
              dataKey="actual"
              stroke="var(--color-ink)"
              strokeWidth={2}
              fill="url(#actualFill)"
              connectNulls={false}
              isAnimationActive={false}
            />
            <Line
              type="monotone"
              dataKey="plan"
              stroke="var(--color-muted-foreground)"
              strokeWidth={1.5}
              strokeDasharray="4 4"
              dot={false}
              isAnimationActive={false}
            />
            <Line
              type="monotone"
              dataKey="forecast"
              stroke="var(--color-success)"
              strokeWidth={2}
              strokeDasharray="2 4"
              dot={false}
              connectNulls
              isAnimationActive={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

const labelMap: Record<string, string> = {
  actual: "Факт",
  plan: "План",
  forecast: "Прогноз",
};

function Legend() {
  const items = [
    { label: "Факт", color: "var(--color-ink)", style: "solid" },
    { label: "План", color: "var(--color-muted-foreground)", style: "dashed" },
    { label: "Прогноз", color: "var(--color-success)", style: "dotted" },
  ];
  return (
    <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
      {items.map((i) => (
        <span key={i.label} className="inline-flex items-center gap-1.5">
          <span
            className="h-[2px] w-5"
            style={{
              background: i.color,
              borderTop: i.style === "dashed" ? `2px dashed ${i.color}` : undefined,
              backgroundColor: i.style === "solid" ? i.color : "transparent",
            }}
          />
          {i.label}
        </span>
      ))}
    </div>
  );
}
