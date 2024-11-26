// import React, { useState, useRef, useEffect, FormEvent } from "react";
// import { IoMdSend } from "react-icons/io";
// import { BsChatDots } from "react-icons/bs";
// import { FaRobot } from "react-icons/fa";
// import { AiOutlineClose } from "react-icons/ai";
// import styles from './ChatModal.module.css';  // Import CSS Module


// interface Message {
//   id: number;
//   text: string;
//   sender: "user" | "assistant";
// }

// const ChatModal: React.FC = () => {
//   const [isOpen, setIsOpen] = useState<boolean>(false);
//   const [messages, setMessages] = useState<Message[]>([
//     { id: 1, text: "Hello! How can I assist you today?", sender: "assistant" },
//   ]);
//   const [newMessage, setNewMessage] = useState<string>("");
//   const [isTyping, setIsTyping] = useState<boolean>(false);
//   const [error, setError] = useState<string>("");

//   const messagesEndRef = useRef<HTMLDivElement | null>(null);
//   const chatContainerRef = useRef<HTMLDivElement | null>(null);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const handleSubmit = async (e: FormEvent) => {
//     e.preventDefault();
//     if (!newMessage.trim()) {
//       setError("Please enter a message");
//       return;
//     }
//     setError("");

//     const userMessage: Message = {
//       id: messages.length + 1,
//       text: newMessage,
//       sender: "user",
//     };

//     setMessages((prev) => [...prev, userMessage]);
//     setNewMessage("");
//     setIsTyping(true);

//     // Simulate assistant response
//     setTimeout(() => {
//       const assistantMessage: Message = {
//         id: messages.length + 2,
//         text: "Thank you for your message! I'm processing your request.",
//         sender: "assistant",
//       };
//       setMessages((prev) => [...prev, assistantMessage]);
//       setIsTyping(false);
//     }, 1500);
//   };

  
//   return (
//     <div className={styles.chatModal}>
//       {/* Chat Button */}
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className={styles.chatButton}
//         aria-label="Toggle chat modal"
//       >
//         {isOpen ? <AiOutlineClose size={24} /> : <BsChatDots size={24} />}
//       </button>

//       {/* Chat Modal */}
//       {isOpen && (
//         <div className={`${styles.chatModal} fixed bottom-20 right-4 w-[350px] md:w-[400px] bg-white rounded-lg shadow-xl border border-gray-200 transition-all duration-300 ease-in-out`} role="dialog" aria-modal="true">
//           {/* Header */}
//           <div className={styles.modalHeader}>
//             <FaRobot className="text-xl" />
//             <h2 className="font-semibold">Assistant Chat</h2>
//           </div>

//           {/* Messages Container */}
//           <div
//             ref={chatContainerRef}
//             className={styles.modalBody}
//           >
//             {messages.map((message) => (
//               <div
//                 key={message.id}
//                 className={`mb-4 flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
//               >
//                 <div
//                   className={`max-w-[80%] p-3 rounded-lg ${message.sender === "user" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-800"}`}
//                 >
//                   {message.text}
//                 </div>
//               </div>
//             ))}
//             {isTyping && (
//               <div className="flex items-center space-x-2 text-gray-500">
//                 <div className="typing-indicator">
//                   <span className="dot"></span>
//                   <span className="dot"></span>
//                   <span className="dot"></span>
//                 </div>
//               </div>
//             )}
//             <div ref={messagesEndRef} />
//           </div>

//           {/* Error Message */}
//           {error && (
//             <div className={styles.errorMessage}>{error}</div>
//           )}

//           {/* Input Form */}
//           <form onSubmit={handleSubmit} className={styles.inputForm}>
//             <div className="flex space-x-2">
//               <input
//                 type="text"
//                 value={newMessage}
//                 onChange={(e) => setNewMessage(e.target.value)}
//                 placeholder="Type your message..."
//                 className={styles.inputField}
//                 aria-label="Message input"
//               />
//               <button
//                 type="submit"
//                 className={styles.sendButton}
//                 aria-label="Send message"
//               >
//                 <IoMdSend />
//               </button>
//             </div>
//           </form>
//         </div>
//       )}
//     </div>
//   );
// };
// export default ChatModal;

// import React, { useState, useEffect, useRef, ChangeEvent, KeyboardEvent } from "react";
// import { AnimatePresence, motion } from "framer-motion";
// import Draggable from "react-draggable";
// import { IoClose } from "react-icons/io5";
// import { FiSend } from "react-icons/fi";

