import { QueryClient } from '@tanstack/react-query';

export const QUERY_KEYS = {
  WORKSPACE_FOLDERS: 'workspace-folders',
  USER_VIDEOS: 'user-videos',
  USER_WORKSPACES: 'user-workspaces',
  USER_NOTIFICATIONS: 'user-notifications',
  GET_USERS: 'get-users',
};

export const MUTATION_KEYS = {
  INVITE_MEMBER: 'invite-member',
  CREATE_WORKSPACE: 'create-workspace',
  RENAME_FOLDER: 'rename-folder',
  CREATE_FOLDER: 'create-folder',
};

export const queryClient = new QueryClient();
