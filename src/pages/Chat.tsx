
import React, { useState, useRef, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatMessage from "@/components/ChatMessage";
import { cn } from '@/lib/utils';
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

// Define a type for our chat messages
interface Message {
  id: string;
  text: string;
  isAi: boolean;
}

// Initial message from the AI
const initialMessage: Message = {
  id: '0',
  text: "Hello! I'm Lawroom AI, your legal research assistant for Indian law. How can I help you today?",
  isAi: true
};

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      isAi: false
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    try {
      // Get message history excluding the initial greeting for better context
      const messageHistory = messages.length > 1 ? messages : [];
      
      // Call the Supabase edge function
      const { data, error } = await supabase.functions.invoke('legal-ai-chat', {
        body: { 
          userMessage: input, 
          messageHistory: messageHistory 
        },
      });

      if (error) {
        throw new Error(error.message || 'Failed to get response from AI');
      }

      // Add AI response to messages
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.message || "I'm sorry, I couldn't process your request at this time.",
        isAi: true
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error calling AI:', error);
      toast({
        title: "Error",
        description: "Failed to get a response. Please try again later.",
        variant: "destructive",
      });
      
      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm sorry, I encountered an error while processing your request. Please try again later.",
        isAi: true
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow flex flex-col bg-gray-50">
        <div className="container mx-auto px-4 py-6 flex-grow flex flex-col">
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-lawai-primary">Lawroom AI Assistant</h1>
            <p className="text-gray-600">Ask me anything about Indian law</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 md:p-6 flex-grow flex flex-col">
            <div className="flex-grow overflow-y-auto mb-4 space-y-4">
              {messages.map((message) => (
                <ChatMessage 
                  key={message.id} 
                  message={message.text} 
                  isAi={message.isAi} 
                />
              ))}
              
              {isLoading && (
                <ChatMessage 
                  message="" 
                  isAi={true} 
                  isLoading={true} 
                />
              )}
              
              <div ref={messagesEndRef} />
            </div>
            
            <div className="border-t pt-4">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your legal question here..."
                  className="flex-grow"
                  disabled={isLoading}
                />
                <Button 
                  onClick={handleSendMessage} 
                  disabled={!input.trim() || isLoading}
                  className={cn(
                    "bg-lawai-primary hover:bg-lawai-primary/90",
                    (!input.trim() || isLoading) && "opacity-50 cursor-not-allowed"
                  )}
                >
                  <Send size={18} />
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                Powered by Claude AI with expertise in Indian legal information.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Chat;