// interface ChatModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   theme?: "light" | "dark";
// }

// interface Message {
//   id: number;
//   text: string;
//   sender: "user" | "assistant";
// }

// const ChatModal: React.FC<ChatModalProps> = ({ isOpen, onClose, theme = "light" }) => {
//   const [messages, setMessages] = useState<Message[]>([
//     { id: 1, text: "Hello! How can I assist you today?", sender: "assistant" },
//   ]);
//   const [inputMessage, setInputMessage] = useState("");
//   const [isDragging, setIsDragging] = useState(false);

//   const chatContainerRef = useRef<HTMLDivElement>(null);
//   const inputRef = useRef<HTMLTextAreaElement>(null);

//   const themes = {
//     light: {
//       bg: "bg-white",
//       text: "text-gray-800",
//       input: "bg-gray-100",
//       assistant: "bg-blue-100",
//       user: "bg-green-100",
//     },
//     dark: {
//       bg: "bg-gray-800",
//       text: "text-white",
//       input: "bg-gray-700",
//       assistant: "bg-blue-900",
//       user: "bg-green-900",
//     },
//   };

//   useEffect(() => {
//     if (chatContainerRef.current) {
//       chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
//     }
//   }, [messages]);

//   const handleSendMessage = () => {
//     if (inputMessage.trim()) {
//       const newMessage: Message = {
//         id: messages.length + 1,
//         text: inputMessage.trim(),
//         sender: "user",
//       };
//       setMessages([...messages, newMessage]);
//       setInputMessage("");

//       // Simulate assistant response
//       setTimeout(() => {
//         const assistantResponse: Message = {
//           id: messages.length + 2,
//           text: "I received your message. How else can I help?",
//           sender: "assistant",
//         };
//         setMessages((prev) => [...prev, assistantResponse]);
//       }, 1000);
//     }
//   };

//   const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       handleSendMessage();
//     }
//   };

//   const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
//     setInputMessage(e.target.value);
//     const target = e.target as HTMLTextAreaElement;
//     target.style.height = "auto";
//     target.style.height = `${target.scrollHeight}px`;
//   };

//   if (!isOpen) return null;

//   return (
//     <AnimatePresence>
//       <div
//         className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
//         aria-modal="true"
//         role="dialog"
//         aria-label="Chat modal"
//       >
//         <Draggable
//           handle=".handle"
//           onStart={() => setIsDragging(true)}
//           onStop={() => setIsDragging(false)}
//         >
//           <motion.div
//             initial={{ scale: 0.9, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             exit={{ scale: 0.9, opacity: 0 }}
//             className={`w-full max-w-lg rounded-xl shadow-2xl ${themes[theme].bg} ${themes[theme].text}`}
//           >
//             {/* Header */}
//             <div className="handle cursor-move p-4 border-b flex justify-between items-center">
//               <h2 className="text-xl font-semibold">Chat Assistant</h2>
//               <button
//                 onClick={onClose}
//                 className="p-2 hover:bg-gray-200 rounded-full transition-colors"
//                 aria-label="Close chat"
//               >
//                 <IoClose size={24} />
//               </button>
//             </div>

//             {/* Messages */}
//             <div
//               ref={chatContainerRef}
//               className="h-96 overflow-y-auto p-4 space-y-4"
//             >
//               {messages.map((message) => (
//                 <motion.div
//                   key={message.id}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
//                 >
//                   <div
//                     className={`max-w-[80%] p-3 rounded-lg ${
//                       message.sender === "user"
//                         ? `${themes[theme].user} ml-auto`
//                         : `${themes[theme].assistant} mr-auto`
//                     }`}
//                   >
//                     <p className="break-words">{message.text}</p>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>

//             {/* Input */}
//             <div className="p-4 border-t">
//               <div className="flex items-end space-x-2">
//                 <textarea
//                   ref={inputRef}
//                   value={inputMessage}
//                   onChange={handleInputChange}
//                   onKeyPress={handleKeyPress}
//                   placeholder="Type your message..."
//                   className={`flex-1 p-2 rounded-lg resize-none max-h-32 ${themes[theme].input}`}
//                   rows={1}
//                   aria-label="Message input"
//                 />
//                 <button
//                   onClick={handleSendMessage}
//                   className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
//                   aria-label="Send message"
//                 >
//                   <FiSend size={20} />
//                 </button>
//               </div>
//             </div>
//           </motion.div>
//         </Draggable>
//       </div>
//     </AnimatePresence>
//   );
// };

