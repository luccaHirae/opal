import { Metadata } from 'next';

export const WEBSITE_NAME = 'Opal';
export const WEBSITE_DESCRIPTION = 'Share AI powered videos with your friends.';
export const WEBSITE_METADATA: Metadata = {
  title: WEBSITE_NAME,
  description: WEBSITE_DESCRIPTION,
  openGraph: {
    title: WEBSITE_NAME,
    description: WEBSITE_DESCRIPTION,
    images: [
      {
        url: '/opal-logo.svg',
        width: 1200,
        height: 630,
        alt: WEBSITE_NAME,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: WEBSITE_NAME,
    description: WEBSITE_DESCRIPTION,
    images: ['/opal-logo.svg'],
  },
};
