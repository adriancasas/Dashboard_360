
'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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

interface AgentDetailsDialogProps {
  agent: Agent | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function AgentDetailsDialog({ agent, open, onOpenChange }: AgentDetailsDialogProps) {
  if (!agent) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-center gap-4 mb-4">
            <Avatar className="w-20 h-20 border">
              <AvatarImage src={agent.avatar} alt={agent.name} data-ai-hint={agent.imageHint} />
              <AvatarFallback>{agent.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <DialogTitle className="text-2xl">{agent.name}</DialogTitle>
              <DialogDescription>{agent.description}</DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <div className="py-4">
          <h4 className="font-semibold mb-2">Especialidades:</h4>
          <div className="flex flex-wrap gap-2">
            {agent.specialties.map((specialty) => (
              <Badge key={specialty} variant="outline">{specialty}</Badge>
            ))}
          </div>
        </div>
        <DialogFooter>
          <Button>Conectar al Proyecto</Button>
          <Button variant="secondary" onClick={() => onOpenChange(false)}>Cerrar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
