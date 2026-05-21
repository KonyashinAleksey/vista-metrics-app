import { ArrowDownRight, ArrowUpRight, ChevronDown, Minus } from "lucide-react";
import { formatPct, toneFromChange } from "@/lib/format";

const dailyRows: Array<[string, string, string, string, string, string, string]> = [
  ["7-8 мая", "13", "-", "68%", "1", "6,5", "15,8"],
  ["10 мая", "8", "-", "80%", "2", "4", "10,9"],
  ["11 мая", "8", "-", "53%", "2", "4", "8,4"],
  ["12 мая", "5", "-", "63%", "2", "3", "19,2"],
  ["13 мая", "8", "-", "50%", "2", "4", "13,9"],
  ["14 мая", "13", "10", "52%", "2", "7", "8,8"],
  ["15 мая", "5", "23", "42%", "1", "5", "10,8"],
  ["16 мая", "25", "39", "71%", "2", "13", "9,7"],
  ["17 мая", "2", "0", "33%", "2", "1", "9,8"],
  ["18 мая", "14", "0", "41%", "2", "7", "8,0"],
  ["19 мая", "23", "0", "59%", "2", "12", "8,0"],
];
const dailyTotal: [string, string, string, string, string, string, string] = ["ИТОГО", "124", "72", "57%", "2", "6", "10,6"];

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
    <div className="min-w-0 rounded-xl border bg-card px-3 py-2.5">
      <div className="text-[9px] font-medium uppercase tracking-[0.1em] text-muted-foreground truncate">
        {label}
      </div>
      <div className="mt-1 font-display text-ink leading-none tabular truncate">
        <span className="text-lg">{value}</span>
        {unit && <span className="text-[11px] text-muted-foreground ml-1">{unit}</span>}
      </div>
      <div className="mt-1 flex items-center gap-2 text-[10px] tabular text-muted-foreground">
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
                  <span>-1d</span>
                  <span
                    className={`inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[10px] font-medium tabular ${cls}`}
                  >
                    <Icon className="h-2.5 w-2.5" />
                    {formatPct(k.deltaPct)}
                  </span>
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

      <details className="group rounded-2xl border bg-card">
        <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3">
          <h2 className="text-[10px] font-medium uppercase tracking-[0.12em] text-foreground">
            Данные за последние 10 дней
          </h2>
          <ChevronDown className="h-3.5 w-3.5 text-muted-foreground transition-transform group-open:rotate-180" />
        </summary>
        <div className="overflow-x-auto px-4 pb-4">
          <table className="w-full text-[11px] tabular">
            <thead>
              <tr className="text-left text-[9px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
                <th className="py-2 pr-3 font-medium">Дата</th>
                <th className="py-2 pr-3 font-medium">Открыто счетов</th>
                <th className="py-2 pr-3 font-medium">Бенч</th>
                <th className="py-2 pr-3 font-medium">Конверсия</th>
                <th className="py-2 pr-3 font-medium">Кол-во Ш.Е.</th>
                <th className="py-2 pr-3 font-medium">Счетов на Ш.Е.</th>
                <th className="py-2 font-medium">SLA (мин.)</th>
              </tr>
            </thead>
            <tbody>
              {dailyRows.map((r) => (
                <tr key={r[0]} className="border-t text-ink">
                  {r.map((c, i) => (
                    <td key={i} className={`py-2 ${i === r.length - 1 ? "" : "pr-3"}`}>{c}</td>
                  ))}
                </tr>
              ))}
              <tr className="border-t font-semibold text-ink">
                {dailyTotal.map((c, i) => (
                  <td key={i} className={`py-2 ${i === dailyTotal.length - 1 ? "" : "pr-3"}`}>{c}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </details>
    </section>
  );
}
