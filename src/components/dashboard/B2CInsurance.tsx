import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { b2c, type B2CProduct, type B2CRRCard, type B2CTopCard } from "@/lib/b2c-data";
import { B2CSalesTrend } from "./B2CSalesTrend";

function toneFromPct(pct: number) {
  if (pct >= 90) return "high" as const;
  if (pct >= 45) return "mid" as const;
  return "low" as const;
}

const toneText: Record<"low" | "mid" | "high", string> = {
  low: "text-danger",
  mid: "text-warning",
  high: "text-success",
};

const toneBg: Record<"low" | "mid" | "high", string> = {
  low: "bg-danger/10 text-danger",
  mid: "bg-warning/15 text-warning",
  high: "bg-success/10 text-success",
};

const toneBar: Record<"low" | "mid" | "high", string> = {
  low: "bg-danger",
  mid: "bg-warning",
  high: "bg-success",
};

export function B2CInsurance() {
  return (
    <section className="flex flex-col gap-2">
      <header className="flex items-end justify-between">
        <h2 className="text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
          Страховые продукты · B2C
        </h2>
      </header>

      <div className="grid grid-cols-2 gap-2">
        {b2c.topCards.map((c) => (
          <TopCard key={c.title} card={c} />
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2">
        {b2c.rrCards.map((c) => (
          <RRCard key={c.title} card={c} />
        ))}
      </div>

      <ProductsCard products={b2c.topProducts} />

      <B2CSalesTrend />
    </section>
  );
}

function TopCard({ card }: { card: B2CTopCard }) {
  return (
    <div className="rounded-2xl border bg-card p-2.5">
      <div className="flex items-start justify-between border-b hairline pb-1.5">
        <div className="min-w-0">
          <div className="text-[9px] font-semibold uppercase tracking-[0.1em] text-ink">
            {card.title}
          </div>
          <div className="text-[8.5px] font-medium uppercase tracking-[0.06em] text-muted-foreground mt-0.5">
            {card.unitLabel}
          </div>
        </div>
        <div className="text-right shrink-0">
          <div className="text-[8.5px] font-medium uppercase tracking-[0.06em] text-muted-foreground">
            Бенчмарк/день
          </div>
          <div className="text-[11px] font-semibold tabular text-ink/70">
            {card.benchmark}
          </div>
        </div>
      </div>

      <div className="mt-2 grid grid-cols-2 gap-2">
        <Cell label="Вчера" value={card.yesterday} delta={card.yesterdayDelta} />
        <Cell label="Ср. 10д" value={card.avg10} delta={card.avg10Delta} />
      </div>
    </div>
  );
}

function Cell({ label, value, delta }: { label: string; value: string; delta: number }) {
  const tone = delta >= 0 ? (delta >= 5 ? "high" : "mid") : delta <= -20 ? "low" : "mid";
  const Arrow = delta >= 0 ? ArrowUpRight : ArrowDownRight;
  const sign = delta > 0 ? "+" : "";
  return (
    <div className="min-w-0">
      <div className="text-[8.5px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
        {label}
      </div>
      <div className="mt-0.5 font-display text-ink leading-none text-[20px] tabular truncate">
        {value}
      </div>
      <span
        className={`mt-1 inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 text-[10px] font-semibold tabular ${toneBg[tone]}`}
      >
        <Arrow className="h-2.5 w-2.5" />
        {sign}
        {delta}%
      </span>
    </div>
  );
}

function RRCard({ card }: { card: B2CRRCard }) {
  return (
    <div className="rounded-2xl border bg-card p-2.5">
      <div className="flex items-start justify-between border-b hairline pb-1.5">
        <div className="min-w-0">
          <div className="text-[9px] font-semibold uppercase tracking-[0.1em] text-ink">
            {card.title}
          </div>
          <div className="text-[8.5px] font-medium uppercase tracking-[0.06em] text-muted-foreground mt-0.5">
            {card.unitLabel}
          </div>
        </div>
        <div className="flex gap-3 text-[8px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
          <span className="w-10 text-right">План</span>
          <span className="w-8 text-right">Вып.</span>
        </div>
      </div>

      <div className="mt-2 flex flex-col gap-1.5">
        {card.periods.map((p) => {
          const tone = toneFromPct(p.pct);
          return (
            <div key={p.label}>
              <div className="text-[9px] font-semibold uppercase tracking-[0.07em] text-ink mb-1">
                {p.label}
              </div>
              <div className="grid grid-cols-[1fr_auto_auto] items-center gap-2 rounded-lg border bg-muted/40 px-2 py-1.5">
                <div className="min-w-0">
                  <div className="text-[13px] font-bold tabular text-ink truncate">
                    {p.fact}
                  </div>
                  <div className="mt-1 h-[3px] w-full rounded-full bg-muted overflow-hidden">
                    <div
                      className={`h-full rounded-full ${toneBar[tone]}`}
                      style={{ width: `${Math.min(100, p.pct)}%` }}
                    />
                  </div>
                </div>
                <div className="w-10 text-right text-[10.5px] font-medium tabular text-muted-foreground">
                  {p.plan}
                </div>
                <div className={`w-8 text-right text-[15px] font-bold tabular leading-none ${toneText[tone]}`}>
                  {p.pct}%
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ProductsCard({ products }: { products: B2CProduct[] }) {
  return (
    <div className="rounded-2xl border bg-card p-3">
      <div className="text-[9px] font-semibold uppercase tracking-[0.07em] text-ink mb-2">
        ТОП-5 ПРОДУКТОВ · КД МЛН ₽
      </div>
      <div className="grid grid-cols-[1fr_52px_52px_44px] gap-1 border-b hairline pb-1 text-[8.5px] font-semibold uppercase tracking-[0.07em] text-muted-foreground">
        <span>Продукт</span>
        <span className="text-right">Факт</span>
        <span className="text-right">План</span>
        <span className="text-right">%</span>
      </div>
      {products.map((p) => {
        const pct = Math.round((p.fact / p.plan) * 100);
        const tone = toneFromPct(pct);
        return (
          <div
            key={p.name}
            className="grid grid-cols-[1fr_52px_52px_44px] gap-1 items-center py-1.5 border-b hairline last:border-b-0"
          >
            <div className="text-[12px] font-medium text-ink truncate">{p.name}</div>
            <div className="text-right text-[12px] font-semibold tabular text-ink">
              {p.fact.toLocaleString("ru-RU")}
            </div>
            <div className="text-right text-[12px] tabular text-muted-foreground">
              {p.plan.toLocaleString("ru-RU")}
            </div>
            <div className={`text-right text-[13px] font-bold tabular ${toneText[tone]}`}>
              {pct}%
            </div>
          </div>
        );
      })}
    </div>
  );
}
