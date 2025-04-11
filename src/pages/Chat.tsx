import React, { useState, useRef, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, AlertCircle, Menu, Plus, Trash, Edit, Mic } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatMessage from "@/components/ChatMessage";
import { cn } from '@/lib/utils';
import { useToast } from "@/components/ui/use-toast";

interface Message {
  id: string;
  text: string;
  isAi: boolean;
}

interface Chat {
  name: string;
  messages: Message[];
}

const initialMessage: Message = {
  id: '0',
  text: "Hello! I'm Lawroom AI, your legal research assistant for Indian law. How can I help you today?",
  isAi: true
};

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([initialMessage]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [serviceError, setServiceError] = useState<string | null>(null);
  const [showHistory, setShowHistory] = useState(false);
  const [chatHistory, setChatHistory] = useState<Chat[]>([]);
  const [editingChatIndex, setEditingChatIndex] = useState<number | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [lastMicUse, setLastMicUse] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  // New state for toggling sidebar
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-IN';

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsRecording(false);
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
    } else {
      console.warn('Speech recognition not supported in this browser.');
    }
  }, []);

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const startRecording = () => {
    const now = Date.now();
    if (lastMicUse && now - lastMicUse < 5 * 60 * 1000) {
      toast({
        title: "Limit Reached",
        description: "You can use the microphone once every 5 minutes. For more usage, join the waitlist for premium features.",
        variant: "warning"
      });
      return;
    }

    if (recognitionRef.current) {
      recognitionRef.current.start();
      setIsRecording(true);
      setLastMicUse(now);
    }
  };

  useEffect(() => {
    const savedChats = localStorage.getItem('chatHistory');
    if (savedChats) {
      setChatHistory(JSON.parse(savedChats));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('chatHistory', JSON.stringify(chatHistory));
  }, [chatHistory]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    setServiceError(null);
    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      isAi: false
    };

    setMessages(prev => {
      const updatedMessages = [...prev.slice(-4), userMessage];
      return updatedMessages;
    });

    setInput('');
    setIsLoading(true);

    try {
      const messageHistory = messages.slice(-4);

      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer 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`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "gpt-4",
          messages: [
            {
              role: "system",
              content: `You are an AI legal assistant with deep knowledge of Indian law.`
            },
            ...messageHistory.map(msg => ({
              role: msg.isAi ? "assistant" : "user",
              content: msg.text
            })),
            { role: "user", content: input }
          ]
        })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error?.message || "API request failed");

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.choices[0]?.message?.content || "I'm sorry, I couldn't process your request.",
        isAi: true
      };

      setMessages(prev => [...prev.slice(-4), aiMessage]);
    } catch (error) {
      console.error('Error calling OpenAI:', error);
      setServiceError("The AI service is currently unavailable. Please try again later.");
      toast({ title: "Error", description: "Failed to get a response.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleJoinWaitlist = () => {
    window.open('https://docs.google.com/forms/d/e/1FAIpQLSfSnAmUVJ3jtttdMsXjRUNhMHh3t8OYoZ5ttiPKZQvC-xoacg/viewform?usp=sharing', '_blank');
  };

  const handleNewChat = () => {
    setChatHistory(prev => [...prev, { name: `Chat ${prev.length + 1}`, messages }]);
    setMessages([initialMessage]);
  };

  const toggleHistory = () => {
    setShowHistory(!showHistory);
  };

  const handleRenameChat = (index: number, newName: string) => {
    setChatHistory(prev => {
      const updatedChats = [...prev];
      updatedChats[index].name = newName;
      return updatedChats;
    });
    setEditingChatIndex(null);
  };

  const handleDeleteChat = (index: number) => {
    setChatHistory(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className={`bg-gray-100 p-4 ${isSidebarOpen ? 'w-64' : 'w-16'} transition-all duration-300`}>
        <div className="flex flex-col items-center">
          <Button onClick={handleNewChat} className="mb-2">
            <Plus size={18} />
          </Button>
          <Button onClick={toggleSidebar} className="mb-2">
            <Menu size={18} />
          </Button>
        </div>
        {isSidebarOpen && (
          <div>
            <h2 className="text-lg font-bold mb-2">Chat History</h2>
            <ul>
              {chatHistory.map((chat, index) => (
                <li key={index} className="mb-2 flex items-center">
                  {editingChatIndex === index ? (
                    <input
                      type="text"
                      defaultValue={chat.name}
                      onBlur={(e) => handleRenameChat(index, e.target.value)}
                      className="flex-grow mr-2"
                    />
                  ) : (
                    <span className="flex-grow" onClick={() => setMessages(chat.messages)}>
                      {chat.name}
                    </span>
                  )}
                  <Button onClick={() => setEditingChatIndex(index)} className="mr-2">
                    <Edit size={16} />
                  </Button>
                  <Button onClick={() => handleDeleteChat(index)}>
                    <Trash size={16} />
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="flex-grow flex flex-col bg-gray-50">
        <Header />
        
        <main className="flex-grow flex flex-col">
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

                {serviceError && (
                  <div className="flex justify-center my-4">
                    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-start max-w-[80%]">
                      <AlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Service Unavailable</p>
                        <p className="text-sm">{serviceError}</p>
                      </div>
                    </div>
                  </div>
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
                    )}>
                    <Send size={18} />
                  </Button>
                  <Button 
                    onClick={startRecording} 
                    disabled={isRecording || (lastMicUse && Date.now() - lastMicUse < 5 * 60 * 1000)}
                    className={cn(
                      "bg-lawai-primary hover:bg-lawai-primary/90",
                      (isRecording || (lastMicUse && Date.now() - lastMicUse < 5 * 60 * 1000)) && "opacity-50 cursor-not-allowed"
                    )}>
                    <Mic size={18} />
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Disclaimer: Lawroom AI provides informational assistance and is not a substitute for professional legal advice, always consult a qualified lawyer for specific legal issues.
                </p>
              </div>

              <div className="mt-6 text-center">
                <Button onClick={handleJoinWaitlist} className="bg-lawai-primary hover:bg-lawai-primary/90">
                  Join the Waitlist for Premium Features
                </Button>
              </div>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </div>
  );
};

export default Chat;
