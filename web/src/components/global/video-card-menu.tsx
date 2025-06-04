import { MoveIcon } from 'lucide-react';
import { Modal } from '@/components/global/modal';
import { ChangeVideoLocation } from '@/components/forms/change-video-location';

interface VideoCardMenuProps {
  videoId: string;
  currentWorkspace?: string;
  currentFolder?: string;
  currentFolderName?: string;
}

export function VideoCardMenu({
  videoId,
  currentWorkspace,
  currentFolder,
  currentFolderName,
}: VideoCardMenuProps) {
  return (
    <Modal
      className='flex items-center cursor-pointer gap-x-2'
      title='Move to new Workspace or Folder'
      description='Select a workspace or folder to move this video.'
      trigger={<MoveIcon size={20} fill='#a4a4a4' className='text-[#a4a4a4]' />}
    >
      <ChangeVideoLocation
        videoId={videoId}
        currentWorkspace={currentWorkspace}
        currentFolder={currentFolder}
        currentFolderName={currentFolderName}
      />
    </Modal>
  );
}
