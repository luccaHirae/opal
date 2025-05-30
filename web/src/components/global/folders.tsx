'use client';

import { cn } from '@/lib/utils';
import { ArrowRightIcon, FolderDotIcon } from 'lucide-react';
import { Folder } from '@/components/global/folder';
import { useMutationState, useQuery } from '@tanstack/react-query';
import { MUTATION_KEYS, QUERY_KEYS } from '@/lib/react-query';
import { getWorkspaceFolders } from '@/actions/workspace';

interface FoldersProps {
  workspaceId: string;
}

export function Folders({ workspaceId }: FoldersProps) {
  const { data, isFetched } = useQuery({
    queryKey: [QUERY_KEYS.WORKSPACE_FOLDERS],
    queryFn: () => getWorkspaceFolders(workspaceId),
  });

  const mutationState = useMutationState({
    filters: {
      mutationKey: [MUTATION_KEYS.CREATE_FOLDER],
    },
    select: (mutation) => ({
      variables: mutation.state.variables as { name: string; id: string },
      status: mutation.state.status,
    }),
  });

  const latestVariables = mutationState[mutationState.length - 1];

  if (isFetched && data?.folders) {
  }

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-4'>
          <FolderDotIcon />
          <h2 className='text-[#bdbdbd] text-xl'>Folders</h2>
        </div>

        <div className='flex items-center gap-2'>
          <p className='text-[#bdbdbd]'>See all</p>
          <ArrowRightIcon />
        </div>
      </div>

      <section
        className={cn(
          'flex items-center gap-4 overflow-x-auto w-full',
          data?.status !== 200 && 'justify-center'
        )}
      >
        {data?.status !== 200 ? (
          <p className='text-neutral-300'>No folders in workspace</p>
        ) : (
          <>
            {latestVariables.status === 'pending' && (
              <Folder
                name={latestVariables.variables.name}
                id={latestVariables.variables.id}
                optimistic
              />
            )}
            {data.folders?.map((folder) => (
              <Folder
                key={folder.id}
                name={folder.name}
                id={folder.id}
                count={folder._count.videos}
              />
            ))}
          </>
        )}
      </section>
    </div>
  );
}
