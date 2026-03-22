import {
  BarChart3,
  Building2,
  Gauge,
  Settings,
  ShieldCheck,
  Users,
} from 'lucide-react';

import type { NavItem } from '@/types/navigation';

export const navigationItems: NavItem[] = [
  { title: 'Dashboard', href: '/', icon: Gauge },
  { title: 'Advertiser', href: '/advertiser', icon: Building2 },
  { title: 'Publisher', href: '#publisher', icon: Users },
  { title: 'Admin', href: '#admin', icon: ShieldCheck },
  { title: 'Analytics', href: '/analytics', icon: BarChart3, badge: 'Live' },
  { title: 'Settings', href: '#settings', icon: Settings },
];
