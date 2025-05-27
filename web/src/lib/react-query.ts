import { QueryClient } from '@tanstack/react-query';

// Query Keys
export const QUERY_KEYS = {
  WORKSPACE_FOLDERS: 'workspace-folders',
  USER_VIDEOS: 'user-videos',
  USER_WORKSPACES: 'user-workspaces',
  USER_NOTIFICATIONS: 'user-notifications',
};

export const queryClient = new QueryClient();
