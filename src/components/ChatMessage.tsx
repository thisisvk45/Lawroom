
import React from 'react';
import { cn } from '@/lib/utils';

interface ChatMessageProps {
  message: string;
  isAi: boolean;
  isLoading?: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isAi, isLoading = false }) => {
  return (
    <div className={cn("flex", isAi ? "justify-start" : "justify-end", "mb-4")}>
      <div 
        className={cn(
          "max-w-[80%] md:max-w-[70%] lg:max-w-[60%] rounded-lg p-3",
          isAi 
            ? "bg-gray-100 text-gray-800 rounded-bl-none" 
            : "bg-lawai-primary text-white rounded-br-none"
        )}
      >
        {isLoading ? (
          <div className="flex items-center space-x-1">
            <div>Thinking</div>
            <span className="animate-bounce">.</span>
            <span className="animate-bounce animation-delay-200">.</span>
            <span className="animate-bounce animation-delay-400">.</span>
          </div>
        ) : (
          <div className="whitespace-pre-wrap">{message}</div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
