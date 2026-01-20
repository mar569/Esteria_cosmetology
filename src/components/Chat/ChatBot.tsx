import { useState, useRef, useEffect } from 'react';
import { useChatAssistant } from '../../hooks/useChatAssistant';
import ChatToggleButton from './ChatToggleButton';
import ChatWindow from './ChatWindow';


const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { messages, isLoading, error, hasConsent, giveConsent, sendMessage, clearMessages } = useChatAssistant();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      if (hasConsent) {
        setTimeout(() => inputRef.current?.focus(), 300);
      }
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          setIsOpen(false);
        }
      };
      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.body.style.overflow = '';
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen, hasConsent]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isLoading) {
      sendMessage(input);
      setInput('');
    }
  };

  const handleActionClick = (action: string) => {
    sendMessage(action);
  };

  return (
    <>
      <ChatToggleButton isOpen={isOpen} onToggle={() => setIsOpen(!isOpen)} />
      <ChatWindow
        isOpen={isOpen}
        hasConsent={hasConsent}
        messages={messages}
        isLoading={isLoading}
        error={error}
        input={input}
        onInputChange={setInput}
        onSubmit={handleSubmit}
        onGiveConsent={giveConsent}
        onClearMessages={clearMessages}
        onActionClick={handleActionClick}
        messagesEndRef={messagesEndRef}
        inputRef={inputRef}
      />
    </>
  );
};

export default ChatBot;