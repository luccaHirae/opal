import { Button } from '@/components/ui/button';
import { WEBSITE_NAME } from '@/constants';
import { MenuIcon, UserIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export function LandingPageNavbar() {
  return (
    <div className='flex w-full justify-between items-center'>
      <div className='text-3xl font-semibold flex items-center gap-x-3'>
        <MenuIcon className='size-6' />
        <Image alt='logo' src='/opal-logo.svg' width={40} height={40} />
        {WEBSITE_NAME}
      </div>

      <div className='hidden gap-x-10 items-center lg:flex'>
        <Link
          href='/'
          className='bg-[#7320DD] py-2 px-5 font-semibold text-lg rounded-full hover:bg-[#7320DD]/80'
        >
          Home
        </Link>
        <Link href='#pricing'>Pricing</Link>
        <Link href='#contact'>Contact</Link>
      </div>

      <Link href='/auth/sign-in'>
        <Button className='text-base flex gap-x-2'>
          <UserIcon fill='#000' />
          Login
        </Button>
      </Link>
    </div>
  );
}
