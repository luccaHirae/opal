import Link from 'next/link';
import { Loader } from '@/components/global/loader';
import { VideoCardMenu } from '@/components/global/video-card-menu';
import { CopyLink } from '@/components/global/copy-link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DotIcon, Share2Icon, UserIcon } from 'lucide-react';

interface VideoCardProps {
  user?: {
    firstName?: string | null;
    lastName?: string | null;
    image?: string;
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
  user,
  id,
  folder,
  createdAt,
  title,
  source,
  processing = false,
  workspaceId,
}: VideoCardProps) {
  const daysAgo = Math.floor(
    (new Date().getTime() - new Date(createdAt).getTime()) /
      (1000 * 60 * 60 * 24)
  );
  const formattedDate = daysAgo === 0 ? 'Today' : `${daysAgo} days ago`;

  return (
    <Loader
      state={processing}
      className='bg-[#171717] flex justify-center items-center border-[1px] border-[#252525] rounded-xl'
    >
      <div className='group overflow-hidden cursor-pointer bg-[#171717] relative border-[1px] border-[#252525] flex flex-col rounded-xl'>
        <div className='absolute top-3 right-3 z-50 flex-col gap-y-3 hidden group-hover:flex'>
          <VideoCardMenu
            videoId={id}
            currentFolder={folder?.id}
            currentFolderName={folder?.name}
            currentWorkspace={workspaceId}
          />

          <CopyLink
            videoId={id}
            variant='ghost'
            className='p-0 h-5 bg-hover:bg-transparent'
          />
        </div>

        <Link
          href={`/preview/${id}`}
          className='hover:bg-[#252525] transition duration-150 flex flex-col justify-between h-full'
        >
          <video
            controls={false}
            preload='metadata'
            className='w-full aspect-video opacity-50 z-20'
          >
            <source src={source} />
          </video>

          <div className='px-5 py-3 flex flex-col gap-y-2 z-20'>
            <h2 className='text-sm font-semibold text-[#bdbdbd]'>
              {title || 'Untitled Video'}
            </h2>

            <div className='flex gap-x-2 items-center mt-4'>
              <Avatar className='size-8'>
                <AvatarImage src={user?.image} />
                <AvatarFallback>
                  <UserIcon />
                </AvatarFallback>
              </Avatar>

              <div>
                <p className='capitalize text-xs text-[#bdbdbd]'>
                  {user?.firstName || 'Unknown'} {user?.lastName || 'User'}
                </p>

                <p className='text-xs text-[#9d9d9d] flex items-center'>
                  <DotIcon />
                  {formattedDate}
                </p>
              </div>
            </div>

            <div>
              <span className='flex gap-x-1 items-center'>
                <Share2Icon
                  size={12}
                  className='text-[#9d9d9d]'
                  fill='#9d9d9d'
                />

                <p className='text-xs capitalize text-[#9d9d9d]'>
                  {user?.firstName}&apos;s workspace
                </p>
              </span>
            </div>
          </div>
        </Link>
      </div>
    </Loader>
  );
}
