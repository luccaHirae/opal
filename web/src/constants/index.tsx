import {
  BellIcon,
  CreditCardIcon,
  FileIcon,
  HouseIcon,
  SettingsIcon,
} from 'lucide-react';
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

export const MENU_ITEMS = (
  workspaceId: string
): {
  title: string;
  href: string;
  icon: React.ReactNode;
}[] => [
  {
    title: 'Home',
    href: `/dashboard/${workspaceId}/home`,
    icon: <HouseIcon />,
  },
  {
    title: 'My Library',
    href: `/dashboard/${workspaceId}`,
    icon: <FileIcon />,
  },
  {
    title: 'Notifications',
    href: `/dashboard/${workspaceId}/notifications`,
    icon: <BellIcon />,
  },
  {
    title: 'Billing',
    href: `/dashboard/${workspaceId}/billing`,
    icon: <CreditCardIcon />,
  },
  {
    title: 'Settings',
    href: `/dashboard/${workspaceId}/settings`,
    icon: <SettingsIcon />,
  },
];
