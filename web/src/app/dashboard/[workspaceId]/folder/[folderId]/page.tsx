import { getUserVideos } from '@/actions/user';
import { getFolderDetails } from '@/actions/workspace';
import { FolderDetails } from '@/components/global/folder-details';
import { Videos } from '@/components/global/videos';
import { QUERY_KEYS, queryClient } from '@/lib/react-query';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

interface FolderPageProps {
  params: {
    folderId: string;
    workspaceId: string;
  };
}

export default async function FolderPage({ params }: FolderPageProps) {
  const { folderId, workspaceId } = params;

  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEYS.FOLDER_VIDEOS],
    queryFn: () => getUserVideos(folderId),
  });

  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEYS.FOLDER_DETAILS],
    queryFn: () => getFolderDetails(folderId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <FolderDetails folderId={folderId} />
      <Videos
        folderId={folderId}
        workspaceId={workspaceId}
        videosKey={QUERY_KEYS.FOLDER_VIDEOS}
      />
    </HydrationBoundary>
  );
}
