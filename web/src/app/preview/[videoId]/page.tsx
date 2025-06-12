import { getPreviewVideo } from '@/actions/workspace';
import { VideoPreview } from '@/components/global/video-preview';
import { QUERY_KEYS, queryClient } from '@/lib/react-query';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

interface PreviewVideoPageProps {
  params: {
    videoId: string;
  };
}

export default async function PreviewVideoPage({
  params,
}: PreviewVideoPageProps) {
  const { videoId } = params;

  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEYS.PREVIEW_VIDEO],
    queryFn: () => getPreviewVideo(videoId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <VideoPreview videoId={videoId} />
    </HydrationBoundary>
  );
}
