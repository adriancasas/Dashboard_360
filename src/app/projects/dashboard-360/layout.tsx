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
} from 'lucide-react';
import Link from 'next/link';

// For this prototype, we'll default the links to Project X.
// A more advanced implementation would use a state management to update these links
// based on the currently viewed project.
const defaultProjectId = 'x';

const features = [
  {
    icon: <LayoutGrid />,
    title: 'Workspaces',
    href: '/projects/dashboard-360',
  },
  {
    icon: <Users />,
    title: 'Roles y Equipos',
    href: '#',
  },
  {
    icon: <BrainCircuit />,
    title: 'Humano + IA',
    href: `/projects/dashboard-360/projects/${defaultProjectId}/humano-ia`,
  },
  {
    icon: <Coins />,
    title: 'Créditos',
    href: `/projects/dashboard-360/projects/${defaultProjectId}/credits`,
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
