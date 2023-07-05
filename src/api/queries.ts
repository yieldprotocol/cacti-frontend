import { useQuery } from 'react-query';
import { fetchChats } from '@/api/fetches';

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
