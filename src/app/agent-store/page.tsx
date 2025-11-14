'use client';
import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Chatbot } from '@/components/chatbot';
import { AgentDetailsDialog } from '@/components/agent-details-dialog';

type Agent = {
  id: string;
  name: string;
  description: string;
  avatar: string;
  tags: string[];
};

const agents: Agent[] = [
  {
    id: 'data-miner',
    name: 'Data Miner',
    description: 'Extracts and analyzes data from various sources.',
    avatar: PlaceHolderImages.find((img) => img.id === 'agent1')?.imageUrl || '',
    tags: ['Data', 'Analysis', 'Automation'],
  },
  {
    id: 'web-crawler',
    name: 'Web Crawler',
    description: 'Crawls websites to gather specific information.',
    avatar: PlaceHolderImages.find((img) => img.id === 'agent2')?.imageUrl || '',
    tags: ['Web', 'Scraping'],
  },
  {
    id: 'content-analyst',
    name: 'Content Analyst',
    description: 'Analyzes text content for sentiment and keywords.',
    avatar: PlaceHolderImages.find((img) => img.id === 'agent3')?.imageUrl || '',
    tags: ['NLP', 'Content'],
  },
  {
    id: 'code-generator',
    name: 'Code Generator',
    description: 'Generates boilerplate code in multiple languages.',
    avatar: PlaceHolderImages.find((img) => img.id === 'agent4')?.imageUrl || '',
    tags: ['Development', 'Code'],
  },
  {
    id: 'support-bot',
    name: 'Support Bot',
    description: 'Automates responses to common customer support queries.',
    avatar: PlaceHolderImages.find((img) => img.id === 'agent5')?.imageUrl || '',
    tags: ['Support', 'Chat'],
  },
  {
    id: 'market-analyzer',
    name: 'Market Analyzer',
    description: 'Monitors and analyzes financial market trends.',
    avatar: PlaceHolderImages.find((img) => img.id === 'agent6')?.imageUrl || '',
    tags: ['Finance', 'Data'],
  },
];

export default function AgentStorePage() {
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);

  return (
    <main className="container mx-auto p-4 md:p-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
          LLM Agent Store
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          Discover and deploy autonomous agents for any task.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {agents.map((agent) => (
          <Card key={agent.id} className="flex flex-col">
            <CardHeader className="flex-row items-start gap-4 space-y-0">
              <Image
                src={agent.avatar}
                alt={`${agent.name} avatar`}
                width={64}
                height={64}
                className="rounded-full"
              />
              <div className="flex-1">
                <CardTitle>{agent.name}</CardTitle>
                <CardDescription className="mt-1">
                  {agent.description}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="flex flex-wrap gap-2">
                {agent.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setSelectedAgent(agent)}
              >
                View Details
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <Chatbot />
      {selectedAgent && (
        <AgentDetailsDialog
          agent={selectedAgent}
          onOpenChange={(isOpen) => !isOpen && setSelectedAgent(null)}
        />
      )}
    </main>
  );
}
