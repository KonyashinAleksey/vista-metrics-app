import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { MetricSnapshot } from "@/lib/mock-data";
import { formatValue } from "@/lib/format";

export function SellersTrend({ metric }: { metric: MetricSnapshot }) {
  const last10 = metric.daily.slice(-10);
  const data = last10.map((v, i) => ({ day: `Д${i + 1}`, value: v }));
  const min = Math.min(...last10);
  const max = Math.max(...last10);
  const pad = Math.round((max - min) * 0.2) || 1;

  return (
    <section className="rounded-2xl border bg-card px-3 pt-2.5 pb-1">
      <div className="flex items-center justify-between">
        <div className="text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
          Активные селлеры · 10 дней
        </div>
        <div className="text-[10px] tabular text-muted-foreground">
          {formatValue(min, "number")} – {formatValue(max, "number")}
        </div>
      </div>
      <div className="mt-1 h-16 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: 0 }} barCategoryGap="20%">
            <XAxis dataKey="day" hide />
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
              formatter={(v: number) => [formatValue(v, "number"), "Селлеры"]}
            />
            <Bar dataKey="value" fill="var(--color-ink)" radius={[2, 2, 0, 0]} isAnimationActive={false} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
