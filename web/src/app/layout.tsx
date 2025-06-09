import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import { ThemeProvider } from '@/components/theme';
import { WEBSITE_METADATA } from '@/constants';
import { ReactQueryProvider } from '@/components/providers/react-query';
import { ReduxProvider } from '@/redux/provider';
import { Toaster } from 'sonner';
import './globals.css';

const manrope = Manrope({
  subsets: ['latin'],
});

export const metadata: Metadata = WEBSITE_METADATA;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang='en'>
        <body className={`${manrope.className} bg-[#171717] antialiased`}>
          <ThemeProvider
            attribute='class'
            defaultTheme='dark'
            disableTransitionOnChange
          >
            <ReduxProvider>
              <ReactQueryProvider>
                {children}
                <Toaster />
              </ReactQueryProvider>
            </ReduxProvider>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
