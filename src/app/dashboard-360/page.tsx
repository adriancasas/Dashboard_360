
'use client';

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
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
import { TrendingUp, Users, Calendar } from 'lucide-react';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const pieData = [
  { name: 'Done', value: 400, fill: 'hsl(var(--primary))' },
  { name: 'In Progress', value: 300, fill: 'hsl(var(--accent))' },
  { name: 'To Do', value: 300, fill: 'hsl(var(--muted))' },
];

const barData = [
  { name: 'Agent A', performance: 98 },
  { name: 'Agent B', performance: 86 },
  { name: 'Agent C', performance: 75 },
  { name: 'Agent D', performance: 89 },
  { name: 'Agent E', performance: 92 },
];

const events = [
  {
    time: '12:00',
    title: 'Daily Stand-up',
    participants: [
      PlaceHolderImages.find((img) => img.id === 'user1')?.imageUrl,
      PlaceHolderImages.find((img) => img.id === 'user2')?.imageUrl,
      PlaceHolderImages.find((img) => img.id === 'user3')?.imageUrl,
    ],
  },
  {
    time: '14:30',
    title: 'Stakeholder Meeting',
    participants: [
      PlaceHolderImages.find((img) => img.id === 'user1')?.imageUrl,
      PlaceHolderImages.find((img) => img.id === 'user4')?.imageUrl,
    ],
  },
  {
    time: '16:00',
    title: 'Design Review',
    participants: [
      PlaceHolderImages.find((img) => img.id === 'user2')?.imageUrl,
      PlaceHolderImages.find((img) => img.id === 'user5')?.imageUrl,
      PlaceHolderImages.find((img) => img.id === 'user3')?.imageUrl,
    ],
  },
];

const kpis = [
  { title: 'Customer Satisfaction', value: '98%', trend: '+1.2%' },
  { title: 'Agent Response Time', value: '1.2min', trend: '-5.4%' },
  { title: 'Resolution Rate', value: '92.5%', trend: '+2.1%' },
  { title: 'Active Users', value: '1,204', trend: '+150' },
];

export default function Dashboard360Page() {
  return (
    <main className="flex-1 p-4 md:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Proyecto X</h1>
        <p className="text-muted-foreground">
          Una vista general del estado actual del proyecto.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-2">
        {/* Quadrant 1: Pie Chart */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Distribución de Tareas</CardTitle>
            <CardDescription>
              Estado de las tareas del sprint actual.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex items-center justify-center">
            <ChartContainer config={{}} className="h-[250px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    labelLine={false}
                    label={({
                      cx,
                      cy,
                      midAngle,
                      innerRadius,
                      outerRadius,
                      percent,
                    }) => {
                      const RADIAN = Math.PI / 180;
                      const radius =
                        innerRadius + (outerRadius - innerRadius) * 0.5;
                      const x = cx + radius * Math.cos(-midAngle * RADIAN);
                      const y = cy + radius * Math.sin(-midAngle * RADIAN);

                      return (
                        <text
                          x={x}
                          y={y}
                          fill="white"
                          textAnchor={x > cx ? 'start' : 'end'}
                          dominantBaseline="central"
                          className="text-xs font-bold"
                        >
                          {`${(percent * 100).toFixed(0)}%`}
                        </text>
                      );
                    }}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} stroke={entry.fill} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
           <CardFooter className="flex-col gap-2 text-sm">
            <div className="flex w-full items-center justify-center gap-4 text-muted-foreground">
                <div className="flex items-center gap-2">
                    <div className="h-2.5 w-2.5 rounded-full bg-primary" />
                    <span>Done</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="h-2.5 w-2.5 rounded-full bg-accent" />
                    <span>In Progress</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="h-2.5 w-2.5 rounded-full bg-muted" />
                    <span>To Do</span>
                </div>
            </div>
          </CardFooter>
        </Card>

        {/* Quadrant 2: Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Rendimiento de Agentes</CardTitle>
            <CardDescription>
              Performance individual en el último ciclo.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData} margin={{ top: 20, right: 20, left: -10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} tickMargin={8} />
                  <YAxis tickLine={false} axisLine={false} tickMargin={8}/>
                  <Tooltip
                    cursor={{ fill: 'hsl(var(--muted))' }}
                    content={<ChartTooltipContent indicator="dot" />}
                  />
                  <Bar dataKey="performance" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Quadrant 3: Events */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Próximos Eventos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableBody>
                {events.map((event) => (
                  <TableRow key={event.title}>
                    <TableCell className="w-[60px] font-medium">
                      {event.time}
                    </TableCell>
                    <TableCell>{event.title}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end -space-x-2">
                        {event.participants.map((p, i) => (
                          p && <Avatar key={i} className="h-6 w-6 border-2 border-card">
                            <AvatarImage src={p} />
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

        {/* Quadrant 4: KPIs */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              KPIs Clave
            </CardTitle>
            <CardDescription>
              Métricas de rendimiento principales del proyecto.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            {kpis.map((kpi) => (
              <div key={kpi.title} className="rounded-lg bg-muted p-4">
                <p className="text-sm text-muted-foreground">{kpi.title}</p>
                <p className="text-2xl font-bold">{kpi.value}</p>
                <Badge
                  className={`mt-1 text-xs ${
                    kpi.trend.startsWith('+')
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                  variant="secondary"
                >
                  {kpi.trend}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
