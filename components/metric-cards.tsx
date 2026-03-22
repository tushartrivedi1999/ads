import type { LucideIcon } from 'lucide-react';
import { Activity, BadgeDollarSign, ChartNoAxesColumnIncreasing, MousePointerClick, Radar } from 'lucide-react';

import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export type MetricCardItem = {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: LucideIcon;
};

export const defaultMetricCards: MetricCardItem[] = [
  { title: 'Impressions', value: '3.84M', change: '+12.6%', trend: 'up', icon: Radar },
  { title: 'Clicks', value: '128.4K', change: '+8.3%', trend: 'up', icon: MousePointerClick },
  { title: 'CTR', value: '3.34%', change: '-0.9%', trend: 'down', icon: Activity },
  { title: 'CPC', value: '$1.42', change: '-4.1%', trend: 'up', icon: BadgeDollarSign },
  { title: 'Conversions', value: '4,892', change: '+16.8%', trend: 'up', icon: ChartNoAxesColumnIncreasing },
];

export function MetricCards({ items = defaultMetricCards }: { items?: MetricCardItem[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
      {items.map((item) => {
        const Icon = item.icon;
        const isPositive = item.trend === 'up';

        return (
          <Card key={item.title} className="group transition-all duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.05]">
            <CardContent className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">{item.title}</p>
                  <p className="mt-3 text-3xl font-semibold tracking-tight">{item.value}</p>
                  <div className="mt-3 flex items-center gap-2 text-sm">
                    <span
                      className={cn(
                        'rounded-full px-2 py-1 text-xs font-semibold uppercase tracking-[0.18em]',
                        isPositive ? 'bg-emerald-400/10 text-emerald-300' : 'bg-rose-400/10 text-rose-300',
                      )}
                    >
                      {item.change}
                    </span>
                    <span className="text-muted-foreground">vs last period</span>
                  </div>
                </div>
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary-gradient text-primary-foreground shadow-neon transition-transform duration-300 group-hover:scale-105">
                  <Icon className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
