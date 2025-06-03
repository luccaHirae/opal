import { createFolder } from '@/actions/workspace';
import { MUTATION_KEYS, QUERY_KEYS, queryClient } from '@/lib/react-query';
import { useMutation } from '@tanstack/react-query';

export function useCreateFolders(workspaceId: string) {
  const { mutate } = useMutation({
    mutationKey: [MUTATION_KEYS.CREATE_FOLDER],
    mutationFn: () => createFolder(workspaceId),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.WORKSPACE_FOLDERS],
      });
    },
  });

  const onCreateNewFolder = () => mutate();

  return {
    onCreateNewFolder,
  };
}
