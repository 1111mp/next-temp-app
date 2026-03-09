// @vitest-environment node

import { beforeEach, describe, expect, test, vi } from 'vitest';
import { postRouter } from '@/server/api/routers/post';

describe('postRouter.create', () => {
  const mockCtx = {
    db: {
      post: {
        create: vi.fn(),
      },
    },
    session: {
      user: {
        id: 'user_1',
        name: 'test',
        email: 'test@example.com',
      },
    },
  } as any;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('✅ should create successfully', async () => {
    // mock database post
    const mockPost = { name: 'post', description: 'content' };
    mockCtx.db.post.create.mockResolvedValue(mockPost);

    const input = {
      name: 'post',
      description: 'content',
    };

    const result = await postRouter.createCaller(mockCtx).create(input);
    expect(result).toEqual(mockPost);

    expect(mockCtx.db.post.create).toHaveBeenCalledWith({
      data: {
        name: input.name,
        description: input.description,
        createdBy: {
          connect: { id: 'user_1' },
        },
      },
    });
  });
});
