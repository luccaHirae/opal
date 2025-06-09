import { getWorkspaceFolders, moveVideoLocation } from '@/actions/workspace';
import { MUTATION_KEYS } from '@/lib/react-query';
import { useAppSelector } from '@/redux/store';
import { moveVideoSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

type Folders = ({ _count: { videos: number } } & {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  workSpaceId: string | null;
})[];

export function useMoveVideos(videoId: string, currentWorkspace: string) {
  const { folders } = useAppSelector((state) => state.folderReducer);
  const { workspaces } = useAppSelector((state) => state.workspaceReducer);

  const [isFetching, setIsFetching] = useState(false);
  const [foldersData, setFoldersData] = useState<Folders | undefined>(
    undefined
  );

  const { mutate, isPending } = useMutation({
    mutationKey: [MUTATION_KEYS.CHANGE_VIDEO_LOCATION],
    mutationFn: (data: { folderId: string; workspaceId: string }) =>
      moveVideoLocation(videoId, data.folderId, data.workspaceId),
  });

  const form = useForm<z.infer<typeof moveVideoSchema>>({
    resolver: zodResolver(moveVideoSchema),
    defaultValues: {
      folderId: '',
      workspaceId: currentWorkspace,
    },
  });

  const getFolders = async (workspaceId: string) => {
    setIsFetching(true);

    try {
      const response = await getWorkspaceFolders(workspaceId);

      if (response.status === 200) {
        setFoldersData(response.folders);
      }
    } catch (err) {
      console.error('Error fetching folders:', err);
    } finally {
      setIsFetching(false);
    }
  };

  const onSubmit = form.handleSubmit(async (data) => {
    if (data.folderId)
      mutate({ folderId: data.folderId, workspaceId: data.workspaceId });
  });

  useEffect(() => {
    getFolders(currentWorkspace);
  }, [currentWorkspace]);

  useEffect(() => {
    const workspace = form.watch(async (value) => {
      if (value.workspaceId) getFolders(value.workspaceId);
    });

    return () => {
      workspace.unsubscribe();
    };
  }, [form]);

  return {
    ...form,
    folders,
    foldersData,
    isFetching,
    isPending,
    workspaces,
    onSubmit,
  };
}
