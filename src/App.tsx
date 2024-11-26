import { useEffect } from 'react';
import { Widget, addResponseMessage } from "react-chat-widget";
import "react-chat-widget/lib/styles.css";

function App() {
  useEffect(() => {
    addResponseMessage("Welcome to our chatbot!");
  }, []);

  const handleNewUserMessage = (newMessage: string) => {
  };

  return (
    <Widget
      handleNewUserMessage={handleNewUserMessage}
      title="Chatbot Widget"
      subtitle="How can we help you?"
    />
  );
}

export default App;
