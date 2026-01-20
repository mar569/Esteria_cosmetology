import { createParser } from 'eventsource-parser';
import { StreamChunk } from '../types.ts/types';

const personalDataPatterns = [
  /\+?[78]\s*\$?\d{3}\$?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}/g,
  /\b[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}\b/g,
  /\b(?:меня зовут|мое имя|я\s+[-]?\s*)([а-яА-ЯёЁa-zA-Z]+)\b/gi,
  /\b\d{4}\s\d{6}\b/g,
];

export const containsPersonalData = (text: string): boolean => {
  return personalDataPatterns.some((pattern) => pattern.test(text));
};

export const parseStream = async (
  response: Response,
  updateAssistant: (chunk: string) => void
): Promise<void> => {
  const parser = createParser({
    onEvent: (event) => {
      if (event.event === 'event') {
        try {
          const parsed: StreamChunk = JSON.parse(event.data);
          const content = parsed.choices?.[0]?.delta?.content;
          if (content) updateAssistant(content);
        } catch (e) {
          console.error('Parse error:', e);
        }
      }
    },
    onError: (error) => {
      console.error('Stream error:', error);
    },
  });

  const reader = response.body?.getReader();
  if (!reader) throw new Error('Нет тела ответа');

  const decoder = new TextDecoder();
  let buffer = '';

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    parser.feed(buffer);
  }
};
