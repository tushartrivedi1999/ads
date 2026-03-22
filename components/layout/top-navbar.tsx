'use client';

import { Bell, ChevronsLeftRight, Command, Menu, Search, Sparkles } from 'lucide-react';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type TopNavbarProps = {
  isCollapsed: boolean;
  onOpenMobile: () => void;
  onToggleCollapse: () => void;
};

export function TopNavbar({ isCollapsed, onOpenMobile, onToggleCollapse }: TopNavbarProps) {
  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-[#0b0f19]/70 backdrop-blur-2xl">
      <div className="flex h-20 items-center justify-between gap-3 px-4 sm:px-6 lg:px-10">
        <div className="flex min-w-0 flex-1 items-center gap-3 sm:gap-4">
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={onOpenMobile}>
            <Menu className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="hidden lg:inline-flex" onClick={onToggleCollapse}>
            <ChevronsLeftRight className="h-5 w-5" />
          </Button>
          <div className="glass-surface flex h-11 min-w-0 flex-1 items-center gap-3 rounded-2xl px-4 text-sm text-muted-foreground md:max-w-xl">
            <Search className="h-4 w-4 shrink-0 text-cyan-300" />
            <span className="truncate">Search campaigns, performance, teams, or reports...</span>
            <div className="ml-auto hidden items-center gap-1 rounded-lg border border-white/10 bg-black/20 px-2 py-1 text-xs text-foreground/80 sm:flex">
              <Command className="h-3 w-3" />K
            </div>
          </div>
          {!isCollapsed ? (
            <div className="hidden xl:block">
              <p className="text-sm text-muted-foreground">Workspace</p>
              <h2 className="text-base font-semibold tracking-tight">Ads performance dashboard</h2>
            </div>
          ) : null}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <Button variant="secondary" className="hidden lg:inline-flex">
            <Sparkles className="mr-2 h-4 w-4 text-cyan-300" />
            New report
          </Button>
          <Button variant="ghost" size="icon" className="glass-surface rounded-full">
            <Bell className="h-4 w-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="glass-surface h-12 rounded-2xl px-2">
                <Avatar className="h-9 w-9">
                  <AvatarFallback>AO</AvatarFallback>
                </Avatar>
                <div className="hidden text-left sm:block">
                  <p className="text-sm font-medium">Avery Ops</p>
                  <p className="text-xs text-muted-foreground">Growth Lead</p>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Workspace</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
