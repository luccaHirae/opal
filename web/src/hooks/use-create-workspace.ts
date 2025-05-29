import { createWorkspace } from '@/actions/workspace';
import { MUTATION_KEYS, QUERY_KEYS, queryClient } from '@/lib/react-query';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useZodForm } from '@/hooks/use-zod-form';
import { workspaceFormSchema } from '@/schemas';

export function useCreateWorkspace() {
  const { mutate, isPending } = useMutation({
    mutationKey: [MUTATION_KEYS.CREATE_WORKSPACE],
    mutationFn: (data: { name: string }) => createWorkspace(data.name),
    onSuccess: (data) => {
      return toast(
        data.status === 200 ? 'Workspace created successfully' : data.message
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER_WORKSPACES] });
    },
  });

  const form = useZodForm(workspaceFormSchema, mutate);

  return {
    ...form,
    isPending,
  };
}
