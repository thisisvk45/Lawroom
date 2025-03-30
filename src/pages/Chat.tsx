
import React, { useState, useRef, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ChatMessage from "@/components/ChatMessage";
import { cn } from '@/lib/utils';
import { useToast } from "@/components/ui/use-toast";

// Define a type for our chat messages
interface Message {
  id: string;
  text: string;
  isAi: boolean;
}

// Sample initial message from the AI
const initialMessage: Message = {
  id: '0',
  text: "Hello! I'm Lawroom AI, your legal research assistant for Indian law. How can I help you today?",
  isAi: true
};

// Sample responses for demo purposes
const sampleResponses: Record<string, string> = {
  "hello": "Hello! How can I assist you with Indian law today?",
  "hi": "Hi there! What legal questions do you have about Indian law?",
  "what is a pil": "Public Interest Litigation (PIL) in India is a legal mechanism that allows any individual or organization to approach the Supreme Court or High Courts for the protection of public interest. It was introduced in the 1980s and has been instrumental in enforcing the rights of marginalized sections and addressing various social issues.\n\nKey features of PIL in India:\n\n1. Relaxed locus standi: Anyone can file a PIL for public interest, not just the aggrieved party.\n\n2. Legal basis: PILs can be filed under Article 32 (Supreme Court) or Article 226 (High Courts) of the Indian Constitution.\n\n3. Simple procedure: Even a letter addressed to the court can be treated as a PIL if it highlights a significant public issue.\n\n4. Wide range of issues: PILs have been used to address environmental concerns, human rights violations, corruption, and other public interest matters.\n\nLandmark PIL cases include M.C. Mehta v. Union of India (environmental protection), Vishaka v. State of Rajasthan (sexual harassment at workplace), and Hussainara Khatoon v. State of Bihar (speedy trials and undertrial prisoners).",
  "ipc section 302": "IPC Section 302 deals with punishment for murder under the Indian Penal Code, 1860.\n\nKey elements:\n\n1. Definition: Whoever commits murder shall be punished with death, or imprisonment for life, and shall also be liable to fine.\n\n2. Essential ingredients to constitute murder under Section 302:\n   - The death of the person in question must have occurred\n   - This death must have been caused by the accused\n   - The causing of death must amount to culpable homicide amounting to murder as defined in Section 300 IPC\n\n3. Punishment: Death penalty or life imprisonment, plus fine.\n\n4. Burden of proof: The prosecution must prove beyond reasonable doubt that the accused committed the murder.\n\n5. Recent jurisprudence: Courts typically consider factors like premeditation, brutality, and circumstances of the crime when deciding between death penalty and life imprisonment.\n\nImportant case law: Bachan Singh v. State of Punjab (1980) established that death penalty should be given only in the 'rarest of rare' cases.",
  "contract law in india": "Contract law in India is primarily governed by the Indian Contract Act, 1872. Here's a summary of key aspects:\n\n1. Definition: Section 2(h) defines a contract as an agreement enforceable by law.\n\n2. Essential elements of a valid contract:\n   - Offer and acceptance\n   - Intention to create legal relations\n   - Lawful consideration\n   - Capacity of parties (age of majority, sound mind)\n   - Free consent (without coercion, undue influence, fraud, misrepresentation, or mistake)\n   - Lawful object\n   - Certainty and possibility of performance\n   - Not expressly declared void\n\n3. Types of contracts:\n   - Express and Implied contracts\n   - Void, Voidable, and Valid contracts\n   - Unilateral and Bilateral contracts\n   - Executed and Executory contracts\n\n4. Remedies for breach:\n   - Damages (ordinary, special, exemplary, or nominal)\n   - Specific performance\n   - Injunction\n   - Quantum meruit\n\n5. Recent developments:\n   - Recognition of electronic contracts under the Information Technology Act, 2000\n   - Increasing emphasis on consumer protection in contractual relationships\n\nKey case: Carlill v. Carbolic Smoke Ball Co. (though a UK case, it's frequently cited in Indian courts regarding offer and acceptance).",
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
    
    // In a real app, this would be an API call to your backend
    // For demo purposes, we'll use a setTimeout with sample responses
    setTimeout(() => {
      const normalizedInput = input.toLowerCase().trim();
      
      // Find a matching response or use default
      let responseText = "I'm sorry, I don't have specific information on that topic yet. In a production environment, I would connect to a comprehensive database of Indian legal information to provide you with accurate answers.";
      
      // Check for partial matches in our sample responses
      for (const key in sampleResponses) {
        if (normalizedInput.includes(key) || key.includes(normalizedInput)) {
          responseText = sampleResponses[key];
          break;
        }
      }
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        isAi: true
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1500);
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
                This is a demo version. In a production environment, responses would be based on comprehensive Indian legal data.
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
