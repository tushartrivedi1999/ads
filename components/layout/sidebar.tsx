'use client';

import Link from 'next/link';
import { PanelLeftClose, PanelLeftOpen, Sparkles, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { navigationItems } from '@/lib/navigation';
import { cn } from '@/lib/utils';

type SidebarProps = {
  isCollapsed: boolean;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
  onToggleCollapse: () => void;
};

export function Sidebar({ isCollapsed, isMobileOpen, onCloseMobile, onToggleCollapse }: SidebarProps) {
  return (
    <TooltipProvider delayDuration={120}>
      <>
        <div
          aria-hidden="true"
          className={cn(
            'fixed inset-0 z-30 bg-[#020617]/70 backdrop-blur-sm transition-opacity duration-300 lg:hidden',
            isMobileOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0',
          )}
          onClick={onCloseMobile}
        />

        <aside
          className={cn(
            'fixed inset-y-0 left-0 z-40 flex border-r border-white/10 bg-[rgba(8,12,22,0.88)] backdrop-blur-2xl transition-all duration-300 ease-out',
            isCollapsed ? 'w-24' : 'w-72',
            isMobileOpen ? 'translate-x-0' : '-translate-x-full',
            'lg:translate-x-0',
          )}
        >
          <div className="flex h-full w-full flex-col px-4 py-5">
            <div className={cn('flex items-center', isCollapsed ? 'justify-center' : 'justify-between')}>
              <div className={cn('flex items-center gap-3 overflow-hidden', isCollapsed && 'justify-center')}>
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary-gradient text-primary-foreground shadow-neon">
                  <Sparkles className="h-5 w-5" />
                </div>
                {!isCollapsed ? (
                  <div>
                    <p className="text-xs uppercase tracking-[0.28em] text-sidebar-foreground/60">Ads OS</p>
                    <h1 className="text-lg font-semibold text-sidebar-foreground">Revenue Command</h1>
                  </div>
                ) : null}
              </div>

              <div className="flex items-center gap-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="hidden lg:inline-flex" onClick={onToggleCollapse}>
                      {isCollapsed ? <PanelLeftOpen className="h-5 w-5" /> : <PanelLeftClose className="h-5 w-5" />}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="right">{isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}</TooltipContent>
                </Tooltip>
                <Button variant="ghost" size="icon" className="lg:hidden" onClick={onCloseMobile}>
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <div className={cn('glass-surface mt-8 rounded-[24px] p-4 text-sm text-sidebar-foreground/75 transition-all duration-300', isCollapsed && 'px-2 py-3 text-center')}>
              {isCollapsed ? (
                <p className="text-xs font-medium uppercase tracking-[0.28em] text-cyan-300">Live</p>
              ) : (
                <>
                  <p className="font-medium text-sidebar-foreground">Performance overview</p>
                  <p className="mt-2 leading-6">Monitor campaign efficiency, publisher growth, and cross-team operations from one workspace.</p>
                </>
              )}
            </div>

            <nav className="mt-8 flex-1 space-y-2">
              {navigationItems.map((item, index) => {
                const Icon = item.icon;
                const isActive = index === 0;

                const navLink = (
                  <Link
                    key={item.title}
                    href={item.href}
                    onClick={onCloseMobile}
                    className={cn(
                      'group flex items-center rounded-2xl text-sm font-medium transition-all duration-200',
                      isCollapsed ? 'justify-center px-2 py-3' : 'gap-3 px-4 py-3',
                      isActive
                        ? 'glass-surface text-sidebar-foreground shadow-glow'
                        : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/70 hover:text-sidebar-foreground',
                    )}
                  >
                    <span
                      className={cn(
                        'flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10',
                        isActive ? 'bg-primary-gradient text-primary-foreground shadow-neon' : 'bg-sidebar-muted text-sidebar-foreground/70',
                      )}
                    >
                      <Icon className="h-4 w-4" />
                    </span>
                    {!isCollapsed ? <span className="flex-1">{item.title}</span> : null}
                    {!isCollapsed && item.badge ? (
                      <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-300">
                        {item.badge}
                      </span>
                    ) : null}
                  </Link>
                );

                if (isCollapsed) {
                  return (
                    <Tooltip key={item.title}>
                      <TooltipTrigger asChild>{navLink}</TooltipTrigger>
                      <TooltipContent side="right">{item.title}</TooltipContent>
                    </Tooltip>
                  );
                }

                return navLink;
              })}
            </nav>

            <div className={cn('rounded-[24px] border border-cyan-400/20 bg-cyan-400/10 p-4 transition-all duration-300', isCollapsed && 'p-3 text-center')}>
              {isCollapsed ? (
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300">ROI</p>
              ) : (
                <>
                  <p className="text-sm font-semibold text-cyan-300">Scale your ad stack</p>
                  <p className="mt-2 text-sm leading-6 text-sidebar-foreground/75">Built for advertisers, publishers, and operators who need one reliable command center.</p>
                </>
              )}
            </div>
          </div>
        </aside>
      </>
    </TooltipProvider>
  );
}
