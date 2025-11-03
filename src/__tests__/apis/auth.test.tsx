// @vitest-environment node

import { beforeEach, describe, expect, test, vi } from 'vitest';
import { env } from '@/env.js';
import { userRouter } from '@/server/api/routers/user';
import { TRPCError } from '@trpc/server';

describe('userRouter.login', () => {
  const mockCtx = {
    db: {
      user: {
        login: vi.fn(),
      },
    },
    session: {
      user: null,
      save: vi.fn(),
      updateConfig: vi.fn(),
    },
  } as any;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('✅ should login successfully', async () => {
    // mock database user
    const mockUser = { id: 1, email: 'a@b.com', name: 'test' };
    mockCtx.db.user.login.mockResolvedValue(mockUser);

    const input = {
      email: env.TEST_USER_EMAIL,
      password: env.TEST_USER_PASSWORD,
      remember: true,
    };

    const result = await userRouter.createCaller(mockCtx).login(input);

    expect(result).toEqual(mockUser);
    expect(mockCtx.session.user).toEqual(mockUser);
    expect(mockCtx.session.save).toHaveBeenCalled();
    expect(mockCtx.session.updateConfig).toHaveBeenCalled();
  });

  test('❌ should throw error when user not found', async () => {
    mockCtx.db.user.login.mockResolvedValue(null);

    const input = {
      email: env.TEST_USER_EMAIL,
      password: env.TEST_USER_PASSWORD,
      remember: false,
    };

    await expect(userRouter.createCaller(mockCtx).login(input)).rejects.toThrow(
      TRPCError,
    );

    await expect(
      userRouter.createCaller(mockCtx).login(input),
    ).rejects.toMatchObject({
      message: 'Invalid account or password',
    });

    expect(mockCtx.session.save).not.toHaveBeenCalled();
  });
});
