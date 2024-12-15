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
import { useRouter } from '@/i18n/routing';

import type { SessionUser } from '@/lib/session';

type Props = {
  user?: SessionUser;
};

export function Navbar({ user }: Props) {
  const router = useRouter();

  const onSignout = async () => {
    const ret = await fetch('/api/auth/signout', { method: 'POST' });
    ret.status === 200 && router.replace('/login');
  };

  return (
    <header className='border-grid sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
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
                <AvatarImage src='https://avatars.githubusercontent.com/u/31227919?v=4' />
                <AvatarFallback>The1111mp</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
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
              <DropdownMenuItem onClick={onSignout}>
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
