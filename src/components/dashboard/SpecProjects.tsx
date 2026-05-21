import { ArrowDownRight, ArrowUpRight, Minus } from "lucide-react";
import { formatPct, toneFromChange } from "@/lib/format";

type Kpi = {
  title: string;
  value: string;
  unit: string;
  deltaPct: number;
};

const kpis: Kpi[] = [
  { title: "Открыто счетов", value: "1 284", unit: "шт", deltaPct: 6.2 },
  { title: "Активировано счетов", value: "842", unit: "шт", deltaPct: -3.4 },
];

const rrTiles = [
  { label: "по месяцу", value: "38 520", unit: "шт", vsPlan: 12.5 },
  { label: "по году", value: "462 840", unit: "шт", vsPlan: 8.3 },
];

const rrActivationTiles = [
  { label: "по месяцу", value: "25 260", unit: "шт", vsPlan: 5.2 },
  { label: "по году", value: "303 120", unit: "шт", vsPlan: 3.1 },
];

const driverTiles = [
  { label: "Счетов на Ш.Е.", value: "6", unit: "", deltaPct: 0 },
  { label: "SLA минут", value: "10,6", unit: "", deltaPct: -5.2 },
  { label: "Конверсия", value: "57", unit: "%", deltaPct: 3.8 },
];

function DriverTile({ label, value, unit, deltaPct }: { label: string; value: string; unit: string; deltaPct: number }) {
  const tone = toneFromChange(deltaPct);
  const Icon = tone === "positive" ? ArrowUpRight : tone === "negative" ? ArrowDownRight : Minus;
  const toneCls = tone === "positive" ? "text-success" : tone === "negative" ? "text-danger" : "text-muted-foreground";
  return (
    <div className="min-w-0 rounded-xl border bg-card px-3 py-2.5 text-center">
      <div className="text-[9px] font-medium uppercase tracking-[0.1em] text-muted-foreground truncate">
        {label}
      </div>
      <div className="mt-1 font-display text-ink leading-none tabular truncate flex items-baseline justify-center gap-1">
        <span className="text-lg">{value}</span>
        {unit && <span className="text-[11px] text-muted-foreground ml-1">{unit}</span>}
      </div>
      <div className="mt-1 flex items-center justify-center gap-2 text-[10px] tabular text-muted-foreground">
        <span>-1d</span>
        <span className={`inline-flex items-center gap-0.5 font-medium ${toneCls}`}>
          <Icon className="h-2.5 w-2.5" />
          {formatPct(deltaPct)}
        </span>
      </div>
    </div>
  );
}

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

function RrTile({ label, value, unit, vsPlan }: { label: string; value: string; unit: string; vsPlan: number }) {
  const tone = toneFromChange(vsPlan);
  const toneClass = tone === "positive" ? "text-success" : tone === "negative" ? "text-danger" : "text-muted-foreground";
  return (
    <div className="min-w-0 rounded-xl border bg-card px-3 py-2.5 text-center">
      <div className="text-[9px] font-medium uppercase tracking-[0.1em] text-muted-foreground truncate">
        {label}
      </div>
      <div className="mt-1 font-display text-ink leading-none tabular truncate">
        <span className="text-lg">{value}</span>
        <span className="text-[11px] text-muted-foreground ml-1">{unit}</span>
      </div>
      <div className="mt-1 text-[10px] tabular truncate">
        <span className={toneClass}>{formatPct(vsPlan)} к плану</span>
      </div>
    </div>
  );
}

export function SpecProjects() {
  return (
    <section className="flex flex-col gap-3">
      <header className="flex items-end justify-center">
        <h2 className="text-[10px] font-medium uppercase tracking-[0.12em] text-foreground">
          Спецпроекты
        </h2>
      </header>

      <section className="rounded-2xl border bg-card p-4">
        <div className="grid grid-cols-2 gap-4">
          {kpis.map((k) => {
            const { Icon, cls } = deltaPill(k.deltaPct);
            return (
              <div key={k.title}>
                <div className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                  <span className="h-1 w-1 rounded-full bg-ink" />
                  <span className="truncate">{k.title}</span>
                </div>
                <h1 className="mt-1.5 font-display leading-[1] text-ink tabular flex items-baseline gap-1.5">
                  <span className="text-[32px]">{k.value}</span>
                  <span className="text-base text-muted-foreground">{k.unit}</span>
                </h1>
                <div className="mt-1.5 flex items-center gap-2 text-[11px] text-muted-foreground">
                  <span
                    className={`inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[10px] font-medium tabular ${cls}`}
                  >
                    <Icon className="h-2.5 w-2.5" />
                    {formatPct(k.deltaPct)}
                  </span>
                  <span>к пред. периоду</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="flex flex-col">
        <div className="mb-1.5">
          <h2 className="text-[10px] font-medium uppercase tracking-[0.12em] text-foreground">
            RR открытие счетов
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {rrTiles.map((t) => (
            <RrTile key={t.label} label={t.label} value={t.value} unit={t.unit} vsPlan={t.vsPlan} />
          ))}
        </div>
      </section>

      <section className="flex flex-col">
        <div className="mb-1.5">
          <h2 className="text-[10px] font-medium uppercase tracking-[0.12em] text-foreground">
            RR активации счетов
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {rrActivationTiles.map((t) => (
            <RrTile key={t.label} label={t.label} value={t.value} unit={t.unit} vsPlan={t.vsPlan} />
          ))}
        </div>
      </section>

      <section className="flex flex-col">
        <div className="mb-1.5">
          <h2 className="text-[10px] font-medium uppercase tracking-[0.12em] text-foreground">
            Драйверы
          </h2>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {driverTiles.map((t) => (
            <DriverTile key={t.label} label={t.label} value={t.value} unit={t.unit} deltaPct={t.deltaPct} />
          ))}
        </div>
      </section>
    </section>
  );
}
