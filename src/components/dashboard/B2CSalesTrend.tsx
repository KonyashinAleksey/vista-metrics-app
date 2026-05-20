import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { formatValue } from "@/lib/format";

const SERIES = [22496, 26472, 36780, 30016, 27338, 32931, 31090, 26274, 28869, 29593];

export function B2CSalesTrend() {
  const data = SERIES.map((v, i) => ({ day: `${9 + i}.05`, value: v }));
  const min = Math.min(...SERIES);
  const max = Math.max(...SERIES);
  const pad = Math.round((max - min) * 0.2) || 1;

  return (
    <section className="rounded-2xl border bg-card px-3 pt-2.5 pb-1">
      <div className="flex items-center justify-between">
        <div className="text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
          Продажи КСП · шт · 10 дней
        </div>
        <div className="text-[10px] tabular text-muted-foreground">
          {formatValue(min, "number")} – {formatValue(max, "number")}
        </div>
      </div>
      <div className="mt-1 h-20 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 4, right: 0, bottom: 0, left: 0 }} barCategoryGap="20%">
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              interval={0}
              tick={{ fontSize: 9, fill: "var(--color-muted-foreground)" }}
              tickMargin={4}
            />
            <YAxis domain={[min - pad, max + pad]} hide />
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
