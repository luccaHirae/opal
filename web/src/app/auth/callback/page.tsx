import { onAuthenticateUser } from '@/actions/user';
import { redirect } from 'next/navigation';

export default async function AuthCallbackPage() {
  const auth = await onAuthenticateUser();

  if (auth.status === 200 || auth.status === 201) {
    return redirect(`/dashboard/${auth.user?.workSpace[0].id}`);
  }

  if (auth.status === 403) {
    return redirect('/sign-in');
  }

  if (auth.status === 500) {
    return (
      <div className='container flex flex-col items-center justify-center h-screen'>
        <h1 className='text-2xl font-bold'>Error</h1>
        <p className='mt-4'>
          An error occurred while authenticating. Please try again later.
        </p>
      </div>
    );
  }
}
