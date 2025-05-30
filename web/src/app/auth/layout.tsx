export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='container h-screen flex justify-center items-center'>
      {children}
    </div>
  );
}