// export default ChatModal;

// import React, { useState } from 'react';

// const ChatModal: React.FC = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [messages, setMessages] = useState<string[]>([]);
//   const [inputMessage, setInputMessage] = useState('');

//   const handleSendMessage = () => {
//     if (inputMessage.trim()) {
//       setMessages([...messages, inputMessage]);
//       setInputMessage('');
      
//       // Simulate an assistant response after a short delay
//       setTimeout(() => {
//         setMessages([...messages, 'Assistant: How can I help you?']);
//       }, 1000);
//     }
//   };

//   return (
//     <div>
//       <button
//         className="bg-blue-500 text-white px-4 py-2 rounded"
//         onClick={() => setIsModalOpen(true)}
//       >
//         Open Chat
//       </button>

//       {isModalOpen && (
//         <div 
//           className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 ${
//             isModalOpen ? 'transition-opacity duration-300 opacity-100' : 'opacity-0'
//           }`}
//         >
//           <div 
//             className={`bg-white p-6 rounded-lg w-full max-w-md ${
//               isModalOpen ? 'transition-transform duration-300 transform translate-y-0' : 'transform -translate-y-1/2 opacity-0'
//             }`}
//           >
//             <h2 className="text-xl font-bold mb-4">Chat Assistant</h2>
//             <div className="overflow-y-auto h-64 border-b mb-4">
//               {messages.map((message, index) => (
//                 <p key={index} className="mb-2 text-gray-700">{message}</p>
//               ))}
//             </div>
//             <input
//               type="text"
//               value={inputMessage}
//               onChange={(e) => setInputMessage(e.target.value)}
//               placeholder="Type a message..."
//               className="w-full p-2 rounded border focus:outline-none focus:border-blue-500"
//             />
//             <button
//               className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
//               onClick={handleSendMessage}
//             >
//               Send
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ChatModal;

// import React, { useState, useRef, useEffect } from "react";
// import { IoClose } from "react-icons/io5";
// import { FiSend } from "react-icons/fi";
// import { motion, AnimatePresence } from "framer-motion";
// import Draggable from "react-draggable";

// interface ChatModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   theme?: "light" | "dark";
// }

// interface Message {
//   id: number;
//   text: string;
//   sender: "user" | "assistant";
// }

// const ChatModal: React.FC<ChatModalProps> = ({ isOpen, onClose, theme = "light" }) => {
//   const [messages, setMessages] = useState<Message[]>([
//     { id: 1, text: "Hello! How can I assist you today?", sender: "assistant" },
//   ]);
//   const [inputMessage, setInputMessage] = useState<string>("");
//   const [isDragging, setIsDragging] = useState<boolean>(false);
//   const chatContainerRef = useRef<HTMLDivElement | null>(null);
//   const inputRef = useRef<HTMLTextAreaElement | null>(null);

//   const themes = {
//     light: {
//       bg: "bg-white",
//       text: "text-gray-800",
//       input: "bg-gray-100",
//       assistant: "bg-blue-100",
//       user: "bg-green-100",
//     },
//     dark: {
//       bg: "bg-gray-800",
//       text: "text-white",
//       input: "bg-gray-700",
//       assistant: "bg-blue-900",
//       user: "bg-green-900",
//     },
//   };

//   useEffect(() => {
//     if (chatContainerRef.current) {
//       chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
//     }
//   }, [messages]);

//   const handleSendMessage = () => {
//     if (inputMessage.trim()) {
//       const newMessage: Message = {
//         id: messages.length + 1,
//         text: inputMessage,
//         sender: "user",
//       };
//       setMessages((prev) => [...prev, newMessage]);
//       setInputMessage("");

//       // Simulate assistant response
//       setTimeout(() => {
//         const assistantResponse: Message = {
//           id: messages.length + 2,
//           text: "I received your message. How else can I help?",
//           sender: "assistant",
//         };
//         setMessages((prev) => [...prev, assistantResponse]);
//       }, 1000);
//     }
//   };

