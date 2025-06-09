import { Link2Icon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface CopyLinkProps {
  videoId: string;
  className?: string;
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link';
}

export const handleCopy = (videoId: string) => {
  const url = `${
    process.env.NEXT_PUBLIC_HOST_URL ?? window.location.origin
  }/video/${videoId}`;

  navigator.clipboard
    .writeText(url)
    .then(() => {
      alert('Link copied to clipboard!');
    })
    .catch((err) => {
      console.error('Failed to copy link: ', err);
    });

  return toast('Copied', {
    description: 'Link copied to clipboard!',
  });
};

export function CopyLink({
  videoId,
  className,
  variant = 'default',
}: CopyLinkProps) {
  return (
    <Button
      variant={variant}
      onClick={handleCopy.bind(null, videoId)}
      className={className}
    >
      <Link2Icon size={20} className='text-[#a4a4a4]' />
    </Button>
  );
}
