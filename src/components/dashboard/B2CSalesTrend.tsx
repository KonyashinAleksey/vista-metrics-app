import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { formatValue } from "@/lib/format";

const SERIES = [22496, 26472, 36780, 30016, 27338, 32931, 31090, 26274, 28869, 29593];

export function B2CSalesTrend() {
  const data = SERIES.map((v, i) => ({ day: `Д${i + 1}`, value: v }));
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
      <div className="mt-1 h-16 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
            <defs>
              <linearGradient id="b2c-sales-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-ink)" stopOpacity={0.18} />
                <stop offset="100%" stopColor="var(--color-ink)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="day" hide />
            <YAxis domain={[min - pad, max + pad]} hide />
            <Tooltip
              cursor={{ stroke: "var(--color-hairline)" }}
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
            <Area
              type="monotone"
              dataKey="value"
              stroke="var(--color-ink)"
              strokeWidth={1.5}
              fill="url(#b2c-sales-grad)"
              isAnimationActive={false}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
