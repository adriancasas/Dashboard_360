import DashboardLayout from '@/components/dashboard/layout';
import { ProjectOverview } from '@/components/dashboard/project-overview';
import { projects } from '@/lib/data';

export default function Home() {
  const defaultProject = projects[0];

  return (
    <DashboardLayout>
      <ProjectOverview project={defaultProject} />
    </DashboardLayout>
  );
}
