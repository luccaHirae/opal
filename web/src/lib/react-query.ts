import { QueryClient } from '@tanstack/react-query';

export const QUERY_KEYS = {
  WORKSPACE_FOLDERS: 'workspace-folders',
  USER_VIDEOS: 'user-videos',
  USER_WORKSPACES: 'user-workspaces',
  USER_NOTIFICATIONS: 'user-notifications',
  GET_USERS: 'get-users',
  FOLDER_VIDEOS: 'folder-videos',
  FOLDER_DETAILS: 'folder-details',
  PREVIEW_VIDEO: 'preview-video',
};

export const MUTATION_KEYS = {
  INVITE_MEMBER: 'invite-member',
  CREATE_WORKSPACE: 'create-workspace',
  RENAME_FOLDER: 'rename-folder',
  CREATE_FOLDER: 'create-folder',
  CHANGE_VIDEO_LOCATION: 'change-video-location',
};

export const queryClient = new QueryClient();
