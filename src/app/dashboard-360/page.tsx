
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { PlusCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const projects = [
  {
    id: 'x',
    name: 'Proyecto X',
    description: 'Proyecto de optimización de la experiencia de usuario y rendimiento del dashboard 360.',
    status: 'En Progreso',
    team: ['user1', 'user2', 'user3', 'user5'],
    isClickable: true,
  },
  {
    id: 'y',
    name: 'Proyecto Y',
    description: 'Iniciativa para integrar un nuevo motor de IA para análisis predictivo de mercado.',
    status: 'En Progreso',
    team: ['user1', 'user4', 'user2'],
    isClickable: true,
  },
  {
    id: 'z',
    name: 'Proyecto Z (Concepto)',
    description: 'Exploración de nuevas interfaces conversacionales para la atención al cliente.',
    status: 'Planificado',
    team: ['user1', 'user5'],
    isClickable: false,
  },
  {
    id: 'alpha',
    name: 'Proyecto Alpha (Mantenimiento)',
    description: 'Mantenimiento y soporte continuo de la plataforma de agentes v1.',
    status: 'Archivado',
    team: ['user4'],
    isClickable: false,
  },
];

export default function Dashboard360Page() {
  const getAvatar = (id: string) => PlaceHolderImages.find(img => img.id === id)?.imageUrl;
  const getFallback = (name: string) => name.charAt(0);

  return (
    <main className="flex-1 p-4 md:p-6 lg:p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
            <h1 className="text-3xl font-bold">Workspaces</h1>
            <p className="text-muted-foreground">
              Selecciona un proyecto para ver sus detalles y progreso.
            </p>
        </div>
        <Button>
          <PlusCircle className="mr-2" />
          Nuevo Proyecto
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project) => {
          const Wrapper = project.isClickable ? Link : 'div';
          const wrapperProps = project.isClickable ? { href: `/dashboard-360/projects/${project.id}` } : {};

          return (
            <Wrapper key={project.id} {...wrapperProps}>
              <Card className={`h-full flex flex-col transition-all ${project.isClickable ? 'hover:border-primary hover:scale-[1.02] cursor-pointer' : 'bg-muted/50'}`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>{project.name}</CardTitle>
                    {project.isClickable && <ArrowRight className="h-5 w-5 text-primary" />}
                  </div>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                   <Badge variant={project.status === 'En Progreso' ? 'default' : 'secondary'}>
                      {project.status}
                    </Badge>
                </CardContent>
                <CardFooter>
                    <div className="flex items-center justify-between w-full">
                        <span className="text-sm text-muted-foreground">Equipo</span>
                        <div className="flex items-center -space-x-2">
                            {project.team.map(userId => (
                                <Avatar key={userId} className="h-8 w-8 border-2 border-card">
                                    <AvatarImage src={getAvatar(userId)} />
                                    <AvatarFallback>{getFallback(userId)}</AvatarFallback>
                                </Avatar>
                            ))}
                        </div>
                    </div>
                </CardFooter>
              </Card>
            </Wrapper>
          );
        })}
      </div>
    </main>
  );
}
