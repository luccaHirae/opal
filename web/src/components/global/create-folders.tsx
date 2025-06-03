import { FolderIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCreateFolders } from '@/hooks/use-create-folders';

interface CreateFoldersProps {
  workspaceId: string;
}

export function CreateFolders({ workspaceId }: CreateFoldersProps) {
  const { onCreateNewFolder } = useCreateFolders(workspaceId);

  return (
    <Button
      onClick={onCreateNewFolder}
      className='bg-[#1d1d1d] text-[#707070] fle items-center gap-2 py-6 px-4 rounded-2xl'
    >
      <FolderIcon />
      Create a folder
    </Button>
  );
}
