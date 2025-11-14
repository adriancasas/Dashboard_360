'use client';

import { useState } from 'react';
import { Bot, Send, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

type Message = {
  text: string;
  sender: 'user' | 'bot';
};

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = () => {
    if (input.trim()) {
      const newMessages: Message[] = [...messages, { text: input, sender: 'user' }];
      setMessages(newMessages);
      setInput('');
      setIsLoading(true);

      // Simulate bot response
      setTimeout(() => {
        setMessages([
          ...newMessages,
          { text: 'This is a simulated response.', sender: 'bot' },
        ]);
        setIsLoading(false);
      }, 1500);
    }
  };
  
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div>
      <Button
        className="fixed bottom-4 right-4 h-16 w-16 rounded-full shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-8 w-8" /> : <Bot className="h-8 w-8" />}
      </Button>

      {isOpen && (
        <Card className="fixed bottom-24 right-4 flex h-[60vh] w-96 flex-col">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Avatar>
                <AvatarFallback>A</AvatarFallback>
              </Avatar>
              <span>Support Agent</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-grow overflow-hidden">
            <ScrollArea className="h-full">
              <div className="flex flex-col gap-4 pr-4">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={cn(
                      'flex items-end gap-2',
                      msg.sender === 'user' ? 'justify-end' : 'justify-start'
                    )}
                  >
                    <div
                      className={cn(
                        'max-w-xs rounded-lg p-3',
                        msg.sender === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      )}
                    >
                      <p className="text-sm">{msg.text}</p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                   <div className="flex items-end gap-2 justify-start">
                      <div className="max-w-xs rounded-lg p-3 bg-muted">
                        <Loader2 className="h-5 w-5 animate-spin" />
                      </div>
                    </div>
                )}
              </div>
            </ScrollArea>
          </CardContent>
          <CardFooter>
            <div className="relative w-full">
              <Input
                placeholder="Type a message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
              />
              <Button
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 transform"
                onClick={handleSend}
                disabled={isLoading}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
