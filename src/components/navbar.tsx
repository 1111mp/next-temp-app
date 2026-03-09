'use client';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui';
import { NextLogo } from './next-logo';
import { I18nSwitcher } from './intl-switcher';
import { ThemeSwitcher } from './theme-switcher';
import { useRouter } from '@/i18n/navigation';
import { authClient } from '@/server/better-auth/client';

import type { User } from 'better-auth';

type Props = {
  user?: User;
};

export function Navbar({ user }: Props) {
  const router = useRouter();

  return (
    <header className='border-grid bg-background/95 supports-backdrop-filter:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur'>
      <div className='flex h-14 items-center px-4'>
        <div className='flex-1'>
          <p className='flex items-center gap-2'>
            <NextLogo />
            <span className='text-lg font-bold'>Next.js</span>
          </p>
        </div>
        <nav className='flex items-center gap-2'>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar className='h-8 w-8'>
                <AvatarImage src={user?.image ?? ''} />
                <AvatarFallback>{user?.name}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuItem>Logged in as {user?.name}</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                Theme
                <DropdownMenuShortcut>
                  <ThemeSwitcher />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Language
                <DropdownMenuShortcut>
                  <I18nSwitcher />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={async () => {
                  await authClient.signOut({
                    fetchOptions: {
                      onSuccess: () => {
                        router.replace('/');
                      },
                    },
                  });
                }}
              >
                Log out
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </div>
    </header>
  );
}
