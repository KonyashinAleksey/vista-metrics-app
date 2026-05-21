import { createFileRoute } from "@tanstack/react-router";
import { HeadlineKpi, RunRateCard } from "@/components/dashboard/HeadlineKpi";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { SellersTrend } from "@/components/dashboard/SellersTrend";
import { SalesTrend10d } from "@/components/dashboard/SalesTrend10d";
import { B2CInsurance } from "@/components/dashboard/B2CInsurance";
import { SpecProjects } from "@/components/dashboard/SpecProjects";
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
          <div className="mb-1.5 text-center">
            <h2 className="text-[10px] font-medium uppercase tracking-[0.12em] text-foreground">
              Страховые продукты · B2C и B2B
            </h2>
          </div>
          <section className="rounded-2xl border bg-card p-4">
            <div>
              <div className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
                <span className="h-1 w-1 rounded-full bg-ink" />
                КД без НДС
              </div>
              <h1 className="mt-1.5 font-display leading-[1] text-ink tabular flex items-baseline gap-1.5">
                <span className="text-[40px]">4,12</span>
                <span className="text-xl text-muted-foreground">млн ₽</span>
              </h1>
              <div className="mt-1.5 flex items-center gap-2 text-[11px] text-muted-foreground">
                <span>-1d</span>
                <span className="inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-[10px] font-medium tabular bg-success/10 text-success">
                  +2.8%
                </span>
              </div>
            </div>
          </section>
          <div className="mt-3 flex flex-col">
            <div className="mb-1.5">
              <h2 className="text-[10px] font-medium uppercase tracking-[0.12em] text-foreground">
                RR КД без НДС
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="min-w-0 rounded-xl border bg-card px-3 py-2.5">
                <div className="text-[9px] font-medium uppercase tracking-[0.1em] text-muted-foreground truncate">по месяцу</div>
                <div className="mt-1 font-display text-ink leading-none tabular truncate">
                  <span className="text-lg">198,4</span>
                  <span className="text-[11px] text-muted-foreground ml-1">млн ₽</span>
                </div>
                <div className="mt-1 text-[10px] tabular truncate">
                  <span className="text-success">+4.2% к плану</span>
                </div>
              </div>
              <div className="min-w-0 rounded-xl border bg-card px-3 py-2.5">
                <div className="text-[9px] font-medium uppercase tracking-[0.1em] text-muted-foreground truncate">по году</div>
                <div className="mt-1 font-display text-ink leading-none tabular truncate">
                  <span className="text-lg">2 312,7</span>
                  <span className="text-[11px] text-muted-foreground ml-1">млн ₽</span>
                </div>
                <div className="mt-1 text-[10px] tabular truncate">
                  <span className="text-success">+1.6% к плану</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <SalesTrend10d />

        <section className="flex flex-col">
          <div className="mb-1.5 text-center">
            <h2 className="text-[10px] font-medium uppercase tracking-[0.12em] text-foreground">
              Страховые продукты · B2B
            </h2>
          </div>
          <HeadlineKpi
            metric={metrics.revenue}
            title="КД без НДС"
            secondary={{ metric: metrics.products, title: "Кол-во товаров" }}
          />
          <div className="mt-3">
            <RunRateCard metric={metrics.revenue} title="RR КД без НДС" />
          </div>
        </section>



        <section className="flex flex-col">
          <div className="mb-1.5">
            <h2 className="text-[10px] font-medium uppercase tracking-[0.12em] text-foreground">
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

        <SpecProjects />




        <footer className="shrink-0 text-center text-[9px] text-muted-foreground">
          Mock data · готово к подключению реального источника
        </footer>
      </main>
    </div>
  );
}
