import { Sparkles, TrendingDown, TrendingUp } from "lucide-react";
import { insights } from "@/lib/mock-data";

const toneStyles = {
  positive: { dot: "bg-success", Icon: TrendingUp, color: "text-success" },
  warning: { dot: "bg-warning", Icon: TrendingDown, color: "text-warning" },
  negative: { dot: "bg-danger", Icon: TrendingDown, color: "text-danger" },
} as const;

export function Insights() {
  return (
    <section className="rounded-3xl border bg-card p-5 md:p-6">
      <div className="flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-muted-foreground" />
        <h2 className="text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
          Что изменилось
        </h2>
      </div>

      <ul className="mt-4 divide-y hairline">
        {insights.map((insight) => {
          const s = toneStyles[insight.tone];
          return (
            <li key={insight.title} className="flex gap-3 py-3 first:pt-0 last:pb-0">
              <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${s.dot}`} />
              <div className="flex-1">
                <div className="flex items-center gap-1.5">
                  <s.Icon className={`h-3.5 w-3.5 ${s.color}`} />
                  <h3 className="text-sm font-medium text-ink">{insight.title}</h3>
                </div>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{insight.body}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
