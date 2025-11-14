'use client';

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import {
  LayoutGrid,
  Users,
  BrainCircuit,
  Coins,
  AreaChart,
  Sparkles,
  PanelLeft,
} from 'lucide-react';
import Link from 'next/link';

const features = [
  {
    icon: <LayoutGrid />,
    title: 'Workspaces',
    href: '#',
  },
  {
    icon: <Users />,
    title: 'Roles y Equipos',
    href: '#',
  },
  {
    icon: <BrainCircuit />,
    title: 'Humano + IA',
    href: '#',
  },
  {
    icon: <Coins />,
    title: 'Créditos',
    href: '#',
  },
  {
    icon: <AreaChart />,
    title: 'Métricas y ROI',
    href: '#',
  },
  {
    icon: <Sparkles />,
    title: 'Copilot 360',
    href: '#',
  },
];

export default function Dashboard360Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <SidebarTrigger />
            <span className="text-lg font-semibold">Dashboard 360</span>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {features.map((feature) => (
              <SidebarMenuItem key={feature.title}>
                <SidebarMenuButton
                  asChild
                  tooltip={{
                    children: feature.title,
                  }}
                >
                  <Link href={feature.href}>
                    {feature.icon}
                    <span>{feature.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
