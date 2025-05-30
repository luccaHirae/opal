'use client';

import { cn } from '@/lib/utils';
import { usePathname, useRouter } from 'next/navigation';
import { Loader } from '@/components/global/loader';
import { FolderDot } from 'lucide-react';
import { useRef, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { MUTATION_KEYS, QUERY_KEYS, queryClient } from '@/lib/react-query';
import { renameFolder } from '@/actions/workspace';
import { Input } from '@/components/ui/input';

interface FolderProps {
  name: string;
  id: string;
  optimistic?: boolean;
  count?: number;
}

export function Folder({
  name,
  id,
  optimistic = false,
  count = 0,
}: FolderProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [onRename, setOnRename] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const folderCardRef = useRef<HTMLDivElement>(null);

  const { mutate } = useMutation({
    mutationKey: [MUTATION_KEYS.RENAME_FOLDER],
    mutationFn: (data: { folderId: string; name: string }) =>
      renameFolder(data.folderId, data.name),
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.WORKSPACE_FOLDERS],
      });
    },
    onSuccess: () => setOnRename(false),
  });

  const handleFolderClick = () => {
    router.push(`${pathname}/folder/${id}`);
  };

  const handleNameDoubleClick = (e: React.MouseEvent<HTMLParagraphElement>) => {
    e.stopPropagation();
    setOnRename(true);
  };

  const handleInputBlur = () => {
    if (inputRef.current && folderCardRef.current) {
      if (inputRef.current.value.trim() !== '') {
        mutate({
          folderId: id,
          name: inputRef.current.value.trim(),
        });
      } else {
        setOnRename(false);
      }
    }
  };

  return (
    <div
      ref={folderCardRef}
      onClick={handleFolderClick}
      className={cn(
        'flex items-center justify-between gap-2 cursor-pointer py-6 px-4 rounded-lg border-[1px] hover:bg-neutral-800 transition duration-150 min-w-[250px]',
        optimistic && 'opacity-60'
      )}
    >
      <Loader state={false}>
        <div className='flex flex-col gap-[1px]'>
          {onRename ? (
            <Input
              placeholder={name}
              className='border-none text-base w-full outline-none text-neutral-300 bg-transparent p-0'
              ref={inputRef}
              onBlur={handleInputBlur}
              autoFocus
            />
          ) : (
            <p
              onDoubleClick={handleNameDoubleClick}
              className='text-neutral-300'
            >
              {name}
            </p>
          )}

          <span className='text-sm text-neutral-500'>{count} videos</span>
        </div>
      </Loader>

      <FolderDot />
    </div>
  );
}
