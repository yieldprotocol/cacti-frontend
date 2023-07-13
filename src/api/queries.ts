import { useQuery } from 'react-query';
import { fetchChats, fetchShareSettings } from '@/api/fetches';

export interface ChatSession {
  id: string;
  created: string;
}
export interface Chats {
  sessions: ChatSession[] | undefined;
}
export const useQueryChats = () => {
  const { data: chats, ...rest } = useQuery<Chats>(['chats'], async () => fetchChats());
  return { chats, ...rest };
};

export interface ChatShareSettings {
  visibility?: string;
  canEdit?: boolean;
}
export const useQueryShareSettings = (sessionId: string) => {
  const { data, ...rest } = useQuery(['shareSettings', sessionId], async () =>
    fetchShareSettings(sessionId)
  );
  return { settings: data as ChatShareSettings, ...rest };
};
