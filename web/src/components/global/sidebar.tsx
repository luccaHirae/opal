'use client';

import Image from 'next/image';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useRouter } from 'next/navigation';
import { Separator } from '@/components/ui/separator';
import { QUERY_KEYS } from '@/lib/react-query';
import { getUserWorkspaces } from '@/actions/workspace';
import { useQuery } from '@tanstack/react-query';

interface SidebarProps {
  activeWorkSpaceId: string;
}

export function Sidebar({ activeWorkSpaceId }: SidebarProps) {
  const router = useRouter();
  const { data } = useQuery({
    queryKey: [QUERY_KEYS.USER_WORKSPACES],
    queryFn: getUserWorkspaces,
    enabled: !!activeWorkSpaceId,
  });

  const onChangeActiveWorkspace = (value: string) => {
    router.push(`/dashboard/${value}`);
  };

  return (
    <div className='bg-[#111111] flex-none relative p-4 h-full w-[250px] flex flex-col gap-4 items-center overflow-hidden'>
      <div className='bg-[#111111] p-4 gap-2 justify-center items-center mb-4 absolute top-0 left-0 right-0'>
        <Image src='/opal-logo.svg' alt='logo' width={40} height={40} />
        <p className='text-2xl'>Opal</p>
      </div>

      <Select
        defaultValue={activeWorkSpaceId}
        onValueChange={onChangeActiveWorkspace}
      >
        <SelectTrigger className='mt-16 text-neutral-400 bg-transparent'>
          <SelectValue placeholder='Select a workspace' />
        </SelectTrigger>

        <SelectContent className='bg-[#111111] backdrop-blur-xl'>
          <SelectGroup>Workspaces</SelectGroup>
          <Separator />
          {data?.workSpaces?.map((workSpace) => (
            <SelectItem key={workSpace.id} value={workSpace.id}>
              {workSpace.name}
            </SelectItem>
          ))}

          {data?.members &&
            data?.members?.map(
              (member) =>
                data.workSpaces && (
                  <SelectItem
                    key={member.workSpace.id}
                    value={member.workSpace.id}
                  >
                    {member.workSpace.name}
                  </SelectItem>
                )
            )}
        </SelectContent>
      </Select>
    </div>
  );
}
