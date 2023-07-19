import { useQuery } from 'react-query';
import { useSession } from 'next-auth/react';
import { fetchChats, fetchShareSettings } from '@/api/fetches';

export interface ChatSession {
  id: string;
  created: string;
  name: string | null;
}
export interface Chats {
  sessions: ChatSession[] | undefined;
}
export const useQueryChats = () => {
  const { data: sessionData } = useSession();
  const userId = sessionData?.user?.name || '';
  const { data: chats, ...rest } = useQuery<Chats>(['chats', userId], async () => fetchChats());
  return { chats, ...rest };
};

export interface ChatShareSettings {
  visibility?: string;
  name?: string;
  canEdit?: boolean;
}

export const useQueryShareSettings = (sessionId: string) => {
  const { data: sessionData } = useSession();
  const userId = sessionData?.user?.name || '';
  const { data: settings, ...rest } = useQuery<ChatShareSettings>(
    ['shareSettings', sessionId, userId],
    async () => fetchShareSettings(sessionId)
  );
  return { settings, ...rest };
};
