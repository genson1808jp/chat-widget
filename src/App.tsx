import { useEffect, useState } from 'react';
import "react-chat-widget/lib/styles.css";
import ChatbotModal from './components/ChatbotModal';
import { DomainProtectedWidget } from './components/Protect';

// function App() {
//   useEffect(() => {
//     addResponseMessage("Welcome to our chatbot!");
//   }, []);

//   const handleNewUserMessage = (newMessage: string) => {
//   };
//   const [isChatOpen, setIsChatOpen] = useState(false);

//   const [theme, setTheme] = useState<"light" | "dark">("light"); // Theme cho modal
//   const handleOpenChat = () => {
//     setIsChatOpen(true);
//   };

//   const handleCloseChat = () => {
//     setIsChatOpen(false);
//   };

//   const toggleTheme = () => {
//     setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
//   };

//   return (
//     <div className={`min-h-screen flex flex-col items-center justify-center ${theme === "light" ? "bg-gray-100" : "bg-gray-900"} transition-colors`}>
//       <h1 className={`text-2xl font-bold mb-4 ${theme === "light" ? "text-gray-800" : "text-white"}`}>
//         Chat Assistant Example
//       </h1>
//       <div className="space-x-4">
//         <button
//           onClick={() => setIsChatOpen(true)}
//           className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
//         >
//           Open Chat
//         </button>
//         <button
//           onClick={toggleTheme}
//           className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
//         >
//           Toggle Theme
//         </button>
//       </div>

//       {/* ChatModal */}
//       <ChatModal
//         isOpen={isChatOpen}
//         onClose={() => setIsChatOpen(false)}
//         theme={theme}
//       />
//     </div>
//   );
// }

const App: React.FC = () => {
  return (
    <div className="relative">
          <h1>Chat with StreamChat</h1>
      {/* <ChatInterface /> */}
      <ChatbotModal/>
      {/* <DomainProtectedWidget>
        <ChatbotModal />
      </DomainProtectedWidget> */}
    </div>
  );
};

export default App;
