import React, { useRef, useEffect } from 'react';
import { Message, Theme } from '../types';
import { MessageComponent } from '../components/Message';

interface MessageListComponentProps {
  messages: Message[];
  theme: Theme;
}

export const MessageListComponent: React.FC<MessageListComponentProps> = ({ messages, theme }) => {
  const chatContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div 
      ref={chatContainerRef}
      className={`
        h-96 
        overflow-y-scroll 
        scrollbar-hide 
        scroll-smooth 
        p-4 
        space-y-4
        ${theme.bg}
      `}
      style={{
        scrollbarWidth: 'none', // For Firefox
        msOverflowStyle: 'none', // For Internet Explorer and Edge
      }}
    >
      {messages.map((message) => (
        <MessageComponent 
          rawResponse={message.rawResponse}
          sender={message.sender}
          text={message.text}
          key={message.id} 
          theme={theme} 
        />
      ))}
    </div>
  );
};