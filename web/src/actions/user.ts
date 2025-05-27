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
