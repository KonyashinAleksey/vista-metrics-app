// Mock data layer — replace with real API calls later.
// All numbers are deterministic so the dashboard is stable across refreshes.

export type DailyPoint = {
  day: number; // 1..N
  date: string; // ISO yyyy-mm-dd
  revenue: number;
  activeSellers: number;
  insuredGmv: number;
  penetration: number; // 0..1
};

export type MetricSnapshot = {
  label: string;
  unit: "currency" | "number" | "percent";
  yesterday: number;
  dodChangePct: number; // vs prior day
  mtd: number;
  planTarget: number; // monthly plan
  planProgressPct: number; // mtd / plan
  runRate: number; // projected month total
  ma10: number; // 10-day moving avg of daily value
  ma10PrevChangePct: number; // current MA10 vs previous 10d MA
  cumulative: number[]; // for sparkline (cumulative or daily series)
  daily: number[]; // daily series MTD
};

const MONTH_DAYS = 31;
const TODAY_DAY = 18; // "yesterday" in the dashboard context — last closed day

function seeded(n: number) {
  // simple deterministic pseudo-random
  const x = Math.sin(n * 9301 + 49297) * 233280;
  return x - Math.floor(x);
}

function generateSeries(base: number, growth: number, noise: number, days: number) {
  const arr: number[] = [];
  for (let i = 1; i <= days; i++) {
    const trend = base * (1 + growth * (i / days));
    const wobble = (seeded(i + base) - 0.5) * noise * base;
    arr.push(Math.max(0, Math.round(trend + wobble)));
  }
  return arr;
}

const revenueDaily = generateSeries(820_000, 0.18, 0.22, MONTH_DAYS).slice(0, TODAY_DAY);
const sellersDaily = generateSeries(4_200, 0.08, 0.05, MONTH_DAYS).slice(0, TODAY_DAY);
const gmvDaily = generateSeries(48_000_000, 0.15, 0.18, MONTH_DAYS).slice(0, TODAY_DAY);
const penetrationDaily = generateSeries(3200, 0.04, 0.03, MONTH_DAYS)
  .slice(0, TODAY_DAY)
  .map((v, i) => v / (8800 + i * 12)); // ratio

export const dailySeries: DailyPoint[] = revenueDaily.map((rev, i) => ({
  day: i + 1,
  date: `2026-05-${String(i + 1).padStart(2, "0")}`,
  revenue: rev,
  activeSellers: sellersDaily[i],
  insuredGmv: gmvDaily[i],
  penetration: penetrationDaily[i],
}));

function pct(a: number, b: number) {
  if (b === 0) return 0;
  return ((a - b) / b) * 100;
}

function ma(arr: number[], window: number, endIdx: number) {
  const start = Math.max(0, endIdx - window + 1);
  const slice = arr.slice(start, endIdx + 1);
  return slice.reduce((s, v) => s + v, 0) / slice.length;
}

function buildSnapshot(
  label: string,
  unit: MetricSnapshot["unit"],
  daily: number[],
  planTarget: number,
): MetricSnapshot {
  const lastIdx = daily.length - 1;
  const yesterday = daily[lastIdx];
  const prev = daily[lastIdx - 1] ?? yesterday;
  const mtd = unit === "percent"
    ? daily.reduce((s, v) => s + v, 0) / daily.length
    : daily.reduce((s, v) => s + v, 0);

  const daysElapsed = daily.length;
  const runRate = unit === "percent" ? mtd : (mtd / daysElapsed) * MONTH_DAYS;

  const ma10Now = ma(daily, 10, lastIdx);
  const ma10Prev = ma(daily, 10, Math.max(0, lastIdx - 10));

  let cumulative: number[];
  if (unit === "percent") {
    cumulative = daily.slice();
  } else {
    cumulative = [];
    let acc = 0;
    for (const v of daily) {
      acc += v;
      cumulative.push(acc);
    }
  }

  return {
    label,
    unit,
    yesterday,
    dodChangePct: pct(yesterday, prev),
    mtd,
    planTarget,
    planProgressPct: (unit === "percent" ? yesterday : mtd) / planTarget * 100,
    runRate,
    ma10: ma10Now,
    ma10PrevChangePct: pct(ma10Now, ma10Prev),
    cumulative,
    daily,
  };
}

export const metrics = {
  revenue: buildSnapshot(
    "Чистый комиссионный доход",
    "currency",
    dailySeries.map((d) => d.revenue),
    32_000_000,
  ),
  activeSellers: buildSnapshot(
    "Активные селлеры",
    "number",
    dailySeries.map((d) => d.activeSellers),
    5_200,
  ),
  insuredGmv: buildSnapshot(
    "GMV застрахованных заказов",
    "currency",
    dailySeries.map((d) => d.insuredGmv),
    1_900_000_000,
  ),
  penetration: buildSnapshot(
    "Проникновение",
    "percent",
    dailySeries.map((d) => d.penetration),
    0.42,
  ),
};

// Full month projection (plan + forecast) for the headline chart
export function buildMonthProjection() {
  const daily = metrics.revenue.daily;
  const cum: { day: number; actual: number | null; plan: number; forecast: number | null }[] = [];
  let acc = 0;
  const planPerDay = metrics.revenue.planTarget / MONTH_DAYS;
  const runRatePerDay = metrics.revenue.runRate / MONTH_DAYS;

  for (let d = 1; d <= MONTH_DAYS; d++) {
    const isActual = d <= daily.length;
    if (isActual) acc += daily[d - 1];
    cum.push({
      day: d,
      actual: isActual ? acc : null,
      plan: Math.round(planPerDay * d),
      forecast: isActual ? null : Math.round(acc + runRatePerDay * (d - daily.length)),
    });
  }
  // ensure forecast line connects from last actual
  const lastActualIdx = daily.length - 1;
  if (cum[lastActualIdx]) cum[lastActualIdx].forecast = cum[lastActualIdx].actual;
  return cum;
}

export const insights = [
  {
    tone: "positive" as const,
    title: "Чистый комиссионный доход выше плана на день",
    body: "RR YTD на 6.4% опережает план. Основной драйвер — рост GMV застрахованных заказов (+12% к 10-дн. средней).",
  },
  {
    tone: "positive" as const,
    title: "Активные селлеры продолжают расти",
    body: "База активных селлеров со страховкой выросла на +3.1% н/н. 10-дн. MA обновила локальный максимум.",
  },
  {
    tone: "warning" as const,
    title: "Penetration снижается",
    body: "Доля активных селлеров со страховкой просела на 0.8 п.п. — общая база активных селлеров платформы растёт быстрее подключений.",
  },
];

export const meta = {
  monthLabel: "18 мая 2026",
  yesterdayLabel: "18 мая",
  daysElapsed: TODAY_DAY,
  monthDays: MONTH_DAYS,
};
