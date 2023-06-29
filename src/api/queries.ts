import { useQuery } from 'react-query';
import { fetchChats } from '@/api/fetches';

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
