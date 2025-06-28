'use client';

import { useEffect, useState } from 'react';
import { generateChatResponse } from '@/lib/actions';

interface Message {
  text: string;
  sender: 'user' | 'ai';
}

const cleaningQuestions = [
  'What services do you offer?',
  'How can I book a cleaning?',
  'What areas do you cover?',
  'What are your prices?',
  'How does your cleaning process work?',
];

export const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  // Show welcome message on first render
  useEffect(() => {
    const welcomeMessage: Message = {
      text: 'Hello! I am your Cleaning Assistant. How can I help you today? Please choose one of the questions below.',
      sender: 'ai',
    };
    setMessages([welcomeMessage]);
  }, []);

  const handleQuestionClick = async (question: string) => {
    const newUserMessage: Message = { text: question, sender: 'user' };
    setMessages((prev) => [...prev, newUserMessage]);

    try {
      const aiResponse = await generateChatResponse(question);
      const newAiMessage: Message = { text: aiResponse, sender: 'ai' };
      setMessages((prev) => [...prev, newAiMessage]);
    } catch (error) {
      console.error('Error generating chat response:', error);
      const errorMessage: Message = { text: 'Error: Could not get response.', sender: 'ai' };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  return (
    <div className="flex flex-col h-96 border rounded-md">
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg ${
                message.sender === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-300 text-black'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t p-4 flex flex-col space-y-2">
        {cleaningQuestions.map((question) => (
          <button
            key={question}
            onClick={() => handleQuestionClick(question)}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-left"
          >
            {question}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Chatbot;
