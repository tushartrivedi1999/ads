'use client';

import { useState, type ReactNode } from 'react';

import { Sidebar } from '@/components/layout/sidebar';
import { TopNavbar } from '@/components/layout/top-navbar';

export function AppShell({ children }: { children: ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0 bg-grid-pattern bg-grid [mask-image:radial-gradient(circle_at_top,white,transparent_72%)] opacity-40" />
      <div className="relative min-h-screen">
        <Sidebar
          isCollapsed={isCollapsed}
          isMobileOpen={isMobileOpen}
          onCloseMobile={() => setIsMobileOpen(false)}
          onToggleCollapse={() => setIsCollapsed((value) => !value)}
        />
        <div
          className="flex min-h-screen flex-1 flex-col transition-[padding] duration-300 ease-out"
          style={{ paddingLeft: isCollapsed ? '0px' : '0px' }}
        >
          <div className={isCollapsed ? 'lg:pl-24' : 'lg:pl-72'}>
            <TopNavbar
              isCollapsed={isCollapsed}
              onOpenMobile={() => setIsMobileOpen(true)}
              onToggleCollapse={() => setIsCollapsed((value) => !value)}
            />
            <main className="px-4 pb-10 pt-6 sm:px-6 lg:px-10">{children}</main>
          </div>
        </div>
      </div>
    </div>
  );
}
