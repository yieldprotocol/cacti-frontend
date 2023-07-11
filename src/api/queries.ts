import { useQuery } from 'react-query';
import { fetchChats, fetchShareSettings } from '@/api/fetches';

export interface ChatSession {
  id: string;
  created: string;
}
export interface Chats {
  sessions: ChatSession[];
}
export const useQueryChats = () => {
  const { data: chats, ...rest } = useQuery(['chats'], async () => fetchChats());
  return { chats: chats as Chats, ...rest };
};

export interface ChatShareSettings {
  visibility: string;
}
export const useQueryShareSettings = (sessionId: string) => {
  const { data, ...rest } = useQuery(['shareSettings', sessionId], async () =>
    fetchShareSettings(sessionId)
  );
  return { settings: data as ChatShareSettings, ...rest };
};
