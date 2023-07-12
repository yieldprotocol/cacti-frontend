import { useMutation, useQueryClient } from 'react-query';
import { postCloneSession, postUpdateShareSettings } from '@/api/posts';

export const useMutationUpdateShareSettings = (sessionId: string) => {
  const mutationFn = ({ metadata }: { metadata: any }) => {
    return postUpdateShareSettings(sessionId, metadata);
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

  return useMutation(mutationFn, {
    onSuccess: (data, variables, context): void => {
      if (data) {
        const q = window.location.search;
        const params = new URLSearchParams(q);
        params.set('s', data);
        window.location.assign('?' + params.toString());
      }
    },
  });
};
