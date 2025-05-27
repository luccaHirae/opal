'use server';

import { client } from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs/server';

export const verifyAccessToWorkspace = async (workSpaceId: string) => {
  try {
    const user = await currentUser();

    if (!user)
      return {
        status: 403,
        message: 'User not authenticated',
      };

    const workSpace = await client.workSpace.findUnique({
      where: {
        id: workSpaceId,
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

    if (workSpace) {
      return {
        status: 200,
        data: workSpace,
      };
    }

    return {
      status: 403,
      data: null,
      message: 'Access denied to workSpace',
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

export const getUserWorkspaces = async () => {
  try {
    const user = await currentUser();

    if (!user)
      return {
        status: 403,
        message: 'User not authenticated',
      };

    const data = await client.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        subscription: {
          select: {
            plan: true,
          },
        },
        workSpace: {
          select: {
            id: true,
            name: true,
            type: true,
          },
        },
        members: {
          select: {
            workSpace: {
              select: {
                id: true,
                name: true,
                type: true,
              },
            },
          },
        },
      },
    });

    if (data) {
      return {
        status: 200,
        workSpaces: data.workSpace,
        members: data.members,
        subscription: data.subscription,
      };
    }

    return {
      status: 404,
      message: 'No workspaces found for this user',
    };
  } catch (err) {
    if (err instanceof Error) {
      return {
        status: 500,
        message: err.message,
      };
    }

    return {
      status: 500,
      message: 'An unexpected error occurred',
    };
  }
};
