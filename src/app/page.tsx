
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import Chatbot from '@/components/chatbot';
import AgentDetailsDialog from '@/components/agent-details-dialog';
import placeholderImageData from '@/lib/placeholder-images.json';

const agents = [
  {
    id: 'data-miner',
    name: 'Data Miner',
    description: 'Especialista en extracción y análisis de datos a gran escala.',
    specialties: ['Data Mining', 'Web Scraping', 'SQL'],
    avatar: placeholderImageData.placeholderImages.find(img => img.id === 'agent1')?.imageUrl || "https://picsum.photos/seed/agent1/100/100",
    imageHint: 'robot abstract',
  },
  {
    id: 'web-crawler',
    name: 'Web Crawler',
    description: 'Navega y extrae información de sitios web de forma automática.',
    specialties: ['Web Crawling', 'SEO', 'Data Extraction'],
    avatar: placeholderImageData.placeholderImages.find(img => img.id === 'agent2')?.imageUrl || "https://picsum.photos/seed/agent2/100/100",
    imageHint: 'network technology',
  },
  {
    id: 'content-analyst',
    name: 'Content Analyst',
    description: 'Analiza y resume grandes volúmenes de texto y contenido.',
    specialties: ['NLP', 'Content Strategy', 'Summarization'],
    avatar: placeholderImageData.placeholderImages.find(img => img.id === 'agent3')?.imageUrl || "https://picsum.photos/seed/agent3/100/100",
    imageHint: 'charts data',
  },
  {
    id: 'code-generator',
    name: 'Code Generator',
    description: 'Genera fragmentos de código en múltiples lenguajes de programación.',
    specialties: ['Python', 'JavaScript', 'Boilerplate'],
    avatar: placeholderImageData.placeholderImages.find(img => img.id === 'agent4')?.imageUrl || "https://picsum.photos/seed/agent4/100/100",
    imageHint: 'code abstract',
  },
];

type Agent = typeof agents[0];

export default function Home() {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);

  return (
    <>
      <main className="container mx-auto p-4 md:p-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
            Agent Store
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Encuentra e integra agentes especializados para potenciar tus proyectos.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {agents.map((agent) => (
            <Card key={agent.id} className="flex flex-col">
              <CardHeader className="flex-row items-center gap-4">
                <Avatar className="w-16 h-16 border">
                  <AvatarImage src={agent.avatar} alt={agent.name} data-ai-hint={agent.imageHint} />
                  <AvatarFallback>{agent.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <CardTitle>{agent.name}</CardTitle>
                  <CardDescription>{agent.description}</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="flex flex-wrap gap-2">
                  {agent.specialties.map((specialty) => (
                    <Badge key={specialty} variant="secondary">{specialty}</Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={() => setSelectedAgent(agent)}>
                  Ver Detalles
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
      <Chatbot />
      <AgentDetailsDialog
        agent={selectedAgent}
        open={!!selectedAgent}
        onOpenChange={(isOpen) => !isOpen && setSelectedAgent(null)}
      />
    </>
  );
}
