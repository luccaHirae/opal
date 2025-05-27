import { Loader } from '@/components/global/loader';

export default function AuthCallbackLoading() {
  return (
    <div className='h-screen w-full flex justify-center items-center'>
      <Loader state />
    </div>
  );
}