//   const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       handleSendMessage();
//     }
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
//     setInputMessage(e.target.value);
//     if (e.target.style) {
//       e.target.style.height = "auto";
//       e.target.style.height = `${e.target.scrollHeight}px`;
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <AnimatePresence>
//       <div
//         className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
//         aria-modal="true"
//         role="dialog"
//         aria-label="Chat modal"
//       >
//         <Draggable
//           handle=".handle"
//           onStart={() => setIsDragging(true)}
//           onStop={() => setIsDragging(false)}
//         >
//           <motion.div
//             initial={{ scale: 0.9, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             exit={{ scale: 0.9, opacity: 0 }}
//             className={`w-full max-w-lg rounded-xl shadow-2xl ${themes[theme].bg} ${themes[theme].text}`}
//           >
//             <div className="handle cursor-move p-4 border-b flex justify-between items-center">
//               <h2 className="text-xl font-semibold">Chat Assistant</h2>
//               <button
//                 onClick={onClose}
//                 className="p-2 hover:bg-gray-200 rounded-full transition-colors"
//                 aria-label="Close chat"
//               >
//                 <IoClose size={24} />
//               </button>
//             </div>

//             <div
//               ref={chatContainerRef}
//               className="h-96 overflow-y-auto p-4 space-y-4"
//             >
//               {messages.map((message) => (
//                 <motion.div
//                   key={message.id}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
//                 >
//                   <div
//                     className={`max-w-[80%] p-3 rounded-lg ${
//                       message.sender === "user"
//                         ? `${themes[theme].user} ml-auto`
//                         : `${themes[theme].assistant} mr-auto`
//                     }`}
//                   >
//                     <p className="break-words">{message.text}</p>
//                   </div>
//                 </motion.div>
//               ))}
//             </div>

//             <div className="p-4 border-t">
//               <div className="flex items-end space-x-2">
//                 <textarea
//                   ref={inputRef}
//                   value={inputMessage}
//                   onChange={handleInputChange}
//                   onKeyPress={handleKeyPress}
//                   placeholder="Type your message..."
//                   className={`flex-1 p-2 rounded-lg resize-none max-h-32 ${themes[theme].input}`}
//                   rows={1}
//                   aria-label="Message input"
//                 />
//                 <button
//                   onClick={handleSendMessage}
//                   className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
//                   aria-label="Send message"
//                 >
//                   <FiSend size={20} />
//                 </button>
//               </div>
//             </div>
//           </motion.div>
//         </Draggable>
//       </div>
//     </AnimatePresence>
//   );
// };

// export default ChatModal;



import React, { useState, useRef, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { FiSend } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import Draggable from "react-draggable";

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme?: "light" | "dark";
}

const ChatModal: React.FC<ChatModalProps> = ({ isOpen, onClose, theme = "light" }) => {
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! How can I assist you today?", sender: "assistant" },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  const themes = {
    light: {
      bg: "bg-white",
      text: "text-gray-800",
      input: "bg-gray-100",
      assistant: "bg-blue-100",
      user: "bg-green-100"
    },
    dark: {
      bg: "bg-gray-800",
      text: "text-white",
      input: "bg-gray-700",
      assistant: "bg-blue-900",
      user: "bg-green-900"
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: inputMessage,
        sender: "user"
      };
      setMessages([...messages, newMessage]);
      setInputMessage("");

      // Simulate assistant response
      setTimeout(() => {
        const assistantResponse = {
          id: messages.length + 2,
          text: "I received your message. How else can I help?",
          sender: "assistant"
        };
        setMessages(prev => [...prev, assistantResponse]);
      }, 1000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputMessage(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  if (!isOpen) return null;

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
            className={`w-full max-w-lg rounded-xl shadow-2xl ${themes[theme].bg} ${themes[theme].text}`}
          >
            <div className="handle cursor-move p-4 border-b flex justify-between items-center">
              <h2 className="text-xl font-semibold">Chat Assistant</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-200 rounded-full transition-colors"
                aria-label="Close chat"
              >
                <IoClose size={24} />
              </button>
            </div>

            <div
              ref={chatContainerRef}
              className="h-96 overflow-y-auto p-4 space-y-4"
            >
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.sender === "user"
                        ? `${themes[theme].user} ml-auto`
                        : `${themes[theme].assistant} mr-auto`
                    }`}
                  >
                    <p className="break-words">{message.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="p-4 border-t">
              <div className="flex items-end space-x-2">
                <textarea
                  ref={inputRef}
                  value={inputMessage}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  className={`flex-1 p-2 rounded-lg resize-none max-h-32 ${themes[theme].input}`}
                  rows={1}
                  aria-label="Message input"
                />
                <button
                  onClick={handleSendMessage}
                  className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  aria-label="Send message"
                >
                  <FiSend size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        </Draggable>
      </div>
    </AnimatePresence>
  );
};

export default ChatModal;
