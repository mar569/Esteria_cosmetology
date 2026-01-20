export interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export interface ErrorResponse {
  error: string;
}

export interface StreamChunk {
  choices?: Array<{
    delta?: {
      content?: string;
    };
  }>;
}
