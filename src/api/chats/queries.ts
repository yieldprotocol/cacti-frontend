import { useQuery } from 'react-query';
import { useSession } from 'next-auth/react';
import { getChatSettings, getChatsList } from '@/api/chats/calls';

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
  const { data: chats, ...rest } = useQuery<Chats>({
    queryKey: ['chats', userId],
    queryFn: async () => getChatsList(),
    refetchOnWindowFocus: false,
  });
  return { chats, ...rest };
};

export interface ChatSettings {
  visibility?: string;
  name?: string;
  canEdit?: boolean;
}
export const useQueryChatSettings = (sessionId: string | undefined) => {
  const { data: sessionData } = useSession();
  const userId = sessionData?.user?.name || '';
  const { data: settings, ...rest } = useQuery<ChatSettings>({
    queryKey: ['chatSettings', sessionId, userId],
    queryFn: async () => {
      if (sessionId) return getChatSettings(sessionId);
    },
    refetchOnWindowFocus: false,
  });
  return { settings, ...rest };
};
