import type { ReactNode } from 'react';
import { Sidebar, SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { SidebarNav } from './sidebar-nav';
import { Header } from './header';
import { projects } from '@/lib/data';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const defaultProject = projects[0];

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <SidebarNav />
      </Sidebar>
      <SidebarInset className="bg-background">
        <Header project={defaultProject} />
        <div className="p-4 lg:p-6">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
