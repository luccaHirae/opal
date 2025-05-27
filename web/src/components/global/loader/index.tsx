import { cn } from '@/lib/utils';
import { Loader2Icon } from 'lucide-react';

interface LoaderProps {
  state: boolean;
  className?: string;
  color?: string;
  children?: React.ReactNode;
}

export function Loader({ state, className, color, children }: LoaderProps) {
  return state ? (
    <div className={cn(className)}>
      <Loader2Icon className={cn('animate-spin', color)} />
    </div>
  ) : (
    children
  );
}
