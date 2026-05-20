import { Bar, BarChart, LabelList, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { formatValue, formatCompact } from "@/lib/format";
import { b2c } from "@/lib/b2c-data";

export function B2CSalesTrend() {
  const { series, benchmark } = b2c.salesLast10;
  const data = series.map((v, i) => ({ day: `${10 + i}.05`, value: v }));
  const min = Math.min(...series);
  const max = Math.max(...series, benchmark);
  const pad = Math.round((max - min) * 0.15) || 1;

  return (
    <section className="rounded-2xl border bg-card px-3 pt-2.5 pb-1">
      <div className="flex items-center justify-between">
        <div className="text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
          Продажи за последние 10 дней
        </div>
        <div className="flex items-center gap-1.5 text-[9px] uppercase tracking-[0.08em] text-muted-foreground">
          <span className="h-[2px] w-3 bg-warning" />
          Бенчмарк ({formatValue(benchmark, "number")})
        </div>
      </div>
      <div className="mt-1 h-32 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 14, right: 0, bottom: 0, left: 0 }} barCategoryGap="20%">
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              interval={0}
              tick={{ fontSize: 9, fill: "var(--color-muted-foreground)" }}
              tickMargin={4}
            />
            <YAxis domain={[Math.max(0, min - pad), max + pad]} hide />
            <ReferenceLine
              y={benchmark}
              stroke="var(--color-warning)"
              strokeDasharray="3 3"
              strokeWidth={1}
            />
            <Tooltip
              cursor={{ fill: "var(--color-hairline)", opacity: 0.4 }}
              contentStyle={{
                background: "var(--color-card)",
                border: "1px solid var(--color-border)",
                borderRadius: 8,
                fontSize: 11,
                padding: "4px 8px",
              }}
              labelStyle={{ color: "var(--color-muted-foreground)" }}
              formatter={(v: number) => [formatValue(v, "number"), "Продажи"]}
            />
            <Bar dataKey="value" fill="var(--color-ink)" radius={[2, 2, 0, 0]} isAnimationActive={false} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
