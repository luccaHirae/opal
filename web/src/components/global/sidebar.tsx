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
import { usePathname, useRouter } from 'next/navigation';
import { Separator } from '@/components/ui/separator';
import { QUERY_KEYS } from '@/lib/react-query';
import { getUserWorkspaces } from '@/actions/workspace';
import { useQuery } from '@tanstack/react-query';
import { Modal } from '@/components/global/modal';
import { MenuIcon, PlusCircleIcon } from 'lucide-react';
import { UsersSearch } from '@/components/global/user-search';
import { MENU_ITEMS } from '@/constants';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { getUserNotifications } from '@/actions/user';
import { GlobalCard } from '@/components/global/global-card';
import { Button } from '@/components/ui/button';
import { Loader } from '@/components/global/loader';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

interface SidebarProps {
  activeWorkSpaceId: string;
}

export function Sidebar({ activeWorkSpaceId }: SidebarProps) {
  const router = useRouter();
  const pathname = usePathname();

  const { data } = useQuery({
    queryKey: [QUERY_KEYS.USER_WORKSPACES],
    queryFn: getUserWorkspaces,
    enabled: !!activeWorkSpaceId,
  });

  const { data: notificationsData } = useQuery({
    queryKey: [QUERY_KEYS.USER_NOTIFICATIONS],
    queryFn: getUserNotifications,
    enabled: !!activeWorkSpaceId,
  });

  const onChangeActiveWorkspace = (value: string) => {
    router.push(`/dashboard/${value}`);
  };

  const currentWorkSpace = data?.workSpaces?.find(
    (workSpace) => workSpace.id === activeWorkSpaceId
  );

  const menuItems = MENU_ITEMS(activeWorkSpaceId);

  const SidebarSection = (
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

      {currentWorkSpace?.type === 'PUBLIC' &&
        data?.subscription?.plan === 'PRO' && (
          <Modal
            title='Invite To Workspace'
            description='Invite other users to your workspace'
            trigger={
              <span className='text-sm cursor-pointer flex items-center justify-center bg-neutral-800/90 hover:bg-neutral-800/60 w-full rounded-sm p-[5px] gap-2'>
                <PlusCircleIcon
                  size={15}
                  className='text-neutral-800/90 fill-neutral-500'
                />
                <span className='text-neutral-400 font-semibold text-xs'>
                  Invite To Workspace
                </span>
              </span>
            }
          >
            <UsersSearch workspaceId={activeWorkSpaceId} />
          </Modal>
        )}

      <p className='w-full text-[#9d9d9d] font-bold mt-4'>Menu</p>

      <nav className='w-full'>
        <ul>
          {menuItems.map((item) => (
            <SidebarItem
              href={item.href}
              icon={item.icon}
              selected={pathname === item.href}
              title={item.title}
              key={item.title}
              notifications={
                (item.title === 'Notifications' && notificationsData?.count) ||
                0
              }
            />
          ))}
        </ul>
      </nav>

      <Separator className='w-4/5' />

      <p className='w-full text-[#9d9d9d] font-bold mt-4'>Workspaces</p>

      {data?.workSpaces?.length === 1 && data.members?.length === 0 && (
        <div className='w-full mt-[-10px]'>
          <p className='text-[#3c3c3c] font-medium text-sm'>
            {data?.subscription?.plan === 'FREE'
              ? 'Upgrade to create workspaces'
              : 'No workspaces.'}
          </p>
        </div>
      )}

      <nav className='w-full'>
        <ul className='h-[150px] overflow-auto overflow-x-hidden fade-layer'>
          {data?.workSpaces &&
            data?.workSpaces?.length > 0 &&
            data?.workSpaces?.map(
              (workSpace) =>
                workSpace.type !== 'PERSONAL' && (
                  <SidebarItem
                    href={`/dashboard/${workSpace.id}`}
                    selected={pathname === `/dashboard/${workSpace.id}`}
                    title={workSpace.name}
                    notifications={0}
                    key={workSpace.name}
                    icon={
                      <WorkspacePlaceholder>
                        {workSpace.name.charAt(0)}
                      </WorkspacePlaceholder>
                    }
                  />
                )
            )}

          {data?.members &&
            data.members?.length > 0 &&
            data.members.map((member) => (
              <SidebarItem
                href={`/dashboard/${member.workSpace.id}`}
                selected={pathname === `/dashboard/${member.workSpace.id}`}
                title={member.workSpace.name}
                notifications={0}
                key={member.workSpace.name}
                icon={
                  <WorkspacePlaceholder>
                    {member.workSpace.name.charAt(0)}
                  </WorkspacePlaceholder>
                }
              />
            ))}
        </ul>
      </nav>

      <Separator className='w-4/5' />

      {data?.subscription?.plan === 'FREE' && (
        <GlobalCard
          title='Upgrate To Pro'
          description='Unlock AI features like transcription, AI summary, and more.'
          footer={
            <Button className='text-sm w-full mt-2'>
              <Loader state={false}>Upgrade</Loader>
            </Button>
          }
        />
      )}
    </div>
  );

  return (
    <div className='h-full'>
      <div className='md:hidden fixed my-4'>
        <Sheet>
          <SheetTrigger asChild className='ml-2'>
            <Button variant='ghost' className='mt-[2px]'>
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent side='left' className='p-0 w-fit h-full'>
            {SidebarSection}
          </SheetContent>
        </Sheet>
      </div>

      <div className='md:block hidden h-full'>{SidebarSection}</div>
    </div>
  );
}

interface SidebarItemProps {
  title: string;
  href: string;
  icon: React.ReactNode;
  selected: boolean;
  notifications?: number;
}

export function SidebarItem({
  title,
  href,
  icon,
  selected,
}: // notifications = 0,
SidebarItemProps) {
  return (
    <li className='cursor-pointer my-[5px]'>
      <Link
        href={href}
        className={cn(
          'flex items-center justify-between group rounded-lg hover:bg-[#1d1d1d]',
          selected ? 'bg-[#1d1d1d]' : ''
        )}
      >
        <div className='flex items-center gap-2 transition-all p-[5px] cursor-pointer'>
          {icon}
          <span
            className={cn(
              'font-medium group-hover:text-[#9d9d9d] transition-all truncate w-32',
              selected ? 'text-[#9d9d9d]' : 'text-[#545454]'
            )}
          >
            {title}
          </span>
        </div>
      </Link>
    </li>
  );
}

export function WorkspacePlaceholder({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <span className='bg-[#545454] flex items-center font-bold justify-center w-8 px-2 h-7 rounded-sm text-[#1d1d1d]'>
      {children}
    </span>
  );
}
