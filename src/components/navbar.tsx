'use client';

import { startTransition } from 'react';
import {
  LanguagesIcon,
  LogOutIcon,
  MonitorIcon,
  MoonIcon,
  PaletteIcon,
  SunIcon,
} from 'lucide-react';
import { useLocale } from 'next-intl';
import { useTheme } from 'next-themes';
import { useParams } from 'next/navigation';

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui';
import { NextLogo } from '@/components/icons';
import { usePathname, useRouter } from '@/i18n/navigation';
import { authClient } from '@/server/better-auth/client';

import type { User } from 'better-auth';

type Props = {
  user?: User;
};

enum Theme {
  System = 'system',
  Dark = 'dark',
  Light = 'light',
}

export function Navbar({ user }: Props) {
  const router = useRouter();
  const locale = useLocale();
  const params = useParams();
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  const onThemeChange = (value: string) => {
    startTransition(() => {
      setTheme(value);
    });
  };

  const onLanguageChange = (value: string) => {
    startTransition(() => {
      // @ts-expect-error -- TypeScript will validate that only known `params`
      // are used in combination with a given `pathname`. Since the two will
      // always match for the current route, we can skip runtime checks.
      router.replace({ pathname, params }, { locale: value });
    });
  };

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
            <DropdownMenuTrigger asChild>
              <Avatar>
                <AvatarImage src={user?.image ?? ''} />
                <AvatarFallback>{user?.name}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuGroup>
                <DropdownMenuLabel className='text-muted-foreground text-xs'>
                  My Account
                </DropdownMenuLabel>
                <DropdownMenuItem>Logged in as {user?.name}</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <PaletteIcon />
                    Theme
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      <DropdownMenuGroup>
                        <DropdownMenuLabel className='text-muted-foreground text-xs'>
                          Appearance
                        </DropdownMenuLabel>
                        <DropdownMenuRadioGroup
                          value={theme}
                          onValueChange={onThemeChange}
                        >
                          <DropdownMenuRadioItem value={Theme.System}>
                            <MonitorIcon />
                            System
                          </DropdownMenuRadioItem>
                          <DropdownMenuRadioItem value={Theme.Light}>
                            <SunIcon />
                            Light
                          </DropdownMenuRadioItem>
                          <DropdownMenuRadioItem value={Theme.Dark}>
                            <MoonIcon />
                            Dark
                          </DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                      </DropdownMenuGroup>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>
                    <LanguagesIcon />
                    Language
                  </DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      <DropdownMenuGroup>
                        <DropdownMenuLabel className='text-muted-foreground text-xs'>
                          Preferences
                        </DropdownMenuLabel>
                        <DropdownMenuRadioGroup
                          value={locale}
                          onValueChange={onLanguageChange}
                        >
                          <DropdownMenuRadioItem value='en'>
                            🇺🇸 English
                          </DropdownMenuRadioItem>
                          <DropdownMenuRadioItem value='zh-CN'>
                            🇨🇳 简体中文
                          </DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                      </DropdownMenuGroup>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem
                  variant='destructive'
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
                  <LogOutIcon />
                  Log out
                  <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </nav>
      </div>
    </header>
  );
}
