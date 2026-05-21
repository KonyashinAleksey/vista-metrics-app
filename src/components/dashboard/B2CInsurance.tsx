import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";
import { b2c, type B2CKpi, type B2CProduct, type B2CRrTile, type B2CSegmentCard } from "@/lib/b2c-data";
import { formatPct, toneFromChange } from "@/lib/format";
import { B2CSalesTrend } from "./B2CSalesTrend";

function deltaPill(deltaPct: number) {
  const tone = toneFromChange(deltaPct);
  const Icon = tone === "positive" ? ArrowUpRight : tone === "negative" ? ArrowDownRight : Minus;
  const cls =
    tone === "negative"
      ? "bg-danger/10 text-danger"
      : tone === "positive"
        ? "bg-success/10 text-success"
        : "bg-muted text-muted-foreground";
  return { Icon, cls };
}

export function B2CInsurance() {
  return (
    <section className="flex flex-col gap-3">
      <header className="flex items-end justify-start">
        <h2 className="text-[10px] font-medium uppercase tracking-[0.12em] text-foreground">
          Страховые продукты · B2C
        </h2>
      </header>

      {/* KPI headline — like B2B HeadlineKpi */}
      <section className="rounded-2xl border bg-card p-4">
        <div className="grid grid-cols-2 gap-4">
          {b2c.kpis.map((k) => (
            <KpiBlock key={k.title} kpi={k} />
          ))}
        </div>
      </section>

      {/* RR ЧКД — like B2B RunRateCard */}
      <section className="flex flex-col">
        <div className="mb-1.5">
          <h3 className="text-[10px] font-medium uppercase tracking-[0.12em] text-foreground">
            {b2c.rr.title}
          </h3>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {b2c.rr.tiles.map((t) => (
            <RrTile key={t.label} tile={t} />
          ))}
        </div>
      </section>

      {/* Сегменты продаж */}
      <div className="grid grid-cols-2 gap-2">
        {b2c.segments.map((s) => (
          <SegmentCard key={s.title} card={s} />
        ))}
      </div>

      {/* ТОП-5 продуктов */}
      <ProductsCard products={b2c.topProducts} />

      {/* График продаж */}
      <B2CSalesTrend />
    </section>
  );
}

function KpiBlock({ kpi }: { kpi: B2CKpi }) {
  const { Icon, cls } = deltaPill(kpi.deltaPct);
  return (
    <div>
      <div className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
        <span className="h-1 w-1 rounded-full bg-ink" />
        <span className="truncate">{kpi.title}</span>
      </div>
      <h1 className="mt-1.5 font-display leading-[1] text-ink tabular flex items-baseline gap-1.5">
        <span className="text-[32px]">{kpi.value}</span>
        <span className="text-base text-muted-foreground">{kpi.unit}</span>
      </h1>
      <div className="mt-1.5 flex items-center gap-2 text-[11px] text-muted-foreground">
        <span>-1d</span>
        <span
          className={`inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[10px] font-medium tabular ${cls}`}
        >
          <Icon className="h-2.5 w-2.5" />
          {formatPct(kpi.deltaPct)}
        </span>
      </div>
    </div>
  );
}

function RrTile({ tile }: { tile: B2CRrTile }) {
  const tone = toneFromChange(tile.deltaPct);
  const toneClass =
    tone === "positive" ? "text-success" : tone === "negative" ? "text-danger" : "text-muted-foreground";
  return (
    <div className="min-w-0 rounded-xl border bg-card px-3 py-2.5 text-left">
      <div className="text-[9px] font-medium uppercase tracking-[0.1em] text-muted-foreground truncate">
        {tile.label}
      </div>
      <div className="mt-1 font-display text-ink leading-none tabular truncate flex items-baseline gap-1">
        <span className="text-lg">{tile.value}</span>
        <span className="text-[11px] text-muted-foreground">{tile.unit}</span>
      </div>
      <div className={`mt-1 text-[10px] tabular truncate ${toneClass}`}>
        {formatPct(tile.deltaPct)} к плану
      </div>
    </div>
  );
}

function SegmentCard({ card }: { card: B2CSegmentCard }) {
  return (
    <div className="rounded-2xl border bg-card p-2.5 text-left">
      <div className="border-b hairline pb-1.5 text-[9px] font-semibold uppercase tracking-[0.1em] text-ink">
        {card.title}
      </div>
      <div className="mt-1.5 flex flex-col gap-1.5">
        {card.rows.map((r) => {
          const { Icon, cls } = deltaPill(r.deltaPct);
          return (
            <div key={r.label} className="flex flex-col items-start gap-0.5">
              <span className="text-[10px] text-muted-foreground">{r.label}</span>
              <div className="flex items-baseline gap-1.5 min-w-0">
                <span className="font-display text-[14px] tabular text-ink leading-none">
                  {r.value}
                </span>
                <span className="text-[10px] text-muted-foreground">{r.unit}</span>
                <span
                  className={`inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[9.5px] font-medium tabular ${cls}`}
                >
                  <Icon className="h-2.5 w-2.5" />
                  {formatPct(r.deltaPct)}
                </span>
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
      <div className="text-[9px] font-semibold uppercase tracking-[0.1em] text-ink mb-2">
        ТОП-5 продуктов
      </div>
      <div className="grid grid-cols-[1fr_56px_64px_56px] gap-1 border-b hairline pb-1 text-[8.5px] font-semibold uppercase tracking-[0.07em] text-muted-foreground">
        <span>Продукт</span>
        <span className="text-right">шт.</span>
        <span className="text-right">ЧКД, млн ₽</span>
        <span className="text-right">% новых</span>
      </div>
      {products.map((p) => (
          <div
            key={p.name}
            className="grid grid-cols-[1fr_56px_64px_56px] gap-1 items-center py-1.5 border-b hairline last:border-b-0"
          >
            <div className="text-[12px] font-medium text-ink truncate">{p.name}</div>
            <div className="text-right text-[12px] tabular text-ink">
              {p.units.toLocaleString("ru-RU")}
            </div>
            <div className="text-right text-[12px] tabular text-muted-foreground">
              {p.ckd.toLocaleString("ru-RU", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div className="text-right text-[12px] tabular text-ink">
              {p.newSharePct}%
            </div>
          </div>
        ))}
    </div>
  );
}
