import React, { useState, useRef, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import Draggable from "react-draggable";
import { v4 as uuidv4 } from "uuid";

import { themes } from '../themes';
import { MessageListComponent } from '../components/MessageList';
import { InputAreaComponent } from '../components/InputArea';

import Settings, { StreamMode } from "./Settings";
import { Message, Model } from "../types";
import { handleStreamEvent } from "../utils/streamHandler";
import {
  createAssistant,
  createThread,
  getThreadState,
  sendMessage,
} from "../utils/chatApi";
import { ASSISTANT_ID_COOKIE } from "../constants";
import { getCookie, setCookie } from "../utils/cookies";
import { ThreadState } from "@langchain/langgraph-sdk";
// import { GraphInterrupt } from "../Interrupted";

interface ChatInterfaceProps {
  isOpen: boolean;
  onClose: () => void;
  theme?: "light" | "dark";
}

export const ChatInterfaceComponent: React.FC<ChatInterfaceProps> = ({ 
  isOpen, 
  onClose, 
  theme = "light" 
}) => {
//   const [messages, setMessages] = useState<Message[]>([
//     { id: uuidv4(), text: "Hello! How can I assist you today?", sender: "assistant" },
//   ]);
//   const [inputMessage, setInputMessage] = useState("");
  const selectedTheme = themes[theme];

//   const handleSendMessage = () => {
//     if (inputMessage.trim()) {
//       const newMessage: Message = {
//         id: uuidv4(),
//         text: inputMessage,
//         sender: "user"
//       };
//       setMessages([...messages, newMessage]);
//       setInputMessage("");

//       // Simulate assistant response
//       setTimeout(() => {
//         const assistantResponse: Message = {
//           id: uuidv4(),
//           text: "I received your message. How else can I help?",
//           sender: "assistant"
//         };
//         setMessages(prev => [...prev, assistantResponse]);
//       }, 1000);
//     }
//   };

//   const handleKeyPress = (e: React.KeyboardEvent) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       handleSendMessage();
//     }
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//     setInputMessage(e.target.value);
//     e.target.style.height = "auto";
//     e.target.style.height = `${e.target.scrollHeight}px`;
//   };

//   if (!isOpen) return null;

const [messages, setMessages] = useState<Message[]>([]);
  const [threadId, setThreadId] = useState<string | null>(null);
  const [assistantId, setAssistantId] = useState<string | null>(null);
  const [model, setModel] = useState<Model>("gpt-4o-mini" as Model);
  const [streamMode, setStreamMode] = useState<StreamMode>("messages");
  const [userId, setUserId] = useState<string>("");
  const [systemInstructions, setSystemInstructions] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [threadState, setThreadState] =
    useState<ThreadState<Record<string, any>>>();
  const [graphInterrupted, setGraphInterrupted] = useState(false);
  const [allowNullMessage, setAllowNullMessage] = useState(false);

  const messageListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initializeChat = async () => {
      let assistantId = getCookie(ASSISTANT_ID_COOKIE);
      if (!assistantId) {
        const assistant = await createAssistant(
        //   process.env.NEXT_PUBLIC_LANGGRAPH_GRAPH_ID as string
        "agent"
        );
        assistantId = assistant.assistant_id as string;
        setCookie(ASSISTANT_ID_COOKIE, assistantId);
        setAssistantId(assistantId);
      }

      console.log("Assistant ID:", assistantId);
      console.log("-----------------------------create thread and user id");
      const { thread_id } = await createThread();
      setThreadId(thread_id);
      setAssistantId(assistantId);
      setUserId(uuidv4());
    };

    initializeChat();
  }, []);

  useEffect(() => {
    console.log( messages);
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (message: string | null) => {
    const messageId = uuidv4();
    if (message !== null) {
      setMessages([
        ...messages,
        { text: message, sender: "user", id: messageId },
      ]);
    }

    if (!threadId) {
      console.error("Thread ID is not available");
      return;
    }
    if (!assistantId) {
      console.error("Assistant ID is not available");
      return;
    }

    try {
      setIsLoading(true);
      setThreadState(undefined);
      setGraphInterrupted(false);
      setAllowNullMessage(false);
      const response = await sendMessage({
        threadId,
        assistantId,
        message,
        messageId,
        model,
        userId,
        systemInstructions,
        streamMode,
      });

      for await (const chunk of response) {
        handleStreamEvent(chunk, setMessages, streamMode);
      }

      // Fetch the current state of the thread
      const currentState = await getThreadState(threadId);
      setThreadState(currentState);
      if (currentState.next.length) {
        setGraphInterrupted(true);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error streaming messages:", error);
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div
        className="fixed bottom-4 right-4 z-50 w-full max-w-lg"
        aria-modal="true"
        role="dialog"
        aria-label="Chat modal"
      >
        <Draggable
          handle=".handle"
          bounds="parent"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className={`w-full max-w-lg rounded-xl shadow-2xl ${selectedTheme.bg} ${selectedTheme.text}`}
          >
            <div className="handle cursor-move p-4 border-b flex justify-between items-center">
              <h2 className="text-xl font-semibold">Leader bot</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                aria-label="Close chat"
              >
                <IoClose size={24} />
              </button>
            </div>

            <MessageListComponent
              messages={messages}
              theme={selectedTheme}
            />

            <InputAreaComponent
              theme={selectedTheme}
              onSendMessage={handleSendMessage}
            />
          </motion.div>
        </Draggable>
      </div>
    </AnimatePresence>
  );
};

export default ChatInterfaceComponent;