import { describe, expect, test, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import LoginPage from '@/app/[locale]/login/page';

/**
 * ? mock modules
 * https://cn.vitest.dev/api/vi.html#mock-modules
 */
vi.mock('@/navigation', () => {
  return {
    useRouter: vi.fn(),
  };
});

describe('page login', () => {
  test('en', () => {
    render(<LoginPage />);

    const signin = screen.getByTestId('signin');
    expect(signin).toBeDefined();
    expect(signin).toHaveTextContent('Sign in with Password');
  });
});
