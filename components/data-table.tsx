'use client';

import type { ReactNode } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';

export type DataTableColumn<T> = {
  key: string;
  header: string;
  className?: string;
  render: (row: T) => ReactNode;
};

type DataTableProps<T> = {
  columns: Array<DataTableColumn<T>>;
  data: T[];
  emptyMessage: string;
  page: number;
  pageSize: number;
  totalItems: number;
  onPageChange: (page: number) => void;
};

export function DataTable<T>({ columns, data, emptyMessage, page, pageSize, totalItems, onPageChange }: DataTableProps<T>) {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const start = totalItems === 0 ? 0 : (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, totalItems);

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] backdrop-blur-xl">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column) => (
                <TableHead key={column.key} className={column.className}>{column.header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.length > 0 ? (
              data.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {columns.map((column) => (
                    <TableCell key={column.key} className={cn(column.className)}>{column.render(row)}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="py-10 text-center text-sm text-muted-foreground">
                  {emptyMessage}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {start}-{end} of {totalItems} campaigns
        </p>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => onPageChange(page - 1)} disabled={page <= 1}>
            <ChevronLeft className="mr-1 h-4 w-4" />
            Previous
          </Button>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-foreground">
            Page {page} of {totalPages}
          </div>
          <Button variant="ghost" size="sm" onClick={() => onPageChange(page + 1)} disabled={page >= totalPages}>
            Next
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
