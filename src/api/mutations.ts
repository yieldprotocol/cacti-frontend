import { useMutation, useQueryClient } from 'react-query';
import { postCloneSession } from '@/api/posts';
import { putShareSettings } from '@/api/puts';
import { useRouter } from 'next/router';

export const useMutationUpdateShareSettings = (sessionId: string) => {
  const mutationFn = ({ metadata }: { metadata: any }) => {
    return putShareSettings(sessionId, metadata);
  };

  const queryClient = useQueryClient();

  return useMutation(mutationFn, {
    onSuccess: (data, variables, context): void => {
      queryClient.invalidateQueries({ queryKey: ['shareSettings', sessionId] });
    },
  });
};

export const useMutationCloneSession = (sessionId: string) => {
  const mutationFn = ({ metadata }: { metadata: any }) => {
    return postCloneSession(sessionId, metadata);
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
