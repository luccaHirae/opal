import { UseMutateFunction } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z, { ZodSchema } from 'zod';

export function useZodForm<T extends ZodSchema>(
  schema: T,
  mutation: UseMutateFunction,
  defaultValues: z.infer<T>
) {
  const form = useForm<z.infer<T>>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const onSubmit = form.handleSubmit(async (data) => mutation(data));

  return {
    ...form,
    onSubmit,
  };
}
