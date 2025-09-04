
'use client';

import { useState, useEffect, useRef, PointerEvent as ReactPointerEvent } from 'react';
import { Bot, Send, Trash2, X, Languages as LanguageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { aiQuestionAnswering } from '@/ai/flows/ai-question-answering';
import { Avatar, AvatarFallback } from './ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { languages } from '@/lib/languages';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

const greetings: { [key: string]: string } = {
  English: "Hi! I’m Your AI Assistant",
  Hindi: "नमस्ते, मैं आपका AI सहायक हूँ",
};

export function ChatbotAssistant() {
  const [isClient, setIsClient] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 20, y: 20 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [showCloseTarget, setShowCloseTarget] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const popSoundRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    setIsClient(true);
    if (sessionStorage.getItem('chatbotDismissed')) {
      setIsDismissed(true);
    } else {
        const browserLang = navigator.language.split('-')[0];
        if (browserLang === 'hi') {
            setSelectedLanguage('Hindi');
        }

        const welcomeTimer = setTimeout(() => {
            setShowWelcome(true);
            if (popSoundRef.current) {
                popSoundRef.current.volume = 0.5;
                popSoundRef.current.play().catch(e => console.error("Audio play failed:", e));
            }
        }, 1000);
        
        return () => clearTimeout(welcomeTimer);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      setMessages([{ sender: 'bot', text: greetings[selectedLanguage] || greetings['English'] }]);
    }
  }, [isOpen, selectedLanguage]);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  const handlePointerDown = (e: ReactPointerEvent<HTMLButtonElement>) => {
    if (isOpen) return;
    setIsDragging(true);
    setShowCloseTarget(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: ReactPointerEvent<HTMLButtonElement>) => {
    if (isDragging && !isOpen) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };
  
  const handlePointerUp = (e: ReactPointerEvent<HTMLButtonElement>) => {
    if (isOpen) return;
    setIsDragging(false);
    setShowCloseTarget(false);
    e.currentTarget.releasePointerCapture(e.pointerId);

    const closeTarget = document.getElementById('chatbot-close-target');
    if (closeTarget) {
        const targetRect = closeTarget.getBoundingClientRect();
        const pointerRect = e.currentTarget.getBoundingClientRect();

        if (
            pointerRect.left < targetRect.right &&
            pointerRect.right > targetRect.left &&
            pointerRect.top < targetRect.bottom &&
            pointerRect.bottom > targetRect.top
        ) {
            setIsClosing(true);
            setTimeout(() => {
                setIsDismissed(true);
                sessionStorage.setItem('chatbotDismissed', 'true');
            }, 300);
        }
    }
  };

  const handleSendMessage = async () => {
    if (input.trim() === '' || isLoading) return;
    const userMessage: Message = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const result = await aiQuestionAnswering({ question: userMessage.text, language: selectedLanguage });
      const botMessage: Message = { text: result.answer, sender: 'bot' };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Chatbot error:', error);
      const errorMessage = greetings[selectedLanguage] ? `Sorry, I am having trouble connecting in ${selectedLanguage}. Please try again.` : 'Sorry, I am having trouble connecting. Please try again.';
      const botMessage: Message = { text: errorMessage, sender: 'bot' };
       setMessages(prev => [...prev, botMessage]);
       toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'Failed to get a response.',
      });
    } finally {
      setIsLoading(false);
    }
  };


  if (!isClient || isDismissed) {
    return null;
  }

  return (
    <>
      <audio ref={popSoundRef} src="/sounds/pop.mp3" preload="auto"></audio>
      
      {isOpen && (
        <div className="fixed bottom-4 right-4 left-4 sm:bottom-20 sm:right-5 sm:left-auto z-[100]">
           <Card className="w-full max-w-md mx-auto sm:w-[350px] h-[calc(100vh-120px)] sm:h-[500px] shadow-2xl flex flex-col animate-float-in">
              <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex items-center gap-3">
                   <div className="p-2 bg-primary/10 rounded-full">
                     <Bot className="h-6 w-6 text-primary" />
                   </div>
                    <CardTitle className="font-headline text-xl">AI Assistant</CardTitle>
                </div>
                <div className="flex items-center gap-1">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon"><LanguageIcon className="h-5 w-5"/></Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent 
                            align="end" 
                            className="w-[200px]"
                            container={typeof document !== 'undefined' && document.getElementById('chatbot-card-content')}
                        >
                            <ScrollArea className="h-[200px]">
                                {languages.map(lang => (
                                    <DropdownMenuItem key={lang.value} onClick={() => setSelectedLanguage(lang.name)}>
                                        {lang.name}
                                    </DropdownMenuItem>
                                ))}
                            </ScrollArea>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                        <X className="h-5 w-5" />
                    </Button>
                </div>
              </CardHeader>
              <CardContent id="chatbot-card-content" className="flex-1 overflow-hidden p-0 relative">
                <ScrollArea className="h-full p-4" ref={scrollAreaRef}>
                  <div className="space-y-4">
                  {messages.map((msg, index) => (
                    <div key={index} className={cn("flex items-end gap-2", msg.sender === 'user' ? 'justify-end' : 'justify-start')}>
                      {msg.sender === 'bot' && (
                        <Avatar className="h-8 w-8">
                           <AvatarFallback className='bg-primary text-primary-foreground'>AI</AvatarFallback>
                        </Avatar>
                      )}
                      <div className={cn("max-w-[75%] rounded-2xl p-3 text-sm", msg.sender === 'user' ? 'bg-primary text-primary-foreground rounded-br-none' : 'bg-muted rounded-bl-none')}>
                        {msg.text}
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                     <div className="flex items-end gap-2 justify-start">
                        <Avatar className="h-8 w-8"><AvatarFallback className='bg-primary text-primary-foreground'>AI</AvatarFallback></Avatar>
                        <div className="max-w-[75%] rounded-2xl p-3 text-sm bg-muted rounded-bl-none">
                            <div className="flex items-center gap-1.5">
                                <span className="h-2 w-2 rounded-full bg-slate-400 animate-pulse delay-0"></span>
                                <span className="h-2 w-2 rounded-full bg-slate-400 animate-pulse delay-150"></span>
                                <span className="h-2 w-2 rounded-full bg-slate-400 animate-pulse delay-300"></span>
                            </div>
                        </div>
                     </div>
                  )}
                  </div>
                </ScrollArea>
              </CardContent>
              <CardFooter>
                 <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSendMessage();
                    }}
                    className="flex w-full items-center space-x-2"
                    >
                    <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type your message..."
                        disabled={isLoading}
                    />
                    <Button type="submit" size="icon" disabled={isLoading}>
                        <Send className="h-4 w-4" />
                    </Button>
                 </form>
              </CardFooter>
           </Card>
        </div>
      )}

      <div
        className={cn("fixed z-[100] animate-float-in", isClosing && "animate-ping")}
        style={{
          bottom: `${position.y}px`,
          right: `${position.x}px`,
          touchAction: 'none',
          display: isOpen ? 'none' : 'block'
        }}
      >
        <div className="relative">
            {showWelcome && !isDragging && (
                <div className="absolute bottom-full right-0 mb-2 w-max max-w-xs p-3 bg-card text-card-foreground rounded-lg shadow-lg animate-welcome-bubble">
                    <p className="text-sm">👉 {greetings[selectedLanguage] || greetings['English']}</p>
                </div>
            )}
            <Button
                size="icon"
                className="w-16 h-16 rounded-full shadow-2xl"
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerUp}
                onClick={() => !isDragging && setIsOpen(true)}
            >
                <Bot className="h-8 w-8" />
            </Button>
        </div>
      </div>
      
      <div
        id="chatbot-close-target"
        className={cn(
            "fixed bottom-4 left-1/2 -translate-x-1/2 z-[99] flex items-center justify-center w-20 h-20 bg-destructive/20 border-2 border-dashed border-destructive rounded-full transition-all duration-300",
            showCloseTarget ? "scale-100 opacity-100" : "scale-50 opacity-0"
        )}
       >
        <Trash2 className="h-8 w-8 text-destructive" />
      </div>
    </>
  );
}
