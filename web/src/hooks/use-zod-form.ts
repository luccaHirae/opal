import { UseMutateFunction } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z, { ZodSchema } from 'zod';

export function useZodForm<T extends ZodSchema>(
  schema: T,
  mutate: UseMutateFunction<unknown, unknown, z.infer<T>, unknown>,
  defaultValues?: z.infer<T>
) {
  const form = useForm<z.infer<T>>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const onSubmit = form.handleSubmit(async (data) => mutate(data));

  return {
    ...form,
    onSubmit,
  };
}
