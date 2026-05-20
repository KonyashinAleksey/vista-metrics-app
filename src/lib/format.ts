export function formatValue(value: number, unit: "currency" | "number" | "percent", compact = true) {
  if (unit === "percent") {
    return `${(value * 100).toFixed(1)}%`;
  }
  if (unit === "currency") {
    if (compact) return `${formatCompact(value)} ₽`;
    return `${new Intl.NumberFormat("ru-RU").format(Math.round(value))} ₽`;
  }
  if (compact && Math.abs(value) >= 10_000) return formatCompact(value);
  return new Intl.NumberFormat("ru-RU").format(Math.round(value));
}

export function formatCompact(value: number) {
  const abs = Math.abs(value);
  if (abs >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(2)} млрд`;
  if (abs >= 1_000_000) return `${(value / 1_000_000).toFixed(2)} млн`;
  if (abs >= 1_000) return `${(value / 1_000).toFixed(1)} тыс`;
  return new Intl.NumberFormat("ru-RU").format(Math.round(value));
}

export function formatPct(value: number, withSign = true) {
  const sign = value > 0 ? "+" : "";
  return `${withSign ? sign : ""}${value.toFixed(1)}%`;
}

export function toneFromChange(value: number, neutralBand = 0.5) {
  if (value > neutralBand) return "positive" as const;
  if (value < -neutralBand) return "negative" as const;
  return "neutral" as const;
}

export function splitValueUnit(formatted: string): { value: string; unit: string } {
  const match = formatted.match(/^([\d\s.,]+)\s*(.*)$/);
  if (match) {
    return { value: match[1].trim(), unit: match[2].trim() };
  }
  return { value: formatted, unit: "" };
}
