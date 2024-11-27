import React, {useState, useEffect} from 'react';
import { motion } from 'framer-motion';
import { Message, Theme } from '../types';
import ReactJson from 'react-json-view'
import Markdown from "react-markdown";



interface MessageComponentProps {
  text?: string;
  rawResponse?: Record<string, any>;
  sender: string;
  theme: Theme
}

export const MessageComponent: React.FC<MessageComponentProps> = ({ text, sender, rawResponse, theme}) => {
  const isBot = sender === "ai";
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  let messageContent: React.ReactNode;
  if (rawResponse) {
    messageContent = (
      <ReactJson
        displayObjectSize={false}
        style={{ backgroundColor: "transparent" }}
        displayDataTypes={false}
        quotesOnKeys={false}
        enableClipboard={false}
        name={false}
        src={rawResponse}
        theme="tomorrow"
      />
    );
  } else {
    messageContent = (
      <>
        {isBot ? <Markdown>{text}</Markdown> : text}
      </>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${sender === "user" ? "justify-end" : "justify-start"}
      mb-4 relative transition-opacity duration-200 ease-in-out ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`max-w-[80%] p-3 rounded-lg ${
          sender === "user"
            ? `${theme.user} ml-auto`
            : `${theme.assistant} mr-auto`
        }`}
      >
        <p className="break-words">{messageContent}</p>
      </div>
    </motion.div>
  );
};