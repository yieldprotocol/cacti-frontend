import { useMutation, useQueryClient } from 'react-query';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { deleteChat, postCreateChatFromShareImport, putChatSettings } from '@/api/chats/calls';
import { Chats } from './queries';

export const useMutationUpdateChatSettings = (sessionId: string) => {
  const mutationFn = ({ metadata }: { metadata: any }) => putChatSettings(sessionId, metadata);
  const queryClient = useQueryClient();

  return useMutation(mutationFn, {
    onSuccess: (data, variables, context): void => {
      queryClient.invalidateQueries({ queryKey: ['chatSettings', sessionId] });
    },
  });
};

export const useMutationDeleteChat = (sessionId: string) => {
  const mutationFn = async () => deleteChat(sessionId);
  const queryClient = useQueryClient();
  const { data: sessionData } = useSession();
  const userId = sessionData?.user?.name;

  const router = useRouter();

  return useMutation(mutationFn, {
    onMutate: async () => {
      // cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ['chats', userId] });
      await queryClient.cancelQueries({ queryKey: ['chatSettings', sessionId, userId] });

      // Get the previous chats data
      const previousChats = queryClient.getQueryData<Chats>(['chats', userId]); // TODO improve types to not use generic typing here

      // Update the chats data by removing the session with the provided sessionId
      if (previousChats && previousChats.sessions) {
        const filteredSessions = previousChats.sessions.filter(
          (session) => session.id !== sessionId
        );
        const updatedChats: Chats = { sessions: filteredSessions }; // TODO need to have types before here, so we don't explicitly assign Chats
        queryClient.setQueryData(['chats', userId], updatedChats);
      }

      router.push(`/`);
      return { previousChats };
    },

    onError: (err, deletedChat, context) => {
      // if optimistic update fails, roll back to previousChats
      queryClient.setQueryData(['chats', userId], context?.previousChats);
    },
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ['chats', userId] });
      queryClient.invalidateQueries({ queryKey: ['chatSettings', sessionId, userId] });
    },
  });
};

export const useMutationChatImportSession = (sharedSessionId: string) => {
  const mutationFn = async ({ metadata }: { metadata: any }) =>
    postCreateChatFromShareImport(sharedSessionId, metadata);
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation(mutationFn, {
    onSuccess: (data, variables, context): void => {
      if (data) {
        const newSessionId = data;
        router.push(`/chat/${newSessionId}`);
        queryClient.invalidateQueries({ queryKey: ['chats'] });
      }
    },
  });
};
