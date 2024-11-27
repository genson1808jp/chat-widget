import React, { useRef, useState } from 'react';
import { FiSend } from "react-icons/fi";
import { Theme} from '../types';

interface InputAreaComponentProps {
  theme: Theme;
  onSendMessage: (message: string) => void;
}

export const InputAreaComponent: React.FC<InputAreaComponentProps> = ({
  theme,
  onSendMessage,
}) => {
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const [input, setInput] = useState("");

    const handleSubmit = () => {
        if (input.trim()) {
        onSendMessage(input);
        setInput("");
        }
  };

  return (
    <div className="p-4 border-t">
      <div className="flex items-end space-x-2">
        <textarea
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className={`flex-1 p-2 rounded-lg resize-none max-h-32 ${theme.input}`}
          rows={1}
          aria-label="Message input"
        />
        <button
          onClick={handleSubmit}
          className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          aria-label="Send message"
        >
          <FiSend size={20} />
        </button>
      </div>
    </div>
  );
};
