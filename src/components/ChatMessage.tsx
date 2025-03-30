
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
      <div className={isAi ? "chat-bubble-ai" : "chat-bubble-user"}>
        {isLoading ? (
          <div className="typing-indicator">Thinking</div>
        ) : (
          <div className="whitespace-pre-wrap">{message}</div>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
