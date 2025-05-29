import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface GlobalCardProps {
  title: string;
  description: string;
  children?: React.ReactNode;
  footer?: React.ReactNode;
}

export function GlobalCard({
  title,
  description,
  children,
  footer,
}: GlobalCardProps) {
  return (
    <Card className='bg-transparent mt-4'>
      <CardHeader className='p-4'>
        <CardTitle className='text-base text-[#9d9d9d]'>{title}</CardTitle>
        <CardDescription className='text-[#707070]'>
          {description}
        </CardDescription>
      </CardHeader>
      {children && <CardContent className='p-4'>{children}</CardContent>}
      {footer && <CardFooter className='p-4'>{footer}</CardFooter>}
    </Card>
  );
}
