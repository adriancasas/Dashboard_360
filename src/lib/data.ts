import { PlaceHolderImages } from './placeholder-images';

const getImageUrl = (id: string) => PlaceHolderImages.find(img => img.id === id)?.imageUrl || '';

export type Agent = {
  id: string;
  name: string;
  status: 'active' | 'inactive';
  credits: number;
  avatarUrl: string;
};

export type User = {
  id: string;
  name: string;
  avatarUrl: string;
};

export type Project = {
  id: string;
  name: string;
  agentIds: string[];
  teamMemberIds: string[];
  folderId?: string;
};

export type Folder = {
  id: string;
  name: string;
}

export const users: User[] = [
  { id: 'user-1', name: 'Olivia Martin', avatarUrl: getImageUrl('user1') },
  { id: 'user-2', name: 'Jackson Lee', avatarUrl: getImageUrl('user2') },
  { id: 'user-3', name: 'Isabella Nguyen', avatarUrl: getImageUrl('user3') },
  { id: 'user-4', name: 'William Kim', avatarUrl: getImageUrl('user4') },
  { id: 'user-5', name: 'Sophia Garcia', avatarUrl: getImageUrl('user5') },
];

export const agents: Agent[] = [
  { id: 'agent-1', name: 'Youtube Optimizator', status: 'active', credits: 850, avatarUrl: getImageUrl('agent1') },
  { id: 'agent-2', name: 'Web Crawler', status: 'active', credits: 420, avatarUrl: getImageUrl('agent2') },
  { id: 'agent-3', name: 'Content Analyst', status: 'inactive', credits: 0, avatarUrl: getImageUrl('agent3') },
  { id: 'agent-4', name: 'Code Generator', status: 'active', credits: 95, avatarUrl: getImageUrl('agent4') },
  { id: 'agent-5', name: 'Support Bot', status: 'active', credits: 1000, avatarUrl: getImageUrl('agent5') },
];

export const folders: Folder[] = [
  { id: 'folder-1', name: 'Marketing' },
  { id: 'folder-2', name: 'Development' },
];

export const projects: Project[] = [
  { id: 'proj-1', name: 'Q3 Campaign Analysis', agentIds: ['agent-1', 'agent-3'], teamMemberIds: ['user-1', 'user-2', 'user-3'], folderId: 'folder-1' },
  { id: 'proj-2', name: 'Competitor Website Scraping', agentIds: ['agent-2'], teamMemberIds: ['user-1', 'user-4'], folderId: 'folder-1' },
  { id: 'proj-3', name: 'Next.js App Refactor', agentIds: ['agent-4'], teamMemberIds: ['user-1', 'user-2', 'user-5'], folderId: 'folder-2' },
  { id: 'proj-4', name: 'Customer Support Automation', agentIds: ['agent-5'], teamMemberIds: ['user-1', 'user-3'], folderId: 'folder-2' },
];

export const notifications = [
    { id: 1, text: `Agent "Data Miner" has finished its task.`, time: '5 minutes ago', read: false },
    { id: 2, text: `Agent "Code Generator" is low on credits.`, time: '1 hour ago', read: false },
    { id: 3, text: `You were added to "Next.js App Refactor".`, time: '3 hours ago', read: false },
    { id: 4, text: `Project "Q3 Campaign Analysis" is due tomorrow.`, time: '1 day ago', read: true },
]
