'use client';

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const impressionsOverTime = [
  { label: 'Mon', impressions: 42000 },
  { label: 'Tue', impressions: 46500 },
  { label: 'Wed', impressions: 48200 },
  { label: 'Thu', impressions: 45100 },
  { label: 'Fri', impressions: 52800 },
  { label: 'Sat', impressions: 49700 },
  { label: 'Sun', impressions: 55600 },
];

const clicksPerCampaign = [
  { name: 'Spring Launch', clicks: 14200 },
  { name: 'Retargeting', clicks: 10800 },
  { name: 'Video Awareness', clicks: 16400 },
  { name: 'City Expansion', clicks: 12150 },
];

const deviceDistribution = [
  { name: 'Mobile', value: 58, color: '#22d3ee' },
  { name: 'Desktop', value: 29, color: '#5b8cff' },
  { name: 'Tablet', value: 13, color: '#8b5cf6' },
];

const axisStyle = {
  stroke: 'rgba(148, 163, 184, 0.72)',
  fontSize: 12,
};

const tooltipStyle = {
  backgroundColor: 'rgba(11, 15, 25, 0.92)',
  border: '1px solid rgba(255,255,255,0.08)',
  borderRadius: '16px',
  color: '#e2e8f0',
  boxShadow: '0 24px 80px rgba(2,6,23,0.45)',
};

export function AnalyticsCharts({ showHeading = true }: { showHeading?: boolean }) {
  return (
    <section className="space-y-4">
      {showHeading ? (
        <div>
          <p className="text-sm uppercase tracking-[0.28em] text-muted-foreground">Analytics charts</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight">Responsive Recharts visualizations</h2>
        </div>
      ) : null}
      <div className="grid gap-6 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Impressions over time</CardTitle>
            <CardDescription>Line chart with responsive sizing, tooltip support, and dark-theme axes.</CardDescription>
          </CardHeader>
          <CardContent className="h-[320px] pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={impressionsOverTime} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <CartesianGrid stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="label" tick={axisStyle} axisLine={false} tickLine={false} />
                <YAxis tick={axisStyle} axisLine={false} tickLine={false} width={52} />
                <Tooltip contentStyle={tooltipStyle} cursor={{ stroke: 'rgba(34,211,238,0.35)', strokeWidth: 1 }} />
                <Line type="monotone" dataKey="impressions" stroke="#22d3ee" strokeWidth={3} dot={{ r: 0 }} activeDot={{ r: 6, fill: '#22d3ee' }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Clicks per campaign</CardTitle>
            <CardDescription>Bar chart with campaign-level click volume and dark-theme tooltip styling.</CardDescription>
          </CardHeader>
          <CardContent className="h-[320px] pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={clicksPerCampaign} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid stroke="rgba(255,255,255,0.06)" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tick={axisStyle} axisLine={false} tickLine={false} interval={0} angle={0} height={50} />
                <YAxis tick={axisStyle} axisLine={false} tickLine={false} width={52} />
                <Tooltip contentStyle={tooltipStyle} cursor={{ fill: 'rgba(91,140,255,0.08)' }} />
                <Bar dataKey="clicks" radius={[10, 10, 0, 0]} fill="#5b8cff" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Device distribution</CardTitle>
            <CardDescription>Pie chart showing campaign traffic split across device categories.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div className="h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip contentStyle={tooltipStyle} />
                  <Legend verticalAlign="bottom" iconType="circle" wrapperStyle={{ color: '#cbd5e1', paddingTop: '12px' }} />
                  <Pie
                    data={deviceDistribution}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={72}
                    outerRadius={110}
                    paddingAngle={4}
                  >
                    {deviceDistribution.map((entry) => (
                      <Cell key={entry.name} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {deviceDistribution.map((entry) => (
                <div key={entry.name} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl">
                  <div className="flex items-center gap-3">
                    <span className="h-3 w-3 rounded-full" style={{ backgroundColor: entry.color }} />
                    <p className="font-medium">{entry.name}</p>
                  </div>
                  <p className="mt-3 text-3xl font-semibold tracking-tight">{entry.value}%</p>
                  <p className="mt-1 text-sm text-muted-foreground">Traffic share across measured devices.</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
