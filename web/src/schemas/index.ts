import { z } from 'zod';

export const workspaceFormSchema = z.object({
  name: z.string().min(1, { message: 'Workspace name is required' }),
});

export const moveVideoSchema = z.object({
  folderId: z.string().optional(),
  workspaceId: z.string(),
});
