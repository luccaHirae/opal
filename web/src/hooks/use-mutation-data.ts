import { queryClient } from '@/lib/react-query';
import {
  MutationFunction,
  MutationKey,
  useMutation,
  useMutationState,
} from '@tanstack/react-query';
import { toast } from 'sonner';

export function useMutationData(
  mutationKey: MutationKey,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mutationFn: MutationFunction<any, unknown>,
  queryKey?: string,
  onSuccess?: () => void
) {
  const { mutate, isPending } = useMutation({
    mutationKey,
    mutationFn,
    onSuccess: (res) => {
      if (onSuccess) onSuccess();
      return toast(res?.status === 200 ? 'Success!' : res?.message, {
        description: res?.data,
      });
    },
    onSettled: async () => {
      return queryClient.invalidateQueries({ queryKey: [queryKey] });
    },
  });

  return {
    mutate,
    isPending,
  };
}

export function useMutationDataState(mutationKey: MutationKey) {
  const data = useMutationState({
    filters: {
      mutationKey,
    },
    select: (mutation) => ({
      variables: mutation.state.variables,
      status: mutation.state.status,
    }),
  });

  const latestVariables = data[data.length - 1];

  return {
    latestVariables,
  };
}
