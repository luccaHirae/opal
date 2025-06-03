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
    const folders = await client.folder.findMany({
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

    if (folders && folders.length > 0) {
      return {
        status: 200,
        folders,
      };
    }

    return {
      status: 404,
      message: 'No folders found for this workspace',
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

export const createWorkspace = async (name: string) => {
  try {
    const user = await currentUser();

    if (!user) {
      return {
        status: 403,
        message: 'User not authenticated',
      };
    }

    const userWithSubscription = await client.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        subscription: {
          select: {
            plan: true,
          },
        },
      },
    });

    if (userWithSubscription?.subscription?.plan === 'PRO') {
      const updatedUser = await client.user.update({
        where: {
          clerkId: user.id,
        },
        data: {
          workSpace: {
            create: {
              name,
              type: 'PUBLIC',
            },
          },
        },
      });

      if (updatedUser) {
        return {
          status: 201,
          user: updatedUser,
          message: 'Workspace created successfully',
        };
      }
    }

    return {
      status: 403,
      message: 'You need a PRO subscription to create a workspace',
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

export const renameFolder = async (folderId: string, name: string) => {
  try {
    const folder = await client.folder.update({
      where: {
        id: folderId,
      },
      data: {
        name,
      },
    });

    if (folder) {
      return {
        status: 200,
        folder,
      };
    }

    return {
      status: 404,
      message: 'Folder not found',
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

export const createFolder = async (workspaceId: string) => {
  try {
    const workspace = await client.workSpace.update({
      where: {
        id: workspaceId,
      },
      data: {
        folders: {
          create: {
            name: 'Untitled',
          },
        },
      },
    });

    if (workspace) {
      return {
        status: 201,
        workspace,
        message: 'Folder created successfully',
      };
    }

    return {
      status: 404,
      message: 'Workspace not found',
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
