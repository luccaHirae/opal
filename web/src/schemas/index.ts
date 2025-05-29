import { z } from 'zod';

export const workspaceFormSchema = z.object({
  name: z.string().min(1, { message: 'Workspace name is required' }),
});
