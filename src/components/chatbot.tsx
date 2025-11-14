
'use client';

import { useState, useRef, useEffect } from 'react';
import { CornerDownLeft, Loader, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { faqFlow, FaqInput } from '@/ai/flows/faq-flow';
import placeholderImageData from '@/lib/placeholder-images.json';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const botAvatar = placeholderImageData.placeholderImages.find(img => img.id === 'agent5')?.imageUrl || "https://picsum.photos/seed/agent5/100/100";
  const botImageHint = placeholderImageData.placeholderImages.find(img => img.id === 'agent5')?.imageHint || 'friendly robot';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  useEffect(() => {
    if (isOpen) {
        setMessages([
            { id: 'initial-1', text: '¡Hola! Soy tu asistente para el Agent Store. ¿En qué puedo ayudarte?', sender: 'bot' }
        ]);
    }
  }, [isOpen]);


  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage: Message = { id: Date.now().toString(), text: inputValue, sender: 'user' };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const faqInput: FaqInput = { question: inputValue };
      const result = await faqFlow(faqInput);
      const botMessage: Message = { id: (Date.now() + 1).toString(), text: result.answer, sender: 'bot' };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error calling faqFlow:", error);
      const errorMessage: Message = { id: (Date.now() + 1).toString(), text: 'Lo siento, ha ocurrido un error. Por favor, inténtalo de nuevo.', sender: 'bot' };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <>
      <div className="fixed bottom-4 right-4 z-50">
        <Button onClick={() => setIsOpen(!isOpen)} className="w-16 h-16 rounded-full shadow-lg">
           <Avatar className="w-12 h-12">
                <AvatarImage src={botAvatar} alt="Support Bot" data-ai-hint={botImageHint} />
                <AvatarFallback>SB</AvatarFallback>
            </Avatar>
        </Button>
      </div>
      {isOpen && (
        <Card className="fixed bottom-24 right-4 z-50 w-full max-w-sm flex flex-col shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <Avatar className="w-8 h-8">
                    <AvatarImage src={botAvatar} alt="Support Bot" data-ai-hint={botImageHint} />
                    <AvatarFallback>SB</AvatarFallback>
                </Avatar>
                <span>Asistente Agent Store</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-grow overflow-y-auto h-80 pr-2">
            <div className="space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                  {msg.sender === 'bot' && (
                     <Avatar className="w-8 h-8">
                        <AvatarImage src={botAvatar} alt="Bot" data-ai-hint={botImageHint} />
                        <AvatarFallback>SB</AvatarFallback>
                    </Avatar>
                  )}
                  <div className={`rounded-lg px-3 py-2 text-sm ${msg.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
                    <p>{msg.text}</p>
                  </div>
                   {msg.sender === 'user' && (
                     <Avatar className="w-8 h-8">
                        <AvatarFallback><User/></AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
               {isLoading && (
                <div className="flex items-start gap-3">
                   <Avatar className="w-8 h-8">
                       <AvatarImage src={botAvatar} alt="Bot" />
                       <AvatarFallback>SB</AvatarFallback>
                   </Avatar>
                  <div className="rounded-lg px-3 py-2 text-sm bg-muted flex items-center">
                    <Loader className="animate-spin w-4 h-4" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </CardContent>
          <CardFooter>
            <form onSubmit={handleSendMessage} className="flex w-full items-center space-x-2">
              <Input
                id="message"
                placeholder="Escribe tu pregunta..."
                className="flex-1"
                autoComplete="off"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <Button type="submit" size="icon" disabled={isLoading}>
                <CornerDownLeft className="h-4 w-4" />
              </Button>
            </form>
          </CardFooter>
        </Card>
      )}
    </>
  );
}
