import { useMutation, useQueryClient } from 'react-query';
import { postUpdateShareSettings } from '@/api/posts';

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
