'use server';

import { client } from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs/server';

export const verifyAccessToWorkspace = async (workspaceId: string) => {
  try {
    const user = await currentUser();

    if (!user)
      return {
        status: 403,
        message: 'User not authenticated',
      };

    const workspace = await client.workSpace.findUnique({
      where: {
        id: workspaceId,
        OR: [
          {
            user: {
              clerkId: user.id,
            },
          },
          {
            members: {
              every: {
                user: {
                  clerkId: user.id,
                },
              },
            },
          },
        ],
      },
    });

    if (workspace) {
      return {
        status: 200,
        data: workspace,
      };
    }

    return {
      status: 403,
      data: null,
      message: 'Access denied to workspace',
    };
  } catch (err) {
    if (err instanceof Error) {
      return {
        status: 500,
        data: null,
        message: err.message,
      };
    }

    return {
      status: 500,
      data: null,
      message: 'An unexpected error occurred',
    };
  }
};

export const getWorkspaceFolders = async (workSpaceId: string) => {
  try {
    const isFolders = await client.folder.findMany({
      where: {
        workSpaceId,
      },
      include: {
        _count: {
          select: {
            videos: true,
          },
        },
      },
    });

    if (isFolders && isFolders.length > 0) {
      return {
        status: 200,
        data: isFolders,
      };
    }

    return {
      status: 404,
      data: [],
      message: 'No folders found for this workspace',
    };
  } catch (err) {
    if (err instanceof Error) {
      return {
        status: 500,
        data: [],
        message: err.message,
      };
    }

    return {
      status: 500,
      data: [],
      message: 'An unexpected error occurred',
    };
  }
};
