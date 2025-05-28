import { useSearch } from '@/hooks/use-search';
import { QUERY_KEYS } from '@/lib/react-query';
import { Input } from '@/components/ui/input';
import { Skeleton } from '../ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { UserIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { Loader } from './loader';

interface UsersSearchProps {
  workspaceId: string;
}

export function UsersSearch({}: UsersSearchProps) {
  const { query, onSearchQuery, isFetching, onUsers } = useSearch(
    QUERY_KEYS.GET_USERS,
    'USERS'
  );

  // TODO: Implement the mutation for inviting a member
  // const { mutate, isPending } = useMutation({
  //   mutationKey: [MUTATION_KEYS.INVITE_MEMBER],
  //   mutationFn: (data: { receiverId: string; email: string }) => 0,
  // })

  return (
    <div className='flex flex-col gap-y-5'>
      <Input
        onChange={onSearchQuery}
        value={query}
        type='text'
        placeholder='Search for users'
        className='bg-transparent border-2 outline-none'
      />
      {isFetching ? (
        <div className='flex flex-col gap-y-2'>
          <Skeleton className='w-full h-8 rounded-xl' />
        </div>
      ) : !onUsers ? (
        <p className='text-center text-sm text-[#a4a4a4]'>
          No users found. Please try a different search term.
        </p>
      ) : (
        <div>
          {onUsers.map((user) => (
            <div
              key={user.id}
              className='flex gap-x-3 items-center border-2 w-full p-3 rounded-xl'
            >
              <Avatar>
                <AvatarImage
                  src={user.image ?? ''}
                  alt={`${user.firstName} ${user.lastName}`}
                />
                <AvatarFallback>
                  <UserIcon />
                </AvatarFallback>
              </Avatar>

              <div className='flex flex-col items-start'>
                <h3 className='text-border text-lg capitalize'>
                  {user.firstName} {user.lastName}
                </h3>
                <p className='lowercase text-xs bg-white px-2 rounded-lg text-[#1e1e1e]'>
                  {user.subscription?.plan}
                </p>
              </div>

              <div className='flex-1 flex justify-end items-center'>
                <Button variant='default' className='w-5/12 font-bold'>
                  <Loader state={false} color='#000'>
                    Invite
                  </Loader>
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
