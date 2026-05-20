import { Area, AreaChart, ResponsiveContainer } from "recharts";

type Tone = "positive" | "negative" | "neutral";

const toneColor: Record<Tone, string> = {
  positive: "var(--color-success)",
  negative: "var(--color-danger)",
  neutral: "var(--color-muted-foreground)",
};

export function Sparkline({ data, tone = "neutral", height = 48 }: { data: number[]; tone?: Tone; height?: number }) {
  const series = data.map((v, i) => ({ i, v }));
  const color = toneColor[tone];
  const gradientId = `spark-${tone}-${data.length}`;

  return (
    <div style={{ height }} className="w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={series} margin={{ top: 4, right: 0, bottom: 0, left: 0 }}>
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.25} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="v"
            stroke={color}
            strokeWidth={1.5}
            fill={`url(#${gradientId})`}
            isAnimationActive={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
