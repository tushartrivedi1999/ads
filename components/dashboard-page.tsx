import { ArrowUpRight, Sparkles } from 'lucide-react';

import { AnalyticsCharts } from '@/components/analytics-charts';
import { CampaignCreationFlow } from '@/components/campaign-creation-flow';
import { MetricCards } from '@/components/metric-cards';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const highlights = [
  ['Guided setup', 'Progressive multi-step flow for campaign, ad set, creative, and review.'],
  ['Validation', 'Inline validation blocks incomplete steps before moving forward.'],
  ['Submission', 'Final submit logs a complete payload to the console for backend work later.'],
];

export function DashboardPage() {
  return (
    <div className="space-y-6 lg:space-y-8">
      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card className="overflow-hidden">
          <CardContent className="relative p-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(91,140,255,0.22),transparent_35%),radial-gradient(circle_at_85%_20%,rgba(34,211,238,0.16),transparent_30%)]" />
            <div className="relative space-y-6 p-6 sm:p-8 lg:p-10">
              <div className="inline-flex items-center rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300">
                Dashboard analytics
              </div>
              <div className="space-y-3">
                <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
                  Explore campaign performance with <span className="text-primary-gradient">responsive Recharts visuals</span>.
                </h1>
                <p className="max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
                  The dashboard combines reusable glass metric cards with responsive line, bar, and pie charts for a dark-theme-compatible analytics surface.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button>
                  Explore reports
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="secondary">Export snapshot</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Why this layout works</CardTitle>
            <CardDescription>Designed for fast scanning, reusable components, and subtle interaction feedback.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {highlights.map(([title, description]) => (
              <div key={title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl transition-colors duration-300 hover:bg-white/[0.06]">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-2xl bg-primary-gradient text-primary-foreground shadow-neon">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium">{title}</p>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>

      <section className="space-y-4">
        <div>
          <p className="text-sm uppercase tracking-[0.28em] text-muted-foreground">Performance overview</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight">Reusable metric cards</h2>
        </div>
        <MetricCards />
      </section>

      <AnalyticsCharts />

      <CampaignCreationFlow />
    </div>
  );
}
