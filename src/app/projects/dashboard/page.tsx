
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  PlusCircle,
  Folder,
  Users,
  User,
  CreditCard,
  MoreVertical,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const agents = [
  {
    name: 'Agent X',
    status: 'active',
    credits: 500,
    project: 'Project Alpha',
  },
  {
    name: 'Agent Y',
    status: 'inactive',
    credits: 0,
    project: 'Project Beta',
  },
  {
    name: 'Agent Z',
    status: 'active',
    credits: 250,
    project: 'Project Alpha',
  },
];

const projects = [
  {
    name: 'Project Alpha',
    icon: <Folder className="h-5 w-5 text-muted-foreground" />,
  },
  {
    name: 'Project Beta',
    icon: <Folder className="h-5 w-5 text-muted-foreground" />,
  },
];

export default function DashboardPage() {
  return (
    <main className="p-4 sm:p-6 lg:p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Agent Dashboard</h1>
        <div className="flex items-center gap-4">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Agent
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-12">
        <div className="md:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <nav className="flex flex-col gap-2">
                {projects.map((project) => (
                  <Button
                    key={project.name}
                    variant="ghost"
                    className="justify-start gap-2"
                  >
                    {project.icon}
                    <span>{project.name}</span>
                  </Button>
                ))}
              </nav>
            </CardContent>
          </Card>
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Teams</CardTitle>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full justify-start gap-2">
                <Users className="h-5 w-5 text-muted-foreground" />
                <span>Share with Teammates</span>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-9">
          <Card>
            <CardHeader>
              <CardTitle>Agents Overview</CardTitle>
              <CardDescription>
                Manage your agents and their credit balance.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Agent Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Credits</TableHead>
                    <TableHead>Project</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {agents.map((agent) => (
                    <TableRow key={agent.name}>
                      <TableCell className="font-medium">{agent.name}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            agent.status === 'active' ? 'default' : 'destructive'
                          }
                          className={
                            agent.status === 'active'
                              ? 'bg-green-500/20 text-green-500'
                              : 'bg-red-500/20 text-red-500'
                          }
                        >
                          {agent.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {agent.credits > 0
                          ? `${agent.credits} credits left`
                          : 'Recharge needed'}
                      </TableCell>
                      <TableCell>{agent.project}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Assign to Project</DropdownMenuItem>
                            <DropdownMenuItem>View Details</DropdownMenuItem>
                            <DropdownMenuItem className="text-red-500">
                              Deactivate
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
