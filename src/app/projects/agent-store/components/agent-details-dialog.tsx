'use client';

import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';

type Agent = {
  id: string;
  name: string;
  description: string;
  avatar: string;
  tags: string[];
};

type AgentDetailsDialogProps = {
  agent: Agent;
  onOpenChange: (open: boolean) => void;
};

export function AgentDetailsDialog({
  agent,
  onOpenChange,
}: AgentDetailsDialogProps) {
  return (
    <Dialog open={true} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <div className="flex items-center gap-4">
            <Image
              src={agent.avatar}
              alt={`${agent.name} avatar`}
              width={64}
              height={64}
              className="rounded-full"
            />
            <div>
              <DialogTitle className="text-2xl">{agent.name}</DialogTitle>
              <DialogDescription>{agent.description}</DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <div className="py-4">
          <h3 className="mb-2 text-lg font-semibold">Capabilities</h3>
          <div className="flex flex-wrap gap-2">
            {agent.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
          <div className="mt-4 rounded-lg bg-muted p-4">
            <p className="text-sm text-muted-foreground">
              Further details about the agent's capabilities, performance
              metrics, and integration options would be displayed here.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
