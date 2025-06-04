'use client';

import { getUserVideos } from '@/actions/user';
import { cn } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import { VideoIcon } from 'lucide-react';
import { VideoCard } from '@/components/global/video-card';

interface VideosProps {
  folderId: string;
  videosKey: string;
  workspaceId: string;
}

export function Videos({ folderId, videosKey, workspaceId }: VideosProps) {
  const { data } = useQuery({
    queryKey: [videosKey],
    queryFn: () => getUserVideos(folderId),
  });

  return (
    <div className='flex flex-col gap-4 mt-4'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-4'>
          <VideoIcon />
          <h2 className='text-[#bdbdbd] text-xl'>Videos</h2>
        </div>
      </div>

      <section
        className={cn(
          data?.status !== 200
            ? 'p-5'
            : 'grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'
        )}
      >
        {data?.status === 200 ? (
          data.videos?.map((video) => (
            <VideoCard key={video.id} workspaceId={workspaceId} {...video} />
          ))
        ) : (
          <p className='text-[#bdbdbd]'>No videos in workspace</p>
        )}
      </section>
    </div>
  );
}
