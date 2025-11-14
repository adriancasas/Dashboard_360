
'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from 'recharts';
import { TrendingUp, Calendar, Bot, CheckCircle, Circle, FileText } from 'lucide-react';
import {
  ChartContainer,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Separator } from '@/components/ui/separator';

const pieData = [
  { name: 'Done', value: 400, fill: 'hsl(var(--primary))' },
  { name: 'In Progress', value: 300, fill: 'hsl(var(--accent))' },
  { name: 'To Do', value: 300, fill: 'hsl(var(--muted))' },
];

const activeAgents = [
  {
    name: 'Agent A',
    avatar: PlaceHolderImages.find((img) => img.id === 'agent1')?.imageUrl,
    task: 'Analizando datos de mercado',
    status: 'activo',
  },
  {
    name: 'Agent B',
    avatar: PlaceHolderImages.find((img) => img.id === 'agent2')?.imageUrl,
    task: 'Generando informe de ventas',
    status: 'activo',
  },
  {
    name: 'Agent C',
    avatar: PlaceHolderImages.find((img) => img.id === 'agent4')?.imageUrl,
    task: 'Optimización de código backend',
    status: 'inactivo',
  },
  {
    name: 'Agent D',
    avatar: PlaceHolderImages.find((img) => img.id === 'agent5')?.imageUrl,
    task: 'Monitorizando logs de producción',
    status: 'activo',
  },
];

const events = [
  {
    time: '12:00',
    title: 'Daily Stand-up',
    participants: ['user1', 'user2', 'user3'],
  },
  {
    time: '14:30',
    title: 'Stakeholder Meeting',
    participants: ['user1', 'user4'],
  },
  {
    time: '16:00',
    title: 'Design Review',
    participants: ['user2', 'user5', 'user3'],
  },
];

const kpis = [
  { title: 'Customer Satisfaction', value: '98%', trend: '+1.2%' },
  { title: 'Agent Response Time', value: '1.2min', trend: '-5.4%' },
  { title: 'Resolution Rate', value: '92.5%', trend: '+2.1%' },
  { title: 'Active Users', value: '1,204', trend: '+150' },
];

const teams = [
  {
    id: 'team-seo',
    human: {
      role: 'SEO Strategist',
      name: 'Laura Gómez',
      avatar: PlaceHolderImages.find((img) => img.id === 'user1')?.imageUrl,
    },
    agent: {
      role: 'SEO Positioner Agent',
      name: 'Agent SEO-5',
      avatar: PlaceHolderImages.find((img) => img.id === 'agent6')?.imageUrl,
    },
    assignedTask: 'Análisis de palabras clave de la competencia.',
    tasks: [
        { id: 'seo-1', description: 'Investigar 5 competidores principales', completed: true },
        { id: 'seo-2', description: 'Extraer 100 palabras clave long-tail', completed: true },
        { id: 'seo-3', description: 'Generar informe de dificultad de keywords', completed: false },
        { id: 'seo-4', description: 'Proponer 3 temas de contenido basados en datos', completed: false },
    ]
  },
  {
    id: 'team-content',
    human: {
      role: 'Content Manager',
      name: 'Carlos Rivas',
      avatar: PlaceHolderImages.find((img) => img.id === 'user2')?.imageUrl,
    },
    agent: {
      role: 'Article Writer Agent',
      name: 'Writer-Bot 2.1',
      avatar: PlaceHolderImages.find((img) => img.id === 'agent3')?.imageUrl,
    },
    assignedTask: 'Redacción de borrador para el blog post de "Novedades Q3".',
    tasks: [
        { id: 'content-1', description: 'Esquema del artículo', completed: true },
        { id: 'content-2', description: 'Redacción de la introducción', completed: true },
        { id: 'content-3', description: 'Desarrollo del cuerpo del artículo', completed: false },
    ]
  },
];

type Team = (typeof teams)[0];


