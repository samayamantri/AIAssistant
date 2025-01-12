import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Message } from '../types';

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleInputChange = (value: string) => {
    setInput(value);
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { text: userMessage, sender: 'user' }]);
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/chat', {
        message: userMessage
      });

      setMessages(prev => [...prev, { 
        text: response.data.response, 
        sender: 'assistant' 
      }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { 
        text: 'Sorry, there was an error processing your message.', 
        sender: 'assistant' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    input,
    isLoading,
    messagesEndRef,
    handleInputChange,
    handleSend
  };
}; 