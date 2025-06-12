import { useMoveVideos } from '@/hooks/use-folders';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Loader } from '@/components/global/loader';

interface ChangeVideoLocationProps {
  videoId?: string;
  currentWorkspace?: string;
  currentFolder?: string;
  currentFolderName?: string;
}

export function ChangeVideoLocation({
  videoId,
  currentWorkspace,
  currentFolder,
}: ChangeVideoLocationProps) {
  const {
    register,
    isPending,
    onSubmit,
    folders,
    workspaces,
    isFetching,
    foldersData,
  } = useMoveVideos(videoId!, currentWorkspace!);

  const folder = folders.find((folder) => folder.id === currentFolder);
  const workspace = workspaces.find(
    (workspace) => workspace.id === currentWorkspace
  );

  return (
    <form className='flex flex-col gap-y-5' onSubmit={onSubmit}>
      <div className='border-[1px] rounded-xl p-5'>
        <h2 className='text-xs text-[#a4a4a4]'>Current Workspace</h2>
        {workspace && <p className='text-[#a4a4a4]'>{workspace.name}</p>}

        {folder ? <p>{folder.name}</p> : 'This video is not in a folder.'}
      </div>

      <Separator orientation='horizontal' />

      <div className='flex flex-col gap-y-5 p-5 border-[1px] rounded-xl'>
        <h2 className='text-xs text-[#a4a4a4]'>To</h2>
        <Label className='flex-col gap-y-2 flex'>
          <p className='text-xs'>Workspace</p>

          <select
            className='rounded-xl text-base bg-transparent'
            {...register('workspaceId')}
          >
            {workspaces.map((workspace) => (
              <option
                value={workspace.id}
                key={workspace.id}
                className='text-[#a4a4a4]'
              >
                {workspace.name}
              </option>
            ))}
          </select>
        </Label>

        {isFetching ? (
          <Skeleton className='w-full h-[40px] rounded-xl' />
        ) : (
          <Label className='flex flex-col gap-y-2'>
            <p className='text-xs'>Folders in this workspace</p>

            {foldersData && foldersData.length > 0 ? (
              <select
                className='rounded-xl bg-transparent text-base'
                {...register('folderId')}
              >
                {foldersData.map((folder) => (
                  <option
                    value={folder.id}
                    key={folder.id}
                    className='text-[#a4a4a4]'
                  >
                    {folder.name}
                  </option>
                ))}
              </select>
            ) : (
              <p className='text-sm text-[#a4a4a4]'>
                No folders available in this workspace.
              </p>
            )}
          </Label>
        )}
      </div>

      <Button>
        <Loader state={isPending} color='#000'>
          Transfer
        </Loader>
      </Button>
    </form>
  );
}
