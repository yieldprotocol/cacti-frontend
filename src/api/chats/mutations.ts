import { useMutation, useQueryClient } from 'react-query';
import { useRouter } from 'next/router';
import { deleteChat, postCreateChatFromShareImport, putChatSettings } from '@/api/chats/calls';

export const useMutationUpdateChatSettings = (sessionId: string) => {
  const mutationFn = ({ metadata }: { metadata: any }) => {
    return putChatSettings(sessionId, metadata);
  };

  const queryClient = useQueryClient();

  return useMutation(mutationFn, {
    onSuccess: (data, variables, context): void => {
      queryClient.invalidateQueries({ queryKey: ['chatSettings', sessionId] });
    },
  });
};

export const useMutationDeleteChat = (sessionId: string) => {
  const mutationFn = () => {
    return deleteChat(sessionId);
  };

  const queryClient = useQueryClient();

  return useMutation(mutationFn, {
    onSuccess: (data, variables, context): void => {
      queryClient.invalidateQueries({ queryKey: ['chats'] });
      queryClient.invalidateQueries({ queryKey: ['chatSettings', sessionId] });
    },
  });
};

export const useMutationChatImportSession = (sharedSessionId: string) => {
  const mutationFn = ({ metadata }: { metadata: any }) => {
    return postCreateChatFromShareImport(sharedSessionId, metadata);
  };
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
