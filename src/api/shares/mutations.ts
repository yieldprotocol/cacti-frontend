import { useMutation, useQueryClient } from 'react-query';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { deleteSharedSession, postCreateSharedSession, putSharedSession } from '@/api/shares/calls';
import { Shares } from './queries';

export const useMutationUpdateSharedSession = (sharedSessionId: string) => {
  const mutationFn = async ({ metadata }: { metadata: any }) => {
    return putSharedSession(sharedSessionId, metadata);
  };

  const queryClient = useQueryClient();

  return useMutation(mutationFn, {
    onSuccess: (data, variables, context): void => {
      queryClient.invalidateQueries({ queryKey: ['sharedSession', sharedSessionId] });
    },
  });
};

export const useMutationDeleteSharedSession = (sharedSessionId: string) => {
  const mutationFn = async () => {
    return deleteSharedSession(sharedSessionId);
  };

  const { data: sessionData } = useSession();
  const userId = sessionData?.user?.name;
  const queryClient = useQueryClient();
  const router = useRouter();
  const sharedChatKey = ['shares', userId];
  const sharedChatSettingsKey = ['shareSettings', sharedSessionId];

  return useMutation(mutationFn, {
    onMutate: async () => {
      // cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: sharedChatKey });
      await queryClient.cancelQueries({ queryKey: sharedChatSettingsKey });

      // Get the previous shares data
      const previousSharedChats = queryClient.getQueryData<Shares>(sharedChatKey); // TODO improve types to not use generic typing here

      // Update the chats data by removing the session with the provided sessionId
      if (previousSharedChats && previousSharedChats.shares) {
        const filteredSharedChats = previousSharedChats.shares.filter(
          (s) => s.id !== sharedSessionId
        );
        const updated: Shares = { shares: filteredSharedChats }; // TODO need to have types before here, so we don't explicitly assign Chats
        queryClient.setQueryData(sharedChatKey, updated);
      }

      router.push(`/`);
      return { previousSharedChats };
    },

    onError: (err, deletedSharedChat, context) => {
      // if optimistic update fails, roll back to previousChats
      queryClient.setQueryData(['shares', userId], context?.previousSharedChats);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: sharedChatKey });
      queryClient.invalidateQueries({ queryKey: sharedChatSettingsKey });
    },
  });
};

export const useMutationCreateSharedSession = (sessionId: string) => {
  const mutationFn = async () => postCreateSharedSession(sessionId);
  const queryClient = useQueryClient();
  // const router = useRouter();

  return useMutation(mutationFn, {
    onSuccess: (data, variables, context): void => {
      if (data) {
        // const newSessionId = data;
        // router.push(`/shares/${newSessionId}`);
        queryClient.invalidateQueries({ queryKey: ['shares'] });
      }
    },
  });
};
