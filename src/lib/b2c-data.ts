// Mock data for B2C insurance products section

export type B2CKpi = {
  title: string;
  value: string;
  unit: string;
  deltaPct: number; // vs day before yesterday
  deltaLabel: string;
};

export type B2CRrTile = {
  label: "MTD" | "YTD";
  value: string;
  unit: string;
  deltaPct: number;
};

export type B2CSegmentRow = {
  label: string;
  value: string;
  unit: string;
  deltaPct: number;
};

export type B2CSegmentCard = {
  title: string;
  rows: B2CSegmentRow[];
};

export type B2CProduct = {
  name: string;
  units: number;
  ckd: number; // млн ₽
  newSharePct: number;
};

export const b2c = {
  updatedLabel: "19 мая 2026 · Автообновление",
  kpis: [
    {
      title: "Комиссионный доход вчера (ЧКД)",
      value: "3,08",
      unit: "млн ₽",
      deltaPct: -12.4,
      deltaLabel: "к позавчера",
    },
    {
      title: "Штуки продаж вчера",
      value: "29 593",
      unit: "шт",
      deltaPct: -8.6,
      deltaLabel: "к позавчера",
    },
  ] as B2CKpi[],
  rr: {
    title: "RR Чистый комиссионный доход (ЧКД)",
    tiles: [
      { label: "MTD", value: "150,2", unit: "млн ₽", deltaPct: -45.1 },
      { label: "YTD", value: "1 760,1", unit: "млн ₽", deltaPct: -2.9 },
    ] as B2CRrTile[],
  },
  segments: [
    {
      title: "Новая продажа",
      rows: [
        { label: "Штуки", value: "18 412", unit: "шт", deltaPct: -7.2 },
        { label: "ЧКД", value: "1,94", unit: "млн ₽", deltaPct: -11.3 },
      ],
    },
    {
      title: "Пролонгации",
      rows: [
        { label: "Штуки", value: "11 181", unit: "шт", deltaPct: 3.1 },
        { label: "ЧКД", value: "1,14", unit: "млн ₽", deltaPct: -4.8 },
      ],
    },
  ] as B2CSegmentCard[],
  topProducts: [
    { name: "Защита товара", units: 14320, ckd: 1.82, newSharePct: 38 },
    { name: "Химчистка одежды", units: 7840, ckd: 0.62, newSharePct: 171 },
    { name: "СОМ", units: 4210, ckd: 0.34, newSharePct: 267 },
    { name: "Спортзащита", units: 2190, ckd: 0.18, newSharePct: 80 },
    { name: "Антиклещ", units: 1033, ckd: 0.12, newSharePct: 75 },
  ] as B2CProduct[],
  salesLast10: {
    benchmark: 40000,
    series: [22000, 26500, 36500, 29800, 27300, 32700, 30900, 26300, 28700, 29593],
  },
};
