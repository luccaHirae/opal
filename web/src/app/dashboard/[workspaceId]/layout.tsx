import {
  getUserNotifications,
  getUserVideos,
  onAuthenticateUser,
} from '@/actions/user';
import {
  getUserWorkspaces,
  getWorkspaceFolders,
  verifyAccessToWorkspace,
} from '@/actions/workspace';
import { redirect } from 'next/navigation';
import { QUERY_KEYS, queryClient } from '@/lib/react-query';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { Sidebar } from '@/components/global/sidebar';
import { GlobalHeader } from '@/components/global/global-header';

interface WorkSpacePageProps {
  params: {
    workSpaceId: string;
  };
  children: React.ReactNode;
}

export default async function WorkSpaceLayout({
  params,
  children,
}: WorkSpacePageProps) {
  const { workSpaceId } = await params;
  const auth = await onAuthenticateUser();

  if (!auth.user?.workSpace || !auth.user.workSpace.length)
    redirect('/auth/sign-in');

  const hasAccess = await verifyAccessToWorkspace(workSpaceId);

  if (hasAccess.status !== 200)
    redirect(`/dashboard/${auth.user.workSpace[0].id}`);

  if (!hasAccess.data) return null;

  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEYS.WORKSPACE_FOLDERS],
    queryFn: () => getWorkspaceFolders(workSpaceId),
  });

  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEYS.USER_VIDEOS],
    queryFn: () => getUserVideos(workSpaceId),
  });

  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEYS.USER_WORKSPACES],
    queryFn: () => getUserWorkspaces(),
  });

  await queryClient.prefetchQuery({
    queryKey: [QUERY_KEYS.USER_NOTIFICATIONS],
    queryFn: () => getUserNotifications(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className='flex h-screen w-screen'>
        <Sidebar activeWorkSpaceId={workSpaceId} />
        <div className='w-full pt-28 p-6 overflow-y-scroll overflow-x-hidden'>
          <GlobalHeader workspace={hasAccess.data} />
          <div className='mt-4'>{children}</div>
        </div>
      </div>
    </HydrationBoundary>
  );
}