export default function ProjectDetailPage({ params }: { params: { projectId: string } }) {
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);

  const getAvatar = (id: string) => PlaceHolderImages.find(img => img.id === id)?.imageUrl;
  const getFallback = (name: string) => name.charAt(0);

  const projectName = params.projectId.toUpperCase();

  return (
    <main className="flex-1 p-4 md:p-6 lg:p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
            <h1 className="text-3xl font-bold">Proyecto {projectName}</h1>
            <p className="text-muted-foreground">
              Una vista general del estado actual del proyecto.
            </p>
        </div>
        <div className="flex items-center gap-4">
            <div className="flex items-center -space-x-2">
                <Avatar className="border-2 border-background">
                    <AvatarImage src={getAvatar('user2')} />
                    <AvatarFallback>JL</AvatarFallback>
                </Avatar>
                <Avatar className="border-2 border-background">
                    <AvatarImage src={getAvatar('user3')} />
                    <AvatarFallback>IN</AvatarFallback>
                </Avatar>
                 <Avatar className="border-2 border-background">
                    <AvatarImage src={getAvatar('user5')} />
                    <AvatarFallback>SG</AvatarFallback>
                </Avatar>
            </div>
            <Avatar className="border-2 border-primary">
                <AvatarImage src={getAvatar('user1')} />
                <AvatarFallback>OM</AvatarFallback>
            </Avatar>
        </div>
      </div>
      
      {/* 4 Quadrant View */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Distribución de Tareas</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex items-center justify-center">
            <ChartContainer config={{}} className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <ChartTooltipContent hideLabel />
                  <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} labelLine={false}
                    label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
                      const RADIAN = Math.PI / 180;
                      const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                      const x = cx + radius * Math.cos(-midAngle * RADIAN);
                      const y = cy + radius * Math.sin(-midAngle * RADIAN);
                      return <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" className="text-xs font-bold">{`${(percent * 100).toFixed(0)}%`}</text>;
                    }}
                  >
                    {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.fill} stroke={entry.fill} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Bot />Agentes Activos</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[64px]">Agente</TableHead>
                        <TableHead>Tarea Actual</TableHead>
                        <TableHead className="text-right">Estado</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {activeAgents.map((agent) => (
                        <TableRow key={agent.name}>
                            <TableCell>
                                <Avatar>
                                    <AvatarImage src={agent.avatar} />
                                    <AvatarFallback>{agent.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                            </TableCell>
                            <TableCell>
                                <p className="font-medium">{agent.name}</p>
                                <p className="text-sm text-muted-foreground">{agent.task}</p>
                            </TableCell>
                            <TableCell className="text-right">
                                <Badge variant={agent.status === 'activo' ? 'default' : 'outline'} className={agent.status === 'activo' ? 'bg-green-100 text-green-800' : ''}>{agent.status}</Badge>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Calendar className="h-5 w-5" />Próximos Eventos</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableBody>
                {events.map((event) => (
                  <TableRow key={event.title}>
                    <TableCell className="w-[60px] font-medium">{event.time}</TableCell>
                    <TableCell>{event.title}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end -space-x-2">
                        {event.participants.map((p_id, i) => (
                          <Avatar key={i} className="h-6 w-6 border-2 border-card">
                            <AvatarImage src={getAvatar(p_id)} />
                            <AvatarFallback>U</AvatarFallback>
                          </Avatar>
                        ))}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><TrendingUp className="h-5 w-5" />KPIs Clave</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            {kpis.map((kpi) => (
              <div key={kpi.title} className="rounded-lg bg-muted p-4">
                <p className="text-sm text-muted-foreground">{kpi.title}</p>
                <p className="text-2xl font-bold">{kpi.value}</p>
                <Badge className={`mt-1 text-xs ${kpi.trend.startsWith('+') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`} variant="secondary">{kpi.trend}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Human + AI Teams View */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Humano + IA Teams</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {teams.map((team) => (
            <Card key={team.id} className="cursor-pointer hover:border-primary transition-colors" onClick={() => setSelectedTeam(team)}>
              <CardHeader>
                  <div className="flex items-center gap-4">
                       <div className="relative">
                          <Avatar className="h-16 w-16 border-2 border-primary">
                              <AvatarImage src={team.human.avatar} />
                              <AvatarFallback>{getFallback(team.human.name)}</AvatarFallback>
                          </Avatar>
                          <Badge variant="secondary" className="absolute -bottom-1 -right-2 text-xs">Humano</Badge>
                       </div>
                       <div className="relative">
                           <Avatar className="h-16 w-16 border-2 border-accent">
                              <AvatarImage src={team.agent.avatar} />
                              <AvatarFallback>{getFallback(team.agent.name)}</AvatarFallback>
                          </Avatar>
                          <Badge variant="default" className="bg-accent text-accent-foreground absolute -bottom-1 -right-2 text-xs">IA</Badge>
                       </div>
                  </div>
              </CardHeader>
              <CardContent>
                  <h3 className="font-semibold">{team.human.role} + {team.agent.role}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                      <span className='font-medium'>{team.human.name}</span> está trabajando con <span className='font-medium'>{team.agent.name}</span>.
                  </p>
                  <Separator className="my-4" />
                  <p className="text-sm font-semibold">Tarea actual:</p>
                  <p className="text-sm text-muted-foreground">{team.assignedTask}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {selectedTeam && (
        <Dialog open={!!selectedTeam} onOpenChange={(isOpen) => !isOpen && setSelectedTeam(null)}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Tareas para el equipo: {selectedTeam.human.role}</DialogTitle>
                    <DialogDescription>
                        Checklist de tareas asignadas al binomio {selectedTeam.human.name} y {selectedTeam.agent.name}.
                    </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                    <div className="space-y-4">
                        {selectedTeam.tasks.map(task => {
                          const isClickable = task.completed;
                          const TaskWrapper = isClickable ? 'button' : 'div';
                          
                          return (
                            <TaskWrapper 
                              key={task.id} 
                              className={`flex w-full items-center gap-4 rounded-md border p-4 text-left transition-colors ${isClickable ? 'cursor-pointer hover:bg-muted/50' : ''}`}
                              onClick={() => isClickable && alert(`Visualizando el output de: "${task.description}"`)}
                            >
                                {task.completed ? (
                                    <CheckCircle className="h-6 w-6 flex-shrink-0 text-green-500" />
                                ) : (
                                    <Circle className="h-6 w-6 flex-shrink-0 text-muted-foreground" />
                                )}
                                <span className={`flex-1 ${task.completed ? 'text-muted-foreground' : 'text-foreground'}`}>
                                    {task.description}
                                </span>
                                {task.completed && <FileText className="h-5 w-5 flex-shrink-0 text-muted-foreground" />}
                            </TaskWrapper>
                          );
                        })}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
      )}

    </main>
  );
}

