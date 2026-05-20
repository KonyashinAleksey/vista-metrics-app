import { createFileRoute } from "@tanstack/react-router";
import { HeadlineKpi } from "@/components/dashboard/HeadlineKpi";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { SellersTrend } from "@/components/dashboard/SellersTrend";
import { B2CInsurance } from "@/components/dashboard/B2CInsurance";
import { metrics, meta } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Insurance Ops · Daily Dashboard" },
      {
        name: "description",
        content:
          "Ежедневный управленческий дашборд B2B-страхования заказов селлеров: доход, активные селлеры, GMV, проникновение.",
      },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  return (
    <div className="flex min-h-[100dvh] flex-col bg-background text-foreground">
      <header className="shrink-0 border-b hairline px-4 py-2.5">

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-ink text-background">
              <span className="font-display text-xs leading-none">I</span>
            </div>
            <div className="min-w-0">
              <div className="text-xs font-medium text-ink leading-tight">Insurance Ops</div>
              <div className="text-[10px] text-muted-foreground leading-tight">
                Обзор · {meta.yesterdayLabel}
              </div>
            </div>
          </div>
          <span className="flex items-center gap-1.5 text-[10px] text-muted-foreground">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-success" />
            Live
          </span>
        </div>
      </header>

      <main className="flex flex-1 flex-col gap-3 px-3 py-3">
        <section className="flex flex-col">
          <div className="mb-1.5">
            <h2 className="text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
              Страховые продукты · B2B
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <HeadlineKpi metric={metrics.revenue} title="ЧК Доход" />
            <HeadlineKpi metric={metrics.products} title="Кол-во товаров" />
          </div>
        </section>


        <section className="flex flex-col">
          <div className="mb-1.5">
            <h2 className="text-[10px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
              Драйверы
            </h2>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <MetricCard metric={metrics.activeSellers} />
            <MetricCard metric={metrics.insuredGmv} />
            <MetricCard metric={metrics.penetration} />
          </div>
        </section>

        <SellersTrend metric={metrics.activeSellers} />

        <B2CInsurance />




        <footer className="shrink-0 text-center text-[9px] text-muted-foreground">
          Mock data · готово к подключению реального источника
        </footer>
      </main>
    </div>
  );
}
