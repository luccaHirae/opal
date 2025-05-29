import { SearchIcon, UploadIcon, VideoIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { UserButton } from '@clerk/nextjs';

export function InfoBar() {
  return (
    <header className='pl-20 md:pl-[265px] fixed p-4 w-full flex items-center justify-between gap-4'>
      <div className='flex gap-4 justify-center items-center border-2 rounded-full px-4 w-full max-w-lg'>
        <SearchIcon size={25} className='text-[#707070]' />
        <Input
          placeholder='Search for people, projects, tags & folders'
          className='bg-transparent border-none placeholder-neutral-500'
        />
      </div>

      <div className='flex items-center gap-4'>
        <Button className='bg-[#9d9d9d] flex items-center gap-2'>
          <UploadIcon size={20} />{' '}
          <span className='flex items-center gap-2'>Upload</span>
        </Button>

        <Button className='bg-[#9d9d9d] flex items-center gap-2'>
          <VideoIcon size={20} />{' '}
          <span className='flex items-center gap-2'>Record</span>
        </Button>

        <UserButton />
      </div>
    </header>
  );
}
