import { useQuery } from 'react-query';
import { useSession } from 'next-auth/react';
import { getSharedSession, getSharesList } from '@/api/shares/calls';

export interface SharedSession {
  id: string;
  created: string;
  name: string | null;
}
export interface Shares {
  shares: SharedSession[] | undefined;
}
export const useQueryShares = () => {
  const { data: sessionData } = useSession();
  const userId = sessionData?.user?.name || '';
  const { data: shares, ...rest } = useQuery<Shares>(['shares', userId], async () =>
    getSharesList()
  );
  return { shares, ...rest };
};

export interface SharedSessionMessage {
  messageId: string;
  actor: string;
  type: string;
  payload: string;
  feedback: string;
}
export interface SharedSessionWithMessages {
  name?: string;
  messages: SharedSessionMessage[];
}
export const useQuerySharedSession = (sharedSessionId: string) => {
  const { data: settings, ...rest } = useQuery<SharedSessionWithMessages>(
    ['sharedSession', sharedSessionId],
    async () => getSharedSession(sharedSessionId)
  );
  return { settings, ...rest };
};
