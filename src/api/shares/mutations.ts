import { useMutation, useQueryClient } from 'react-query';
import { useRouter } from 'next/router';
import { deleteSharedSession, postCreateSharedSession, putSharedSession } from '@/api/shares/calls';

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

  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation(mutationFn, {
    onSuccess: (data, variables, context): void => {
      router.push(`/`);
      queryClient.invalidateQueries({ queryKey: ['shares'] });
      queryClient.invalidateQueries({ queryKey: ['sharedSession', sharedSessionId] });
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
