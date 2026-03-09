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
    useRouter: () => ({
      replace: vi.fn(),
      push: vi.fn(),
    }),
  };
});

vi.mock('next-intl', () => ({
  useTranslations: () => (key: string) => {
    const dict: Record<string, string> = {
      'LoginPage.Sign-in': 'Sign-in',
      'LoginPage.Sign-up': 'Sign-up',
    };
    return dict[key] || key;
  },
}));

// ✅ Mock better-auth/client
vi.mock('@/server/better-auth/client', () => ({
  authClient: {
    signIn: {
      email: vi.fn(),
      magicLink: vi.fn(),
      social: vi.fn(),
    },
    signUp: {
      email: vi.fn(),
    },
  },
}));

describe('page login', () => {
  test('should render login button', () => {
    render(<LoginPage />);

    const loginBtn = screen.getByRole('button', {
      name: /sign in with password/i,
    });

    expect(loginBtn).toBeDefined();
    expect(loginBtn).toHaveTextContent('Sign in with Password');
  });
});
