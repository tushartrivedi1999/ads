'use client';

import { useMemo, useState } from 'react';
import { CalendarRange, Download } from 'lucide-react';
import { Activity, BadgeDollarSign, ChartNoAxesColumnIncreasing, MousePointerClick, Radar } from 'lucide-react';

import { AnalyticsCharts } from '@/components/analytics-charts';
import { DataTable, type DataTableColumn } from '@/components/data-table';
import { MetricCards, type MetricCardItem } from '@/components/metric-cards';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type PerformanceRow = {
  campaign: string;
  impressions: string;
  clicks: string;
  ctr: string;
  conversions: string;
};

const analyticsMetrics: MetricCardItem[] = [
  { title: 'Impressions', value: '4.12M', change: '+11.2%', trend: 'up', icon: Radar },
  { title: 'Clicks', value: '142.7K', change: '+7.4%', trend: 'up', icon: MousePointerClick },
  { title: 'CTR', value: '3.46%', change: '+0.3%', trend: 'up', icon: Activity },
  { title: 'CPC', value: '$1.36', change: '-3.9%', trend: 'up', icon: BadgeDollarSign },
  { title: 'Conversions', value: '5,184', change: '+14.7%', trend: 'up', icon: ChartNoAxesColumnIncreasing },
];

const performanceRows: PerformanceRow[] = [
  { campaign: 'Spring Launch', impressions: '1.02M', clicks: '14.2K', ctr: '1.39%', conversions: '624' },
  { campaign: 'Retargeting Boost', impressions: '642K', clicks: '10.8K', ctr: '1.68%', conversions: '712' },
  { campaign: 'Video Awareness', impressions: '1.24M', clicks: '16.4K', ctr: '1.32%', conversions: '803' },
  { campaign: 'City Expansion', impressions: '813K', clicks: '12.1K', ctr: '1.49%', conversions: '555' },
  { campaign: 'Mobile Reactivation', impressions: '401K', clicks: '8.3K', ctr: '2.07%', conversions: '488' },
  { campaign: 'Weekend Flash Sale', impressions: '287K', clicks: '5.9K', ctr: '2.06%', conversions: '336' },
];

const pageSize = 4;

export function AnalyticsDashboardPage() {
  const [startDate, setStartDate] = useState('2026-03-01');
  const [endDate, setEndDate] = useState('2026-03-31');
  const [page, setPage] = useState(1);

  const paginatedRows = useMemo(() => {
    const start = (page - 1) * pageSize;
    return performanceRows.slice(start, start + pageSize);
  }, [page]);

  const columns: Array<DataTableColumn<PerformanceRow>> = [
    { key: 'campaign', header: 'Campaign', render: (row) => <span className="font-medium">{row.campaign}</span> },
    { key: 'impressions', header: 'Impressions', render: (row) => row.impressions },
    { key: 'clicks', header: 'Clicks', render: (row) => row.clicks },
    { key: 'ctr', header: 'CTR', render: (row) => <span className="text-cyan-300">{row.ctr}</span> },
    { key: 'conversions', header: 'Conversions', render: (row) => row.conversions },
  ];

  return (
    <div className="space-y-6 lg:space-y-8">
      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card className="overflow-hidden">
          <CardContent className="relative p-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(91,140,255,0.22),transparent_35%),radial-gradient(circle_at_85%_20%,rgba(34,211,238,0.16),transparent_30%)]" />
            <div className="relative space-y-5 p-6 sm:p-8 lg:p-10">
              <div className="inline-flex items-center rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300">
                Analytics dashboard
              </div>
              <div>
                <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">Monitor performance trends, traffic split, and campaign efficiency from one analytics workspace.</h1>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">This page uses mock data to combine top metrics, responsive charts, and a campaign performance table into a full analytics dashboard surface.</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button variant="secondary" onClick={() => console.log('export analytics')}>
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Date range</CardTitle>
            <CardDescription>UI-only range controls for filtering analytics data.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="analytics-start-date">Start date</Label>
                <Input id="analytics-start-date" type="date" value={startDate} onChange={(event) => setStartDate(event.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="analytics-end-date">End date</Label>
                <Input id="analytics-end-date" type="date" value={endDate} onChange={(event) => setEndDate(event.target.value)} />
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2 text-foreground">
                <CalendarRange className="h-4 w-4 text-cyan-300" />
                <span className="font-medium">Selected range</span>
              </div>
              <p className="mt-2 leading-6">Showing analytics between {startDate} and {endDate} using mock data.</p>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-4">
        <div>
          <p className="text-sm uppercase tracking-[0.28em] text-muted-foreground">Top metrics</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight">Performance overview</h2>
        </div>
        <MetricCards items={analyticsMetrics} />
      </section>

      <section className="space-y-4">
        <div>
          <p className="text-sm uppercase tracking-[0.28em] text-muted-foreground">Charts grid</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight">Campaign analytics</h2>
        </div>
        <AnalyticsCharts showHeading={false} />
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Campaign performance table</CardTitle>
          <CardDescription>Mock performance rows for campaign-level analytics review.</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={paginatedRows}
            emptyMessage="No campaign analytics available for the selected range."
            page={page}
            pageSize={pageSize}
            totalItems={performanceRows.length}
            onPageChange={setPage}
          />
        </CardContent>
      </Card>
    </div>
  );
}
