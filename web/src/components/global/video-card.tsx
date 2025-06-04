import { Loader } from '@/components/global/loader';
import { VideoCardMenu } from '@/components/global/video-card-menu';

interface VideoCardProps {
  user?: {
    firstName?: string | null;
    lastName?: string | null;
    image?: string | null;
  } | null;
  id: string;
  folder?: {
    id: string;
    name: string;
  } | null;
  createdAt: Date;
  title?: string | null;
  source: string;
  processing?: boolean;
  workspaceId?: string;
}

export function VideoCard({
  // user,
  id,
  folder,
  // createdAt,
  // title,
  // source,
  processing = false,
  workspaceId,
}: VideoCardProps) {
  return (
    <Loader state={processing}>
      <div className='overflow-hidden cursor-pointer bg-[#171717] relative border-[1px] border-[#252525] flex flex-col rounded-xl'>
        <div className='absolute top-3 right-3 z-50 flex flex-col gap-y-3'>
          <VideoCardMenu
            videoId={id}
            currentFolder={folder?.id}
            currentFolderName={folder?.name}
            currentWorkspace={workspaceId}
          />
        </div>
      </div>
    </Loader>
  );
}
