'use client';

import { useEffect, useMemo, useState } from 'react';
import { CalendarRange, PauseCircle, PencilLine, Plus, Search } from 'lucide-react';

import { DataTable, type DataTableColumn } from '@/components/data-table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import type { CampaignStatus } from '@/types/campaign';

type AdvertiserCampaign = {
  id: string;
  name: string;
  status: CampaignStatus;
  budget: number;
  ctr: string;
  start_date: string;
  end_date: string;
};

const campaigns: AdvertiserCampaign[] = [
  { id: 'cmp-001', name: 'Spring Launch', status: 'active', budget: 12000, ctr: '4.2%', start_date: '2026-03-01', end_date: '2026-03-31' },
  { id: 'cmp-002', name: 'Retargeting Boost', status: 'paused', budget: 7500, ctr: '3.8%', start_date: '2026-02-15', end_date: '2026-03-25' },
  { id: 'cmp-003', name: 'Video Awareness', status: 'active', budget: 18000, ctr: '5.1%', start_date: '2026-03-10', end_date: '2026-04-10' },
  { id: 'cmp-004', name: 'Weekend Flash Sale', status: 'paused', budget: 5400, ctr: '2.9%', start_date: '2026-03-05', end_date: '2026-03-12' },
  { id: 'cmp-005', name: 'Luxury Segment Push', status: 'active', budget: 22000, ctr: '6.4%', start_date: '2026-03-18', end_date: '2026-04-22' },
  { id: 'cmp-006', name: 'Mobile App Reactivation', status: 'active', budget: 9600, ctr: '4.7%', start_date: '2026-03-08', end_date: '2026-04-05' },
  { id: 'cmp-007', name: 'Brand Lift Test', status: 'paused', budget: 6400, ctr: '3.1%', start_date: '2026-01-20', end_date: '2026-02-28' },
  { id: 'cmp-008', name: 'City Expansion', status: 'active', budget: 14300, ctr: '4.9%', start_date: '2026-03-14', end_date: '2026-04-14' },
];

const pageSize = 5;

export function AdvertiserDashboardPage() {
  const [statusFilter, setStatusFilter] = useState<'all' | CampaignStatus>('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);

  const filteredCampaigns = useMemo(() => {
    const filtered = campaigns.filter((campaign) => {
      const matchesStatus = statusFilter === 'all' ? true : campaign.status === statusFilter;
      const matchesQuery = campaign.name.toLowerCase().includes(query.toLowerCase());
      const matchesStart = startDate ? campaign.start_date >= startDate : true;
      const matchesEnd = endDate ? campaign.end_date <= endDate : true;
      return matchesStatus && matchesQuery && matchesStart && matchesEnd;
    });

    return filtered;
  }, [endDate, query, startDate, statusFilter]);

  const paginatedCampaigns = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filteredCampaigns.slice(start, start + pageSize);
  }, [filteredCampaigns, page]);

  const totalPages = Math.max(1, Math.ceil(filteredCampaigns.length / pageSize));


  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  const columns: Array<DataTableColumn<AdvertiserCampaign>> = [
    {
      key: 'name',
      header: 'Name',
      render: (row) => (
        <div>
          <p className="font-medium">{row.name}</p>
          <p className="text-xs text-muted-foreground">{row.id}</p>
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (row) => (
        <span className={row.status === 'active' ? 'rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-300' : 'rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-amber-300'}>
          {row.status}
        </span>
      ),
    },
    {
      key: 'budget',
      header: 'Budget',
      render: (row) => <span>${row.budget.toLocaleString()}</span>,
    },
    {
      key: 'ctr',
      header: 'CTR',
      render: (row) => <span className="text-cyan-300">{row.ctr}</span>,
    },
    {
      key: 'actions',
      header: 'Actions',
      className: 'w-[180px]',
      render: (row) => (
        <div className="flex flex-wrap gap-2">
          <Button variant="ghost" size="sm" onClick={() => console.log('edit campaign', row.id)}>
            <PencilLine className="mr-1 h-4 w-4" />
            Edit
          </Button>
          <Button variant="secondary" size="sm" onClick={() => console.log('pause campaign', row.id)}>
            <PauseCircle className="mr-1 h-4 w-4" />
            Pause
          </Button>
        </div>
      ),
    },
  ];

  const updatePage = (nextPage: number) => {
    const bounded = Math.min(Math.max(nextPage, 1), totalPages);
    setPage(bounded);
  };

  return (
    <div className="space-y-6 lg:space-y-8">
      <section className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Card className="overflow-hidden">
          <CardContent className="relative p-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(91,140,255,0.22),transparent_35%),radial-gradient(circle_at_85%_20%,rgba(34,211,238,0.16),transparent_30%)]" />
            <div className="relative space-y-5 p-6 sm:p-8 lg:p-10">
              <div className="inline-flex items-center rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300">
                Advertiser dashboard
              </div>
              <div>
                <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">Manage campaign delivery, filters, and actions in one table-first view.</h1>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">Filter campaigns by status and date range, review mock CTR performance, and jump into edit or pause actions from a clean data table layout.</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button onClick={() => console.log('create campaign')}>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Campaign
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Filters</CardTitle>
            <CardDescription>Refine advertiser campaigns by status, date range, or quick search.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="campaign-search">Search campaigns</Label>
              <div className="relative">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input id="campaign-search" className="pl-10" placeholder="Search by campaign name" value={query} onChange={(event) => { setQuery(event.target.value); setPage(1); }} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={statusFilter} onValueChange={(value: 'all' | CampaignStatus) => { setStatusFilter(value); setPage(1); }}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Active / Paused</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="paused">Paused</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="start-date">Start date</Label>
                <Input id="start-date" type="date" value={startDate} onChange={(event) => { setStartDate(event.target.value); setPage(1); }} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="end-date">End date</Label>
                <Input id="end-date" type="date" value={endDate} onChange={(event) => { setEndDate(event.target.value); setPage(1); }} />
              </div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2 text-foreground">
                <CalendarRange className="h-4 w-4 text-cyan-300" />
                <span className="font-medium">Current view</span>
              </div>
              <p className="mt-2 leading-6">Showing {filteredCampaigns.length} campaigns across the current advertiser workspace.</p>
            </div>
          </CardContent>
        </Card>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Campaign list</CardTitle>
          <CardDescription>A clean advertiser data table with pagination and inline actions.</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            data={paginatedCampaigns}
            emptyMessage="No campaigns match the selected filters."
            page={page}
            pageSize={pageSize}
            totalItems={filteredCampaigns.length}
            onPageChange={updatePage}
          />
        </CardContent>
      </Card>
    </div>
  );
}
