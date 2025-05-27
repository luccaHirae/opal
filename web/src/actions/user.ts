'use server';

import { client } from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs/server';

export const onAuthenticateUser = async () => {
  try {
    const user = await currentUser();

    if (!user) {
      return {
        status: 403,
        message: 'User not authenticated',
      };
    }

    const existingUser = await client.user.findUnique({
      where: {
        clerkId: user.id,
      },
      include: {
        workSpace: {
          where: {
            user: {
              clerkId: user.id,
            },
          },
        },
      },
    });

    if (existingUser) {
      return {
        status: 200,
        user: existingUser,
      };
    }

    const newUser = await client.user.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
        firstName: user.firstName,
        lastName: user.lastName,
        image: user.imageUrl,
        media: {
          create: {},
        },
        subscription: {
          create: {},
        },
        workSpace: {
          create: {
            name: `${user.firstName}'s Workspace`,
            type: 'PERSONAL',
          },
        },
      },
      include: {
        workSpace: true,
        subscription: {
          select: {
            plan: true,
          },
        },
      },
    });

    return {
      status: 201,
      user: newUser,
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

export const getUserVideos = async (workSpaceId: string) => {
  try {
    const user = await currentUser();

    if (!user)
      return {
        status: 403,
        message: 'User not authenticated',
      };

    const videos = await client.video.findMany({
      where: {
        OR: [{ workSpaceId }, { folderId: workSpaceId }],
      },
      select: {
        id: true,
        title: true,
        createdAt: true,
        source: true,
        processing: true,
        folder: {
          select: {
            id: true,
            name: true,
          },
        },
        user: {
          select: {
            firstName: true,
            lastName: true,
            image: true,
          },
        },
      },
      orderBy: {
        createdAt: 'asc',
      },
    });

    if (videos && videos.length > 0) {
      return {
        status: 200,
        data: videos,
      };
    }

    return {
      status: 404,
      data: [],
      message: 'No videos found',
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

export const getUserNotifications = async () => {
  try {
    const user = await currentUser();

    if (!user)
      return {
        status: 403,
        message: 'User not authenticated',
      };

    const notifications = await client.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        notifications: true,
        _count: {
          select: {
            notifications: true,
          },
        },
      },
    });

    if (notifications && notifications.notifications.length > 0) {
      return {
        status: 200,
        data: notifications,
      };
    }

    return {
      status: 404,
      data: [],
      message: 'No notifications found',
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
