'use client';

import { generateChatResponse } from '@/lib/actions';
import { useEffect, useRef, useState } from 'react';

interface Message {
  text: string;
  sender: 'user' | 'ai' | 'hint';
}

interface ChatbotProps {
  language: string;
}

const whatsappNumber = '491723025501';
const whatsappMessage = encodeURIComponent('Hello! I want to chat about cleaning services.');

const cleaningQuestions_en = [
  'What services do you provide?',
  'How can I schedule a cleaning appointment?',
  'What types of cleaning products do you use?',
  'Do you offer eco-friendly cleaning options?',
  'What is your cancellation or rescheduling policy?',
  'Are your cleaners insured and trained?',
  'Do you supply the cleaning equipment?',
  "Contact us via WhatsApp or Email for more info."
];

const cleaningQuestions_de = [
  'Welche Dienstleistungen bieten Sie an?',
  'Wie kann ich einen Reinigungstermin vereinbaren?',
  'Welche Reinigungsprodukte verwenden Sie?',
  'Bieten Sie umweltfreundliche Reinigungsoptionen an?',
  'Wie lautet Ihre Stornierungs- oder Umbuchungsrichtlinie?',
  'Sind Ihre Reinigungskräfte versichert und geschult?',
  'Stellen Sie die Reinigungsgeräte zur Verfügung?',
  "Kontaktieren Sie uns per WhatsApp oder E-Mail für weitere Informationen."
];

const Chatbot: React.FC<ChatbotProps> = ({ language }) => {
  const cleaningQuestions = language === 'de' ? cleaningQuestions_de : cleaningQuestions_en;
  const [messages, setMessages] = useState<Message[]>([]);
  const [minimized, setMinimized] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const welcomeMessage: Message = {
      text: language === 'de'
        ? '🧽 Hallo! Ich bin dein Reinigungsassistent. Tippe eine der untenstehenden Fragen an.'
        : '🧽 Hello! I am your Cleaning Assistant. Tap one of the hints below.',
      sender: 'ai',
    };
    const hintMessages: Message[] = cleaningQuestions.map((q) => ({
      text: q,
      sender: 'hint',
    }));



    setMessages([welcomeMessage, ...hintMessages]);
  }, [language, cleaningQuestions]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (window.innerWidth <= 640) {
      setMinimized(true);
    }
  }, []);

  const handleQuestionClick = async (question: string) => {
    if (
      question === 'Contact us via WhatsApp or Email for more info.' ||
      question === 'Kontaktieren Sie uns per WhatsApp oder E-Mail für weitere Informationen.'
    ) {
      window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, '_blank');
      return;
    }

    const userMsg: Message = { text: question, sender: 'user' };
    const loadingMsg: Message = { text: language === 'de' ? 'Tippen...' : 'Typing...', sender: 'ai' };

    setMessages((prev) => [
      ...prev.filter((m) => m.sender !== 'hint'),
      userMsg,
      loadingMsg,
    ]);

    try {
      const aiResponse = await generateChatResponse(question);
      const aiMsg: Message = { text: aiResponse, sender: 'ai' };
      const hintMessages: Message[] = cleaningQuestions.map((q) => ({
        text: q,
        sender: 'hint',
      }));

      setMessages((prev) => {
        const withoutHintsOrLoading = prev.filter(
          (m) => m.sender !== 'hint' && m.text !== loadingMsg.text
        );
        return [...withoutHintsOrLoading, aiMsg, ...hintMessages];
      });
    } catch (error) {
      console.error('Error getting AI response:', error);
      setMessages((prev) => [
        ...prev,
        { text: language === 'de' ? 'Fehler: Antwort konnte nicht geladen werden.' : 'Error: Could not get response.', sender: 'ai' }
      ]);
    }
  };

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 flex flex-col bg-white shadow-xl rounded-2xl transition-all duration-300
      ${minimized ? 'w-16 h-16' : 'w-80 sm:w-96 h-[500px]'}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between bg-blue-600 text-white px-3 h-12 rounded-t-2xl">
        <div className="flex items-center space-x-2">
          <i className="fas fa-broom"></i>
          {!minimized && (
            <h2 className="font-semibold text-base truncate">
              {language === 'de' ? 'Reinigungsassistent' : 'Cleaning Assistant'}
            </h2>
          )}
        </div>

        <div className="flex items-center space-x-2">
          {/* WhatsApp */}
          {!minimized && (
            <a
              href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
              className="bg-green-500 p-2 rounded-full hover:bg-green-600 transition"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
            >
              <i className="fab fa-whatsapp"></i>
            </a>
          )}

          {/* Toggle Button */}
          <button
            onClick={() => setMinimized(!minimized)}
            aria-label={minimized ? 'Maximize' : 'Minimize'}
            className="p-1 hover:text-gray-300"
          >
            {minimized ? (
              <i className="fas fa-chevron-up"></i>
            ) : (
              <i className="fas fa-chevron-down"></i>
            )}
          </button>
        </div>
      </div>

      {/* Chat Content */}
      {!minimized && (
        <div className="flex flex-col flex-grow bg-gray-50 p-3 overflow-y-auto space-y-2">
          {messages.map((message, index) =>
            message.sender === 'hint' ? (
              <button
                key={index}
                onClick={() => handleQuestionClick(message.text)}
                className="text-sm px-3 py-1 rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200 transition self-start"
              >
                {message.text}
              </button>
            ) : (
              <div
                key={index}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`px-4 py-2 rounded-2xl shadow text-sm max-w-[75%] ${
                    message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-white text-gray-800'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            )
          )}
          <div ref={chatEndRef} />
        </div>
      )}
    </div>
  );
};

export default Chatbot;
