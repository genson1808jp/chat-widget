import React from 'react';
import { motion } from 'framer-motion';
import { Message, Theme } from '../types';

interface MessageComponentProps {
  message: Message;
  theme: Theme;
}

export const MessageComponent: React.FC<MessageComponentProps> = ({ message, theme }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[80%] p-3 rounded-lg ${
          message.sender === "user"
            ? `${theme.user} ml-auto`
            : `${theme.assistant} mr-auto`
        }`}
      >
        <p className="break-words">{message.text}</p>
      </div>
    </motion.div>
  );
};