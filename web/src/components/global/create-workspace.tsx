'use client';

import { getUserWorkspaces } from '@/actions/workspace';
import { QUERY_KEYS } from '@/lib/react-query';
import { useQuery } from '@tanstack/react-query';
import { Modal } from '@/components/global/modal';
import { Button } from '@/components/ui/button';
import { FolderPlusIcon } from 'lucide-react';
import { WorkspaceForm } from '@/components/forms/workspace-form';

export function CreateWorkspace() {
  const { data } = useQuery({
    queryKey: [QUERY_KEYS.USER_WORKSPACES],
    queryFn: getUserWorkspaces,
  });

  if (data?.subscription?.plan === 'FREE') {
    return null;
  }

  if (data?.subscription?.plan === 'PRO') {
    return (
      <Modal
        title='Create a Workspace'
        description='Workspaces helps you collaborate with team members and organize your content. You are assigned a default personal workspace, but you can create more workspaces to manage different projects or teams.'
        trigger={
          <Button className='bg-[#1d1d1d] text-[#707070] flex items-center gap-2 py-6 px-4 rounded-2xl'>
            <FolderPlusIcon />
            Create Workspace
          </Button>
        }
      >
        <WorkspaceForm />
      </Modal>
    );
  }

  return null;
}
