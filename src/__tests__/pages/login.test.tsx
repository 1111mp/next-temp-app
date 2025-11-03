import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  test,
  vi,
} from 'vitest';
import { render, screen } from '@testing-library/react';
import LoginPage from '@/app/[locale]/login/page';

// 🧩 mock ResizeObserver
class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

beforeAll(() => {
  vi.stubGlobal('ResizeObserver', ResizeObserverMock);
});

afterAll(() => {
  vi.unstubAllGlobals();
});

afterEach(() => {
  vi.clearAllMocks();
});

/**
 * ? mock modules
 * https://cn.vitest.dev/api/vi.html#mock-modules
 */
vi.mock('@/i18n/navigation', () => {
  return {
    useRouter: vi.fn(),
  };
});

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const dict: Record<string, string> = {
      'LoginPage.Log-in': 'Log-in',
      'LoginPage.Sign-up': 'Sign-up',
    };
    return dict[key] || key;
  },
}));

// ✅ Mock tRPC
vi.mock('@/trpc/react', () => ({
  api: {
    user: {
      login: {
        useMutation: vi.fn(() => ({
          mutate: vi.fn(),
          isPending: false,
        })),
      },
      create: {
        useMutation: vi.fn(() => ({
          mutate: vi.fn(),
          isPending: false,
        })),
      },
    },
  },
}));

describe('page login', () => {
  test('en', () => {
    render(<LoginPage />);

    const login = screen.getByTestId('user-login-btn');
    expect(login).toBeDefined();
    expect(login).toHaveTextContent('Log In with Password');
  });
});
