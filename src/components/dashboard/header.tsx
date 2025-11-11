'use client';

import { SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Bell, User, Users, Plus } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { users, type Project, notifications as notificationsData } from '@/lib/data';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';

export function Header({ project }: { project: Project }) {
  const currentUser = users[0];
  const teamMembers = project.teamMemberIds.map(id => users.find(u => u.id === id)).filter(Boolean);
  
  return (
    <header className="flex h-20 items-center gap-4 border-b bg-card px-4 lg:px-6">
      <SidebarTrigger className="lg:hidden" />
      
      <div>
        <p className="text-sm text-muted-foreground">Project</p>
        <h1 className="text-xl font-bold tracking-tight">{project.name}</h1>
      </div>
      
      <div className="ml-auto flex items-center gap-4">
        <div className="flex -space-x-2">
          {teamMembers.slice(0, 3).map(user => (
            user &&
            <Avatar key={user.id} className="h-9 w-9 border-2 border-card">
              <AvatarImage src={user.avatarUrl} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
          ))}
          {teamMembers.length > 3 && (
            <Avatar className="h-9 w-9 border-2 border-card">
              <AvatarFallback>+{teamMembers.length - 3}</AvatarFallback>
            </Avatar>
          )}
        </div>
        <Button variant="outline" size="sm">
          <Users className="mr-2 h-4 w-4" />
          Share
        </Button>
        <Button size="sm" className="bg-primary hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" />
          Add Agent
        </Button>
        
        <Separator orientation="vertical" className="h-8" />

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="relative rounded-full">
              <Bell />
              <span className="absolute top-1 right-1 block h-2 w-2 rounded-full bg-primary ring-1 ring-background" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80" align="end">
            <div className="grid gap-2">
              <div className="space-y-1">
                <h4 className="font-medium leading-none">Notifications</h4>
                <p className="text-sm text-muted-foreground">You have {notificationsData.filter(n => !n.read).length} unread messages.</p>
              </div>
              <Separator />
              <div className="flex flex-col gap-2">
              {notificationsData.map(notification => (
                <div key={notification.id} className="text-sm grid grid-cols-[25px_1fr] items-start pb-2 last:pb-0">
                   <span className={`flex h-2 w-2 translate-y-1 rounded-full ${!notification.read ? 'bg-primary' : 'bg-transparent'}`} />
                   <div className="grid gap-1">
                     <p>{notification.text}</p>
                     <p className="text-xs text-muted-foreground">{notification.time}</p>
                   </div>
                </div>
              ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Avatar className="h-9 w-9">
                <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} />
                <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>{currentUser.name}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
