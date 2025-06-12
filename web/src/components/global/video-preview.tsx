'use client';

import { getPreviewVideo } from '@/actions/workspace';
import { QUERY_KEYS } from '@/lib/react-query';
import { useQuery } from '@tanstack/react-query';
import { notFound, useRouter } from 'next/navigation';
import { CopyLink } from '@/components/global/copy-link';

interface VideoPreviewProps {
  videoId: string;
}

export function VideoPreview({ videoId }: VideoPreviewProps) {
  const router = useRouter();

  const { data } = useQuery({
    queryKey: [QUERY_KEYS.PREVIEW_VIDEO],
    queryFn: () => getPreviewVideo(videoId),
  });

  if (data?.status !== 200) router.push('/');
  if (!data?.video) notFound();

  const daysAgo = Math.floor(
    (Date.now() - new Date(data?.video.createdAt).getTime()) /
      (1000 * 60 * 60 * 24)
  );
  const formattedDate =
    daysAgo === 0
      ? 'Today'
      : daysAgo === 1
      ? 'Yesterday'
      : `${daysAgo} days ago`;

  return (
    <div className='grid grid-cols-1 xl:grid-cols-3 p-10 lg:px-20 lg:py-10 overflow-y-auto gap-5'>
      <div className='flex flex-col lg:col-span-2 gap-y-10'>
        <div>
          <div className='flex gap-x-5 items-start justify-between'>
            <h2 className='text-white text-4xl font-bold'>
              {data.video.title}
            </h2>

            {/* {data.isAuthor ? (
              <EditVideo 
                videoId={videoId}
                title={data.video.title}
                description={data.video.description}
              />
            ) : null} */}
          </div>

          <span className='flex gap-x-3 mt-2'>
            <p className='text-[#9d9d9d] capitalize'>
              {data.video.user.firstName} {data.video.user.lastName}
            </p>

            <p className='text-[#707070]'>{formattedDate}</p>
          </span>
        </div>

        <video
          preload='metadata'
          className='w-full aspect-video opacity-50 rounded-xl'
          controls
        >
          <source
            src={`${process.env.NEXT_PUBLIC_CLOUDFRONT_STREAMING_URL}/${data.video.source}#1`}
          />
        </video>

        <div className='flex flex-col text-2xl gap-y-4'>
          <div className='flex gap-x-5 items-center justify-between'>
            <p className='font-semibold text-[#bdbdbd]'>Description</p>
            {/* {data.isAuthor ? (
              <EditVideo
                videoId={videoId}
                title={data.video.title}
                description={data.video.description}
              />
            ) : null} */}
          </div>

          <p className='text-[#9d9d9d] text-lg font-medium'>
            {data.video.description || 'No description provided.'}
          </p>
        </div>
      </div>

      <div className='lg:col-span-1 flex flex-col gap-y-16'>
        <div className='flex justify-end gap-x-3'>
          <CopyLink
            variant='outline'
            className='rounded-full bg-transparent px-10'
            videoId={videoId}
          />

          {/* <RichLink 
            description={truncateString(data.video.description, 150)}
            id={videoId}
            source={data.video.source}
            title={data.video.title}
          /> */}
        </div>
      </div>
    </div>
  );
}
