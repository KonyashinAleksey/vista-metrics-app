// Mock data for B2C insurance products section

export type B2CTopCard = {
  title: string;
  unitLabel: string;
  benchmark: string;
  yesterday: string;
  yesterdayDelta: number; // %
  avg10: string;
  avg10Delta: number;
};

export type B2CRRPeriod = {
  label: string; // Месяц / Год
  fact: string;
  plan: string;
  pct: number; // 0..200
};

export type B2CRRCard = {
  title: string;
  unitLabel: string;
  periods: B2CRRPeriod[];
};

export type B2CProduct = {
  name: string;
  fact: number; // млн ₽
  plan: number;
};

export const b2c = {
  monthLabel: "Май 2026",
  updatedLabel: "18 мая · Автообновление",
  topCards: [
    {
      title: "Продажи",
      unitLabel: "шт",
      benchmark: "40 000",
      yesterday: "29 593",
      yesterdayDelta: -26,
      avg10: "29 186",
      avg10Delta: -27,
    },
    {
      title: "КД",
      unitLabel: "млн ₽",
      benchmark: "5,0 млн ₽",
      yesterday: "3,08",
      yesterdayDelta: -38,
      avg10: "3,03",
      avg10Delta: -39,
    },
  ] as B2CTopCard[],
  rrCards: [
    {
      title: "RR — Штуки",
      unitLabel: "млн",
      periods: [
        { label: "Месяц", fact: "0,32", plan: "0,72", pct: 45 },
        { label: "Год", fact: "8,21", plan: "8,64", pct: 95 },
      ],
    },
    {
      title: "RR — КД",
      unitLabel: "млн ₽",
      periods: [
        { label: "Месяц", fact: "73,25", plan: "150", pct: 49 },
        { label: "Год", fact: "1 760", plan: "1 800", pct: 98 },
      ],
    },
  ] as B2CRRCard[],
  topProducts: [
    { name: "Защита товара", fact: 69.0, plan: 182.0 },
    { name: "Химчистка одежды", fact: 3.1, plan: 1.8 },
    { name: "СОМ", fact: 2.5, plan: 0.9 },
    { name: "Спортзащита", fact: 0.2, plan: 0.25 },
    { name: "Антиклещ", fact: 0.15, plan: 0.2 },
  ] as B2CProduct[],
};
