import { useState, useRef, useCallback, useEffect } from 'react';
import { ErrorResponse, Message } from '../types.ts/types';

const CHAT_URL = `${
  import.meta.env.VITE_SUPABASE_URL
}/functions/v1/chat-assistant`;
const MAX_MESSAGE_LENGTH = 500;
const RATE_LIMIT_DELAY = 5000;

const personalDataPatterns = [
  /\+?[78]\s*\$?\d{3}\$?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}/g,
  /\b[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\b/g,
  /\b(?:меня зовут|мое имя|я\s+[-]?\s*)([а-яА-ЯёЁa-zA-Z]+)\b/gi,
  /\b\d{4}\s\d{6}\b/g,
];

const containsPersonalData = (text: string): boolean => {
  return personalDataPatterns.some((pattern) => pattern.test(text));
};

export const useChatAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasConsent, setHasConsent] = useState(false);
  const messagesRef = useRef<Message[]>([]);
  const lastSendTimeRef = useRef<number>(0);

  const giveConsent = useCallback(() => {
    setHasConsent(true);
  }, []);

  const sendMessage = useCallback(
    async (input: string) => {
      if (!input.trim() || isLoading) return;

      if (!navigator.onLine) {
        setError('Нет подключения к интернету.');
        return;
      }

      if (input.length > MAX_MESSAGE_LENGTH) {
        setError(
          `Сообщение слишком длинное. Максимум ${MAX_MESSAGE_LENGTH} символов.`
        );
        return;
      }

      const now = Date.now();
      if (now - lastSendTimeRef.current < RATE_LIMIT_DELAY) {
        setError('Подождите немного перед отправкой.');
        return;
      }
      lastSendTimeRef.current = now;

      // Проверка на ПДн
      const hasPersonalData = containsPersonalData(input);

      const userMessage: Message = { role: 'user', content: input.trim() };
      const newMessages = [...messagesRef.current, userMessage];
      messagesRef.current = newMessages;
      setMessages(newMessages);
      setIsLoading(true);
      setIsTyping(true);
      setError(null);

      if (hasPersonalData) {
        const warningMessage: Message = {
          role: 'assistant',
          content:
            '⚠️ Я заметила личные данные. Перейдите в WhatsApp или Telegram.',
        };
        const messagesWithWarning = [...newMessages, warningMessage];
        messagesRef.current = messagesWithWarning;
        setMessages(messagesWithWarning);
        setIsLoading(false);
        setIsTyping(false);
        return;
      }

      let assistantContent = '';

      const updateAssistant = (chunk: string) => {
        assistantContent += chunk;
        setMessages((prev) => {
          const last = prev[prev.length - 1];
          if (last?.role === 'assistant') {
            const updated = prev.map((m, i) =>
              i === prev.length - 1 ? { ...m, content: assistantContent } : m
            );
            messagesRef.current = updated;
            return updated;
          }
          const updated = [
            ...prev,
            { role: 'assistant' as const, content: assistantContent },
          ];
          messagesRef.current = updated;
          return updated;
        });
      };

      try {
        const response = await fetch(CHAT_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${
              import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
            }`,
          },
          body: JSON.stringify({
            messages: newMessages.map((m) => ({
              role: m.role,
              content: m.content,
            })),
          }),
        });

        if (!response.ok) {
          const errorData: ErrorResponse = await response
            .json()
            .catch(() => ({ error: 'Ошибка сервера' }));
          throw new Error(errorData.error || 'Ошибка сервера');
        }

        if (!response.body) {
          throw new Error('Нет ответа от сервера');
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });

          let newlineIndex: number;
          while ((newlineIndex = buffer.indexOf('\n')) !== -1) {
            let line = buffer.slice(0, newlineIndex);
            buffer = buffer.slice(newlineIndex + 1);

            if (line.endsWith('\r')) line = line.slice(0, -1);
            if (line.startsWith(':') || line.trim() === '') continue;
            if (!line.startsWith('data: ')) continue;

            const jsonStr = line.slice(6).trim();
            if (jsonStr === '[DONE]') break;

            try {
              const parsed = JSON.parse(jsonStr);
              const content = parsed.choices?.[0]?.delta?.content;
              if (content) updateAssistant(content);
            } catch {
              buffer = line + '\n' + buffer;
              break;
            }
          }
        }

        if (buffer.trim()) {
          for (let raw of buffer.split('\n')) {
            if (!raw) continue;
            if (raw.endsWith('\r')) raw = raw.slice(0, -1);
            if (raw.startsWith(':') || raw.trim() === '') continue;
            if (!raw.startsWith('data: ')) continue;
            const jsonStr = raw.slice(6).trim();
            if (jsonStr === '[DONE]') continue;
            try {
              const parsed = JSON.parse(jsonStr);
              const content = parsed.choices?.[0]?.delta?.content;
              if (content) updateAssistant(content);
            } catch (e) {
              console.warn(
                'Ошибка синтаксического анализа при окончательной очистке:',
                e
              );
            }
          }
        }
      } catch (err) {
        console.error('Chat error:', err);
        setError(err instanceof Error ? err.message : 'Произошла ошибка');
        setMessages((prev) => {
          const last = prev[prev.length - 1];
          if (last?.role === 'assistant' && !last.content) {
            const updated = prev.slice(0, -1);
            messagesRef.current = updated;
            return updated;
          }
          return prev;
        });
      } finally {
        setIsLoading(false);
        setIsTyping(false);
      }
    },
    [isLoading]
  );

  const clearMessages = useCallback(() => {
    messagesRef.current = [];
    setMessages([]);
    setError(null);
    setIsTyping(false);
  }, []);

  useEffect(() => {
    const chatContainer = document.querySelector('.chat-container');
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messages]);

  return {
    messages,
    isLoading,
    isTyping,
    error,
    hasConsent,
    giveConsent,
    sendMessage,
    clearMessages,
  };
};
