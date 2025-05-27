import { LandingPageNavbar } from '@/app/(website)/components/navbar';

export default function WebsiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex flex-col py-10 xl:px-0 container'>
      <LandingPageNavbar />
      {children}
    </div>
  );
}
