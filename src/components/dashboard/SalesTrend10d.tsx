import { Bar, BarChart, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { formatCompact } from "@/lib/format";

const data = [
  { day: "12.05", value: 3_780_000 },
  { day: "13.05", value: 3_920_000 },
  { day: "14.05", value: 4_050_000 },
  { day: "15.05", value: 3_640_000 },
  { day: "16.05", value: 3_870_000 },
  { day: "17.05", value: 4_210_000 },
  { day: "18.05", value: 3_990_000 },
  { day: "19.05", value: 4_080_000 },
  { day: "20.05", value: 3_950_000 },
  { day: "21.05", value: 4_120_000 },
];

export function SalesTrend10d() {
  const values = data.map((d) => d.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const pad = Math.round((max - min) * 0.2) || 1;

  return (
    <section className="rounded-2xl border bg-card px-3 pt-2.5 pb-1">
      <div className="flex items-center justify-between">
        <div className="text-[10px] font-medium uppercase tracking-[0.12em] text-foreground">
          Продажи за последние 10 дней
        </div>
        <div className="text-[10px] tabular text-muted-foreground">
          {formatCompact(min)} – {formatCompact(max)}
        </div>
      </div>
      <div className="mt-1 h-24 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 12, right: 0, bottom: 0, left: 0 }} barCategoryGap="20%">
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
              formatter={(v: number) => [formatCompact(v), "Продажи"]}
            />
            <Bar dataKey="value" fill="var(--color-ink)" radius={[2, 2, 0, 0]} isAnimationActive={false}>
              <LabelList
                dataKey="value"
                position="top"
                offset={3}
                formatter={(v: number) => formatCompact(v)}
                style={{ fontSize: 9, fill: "var(--color-ink)" }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
