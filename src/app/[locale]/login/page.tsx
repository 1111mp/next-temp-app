'use client';

import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui';
import { SignInForm, SignUpForm } from '@/components/forms';
import { NextLogo } from '@/components/icons';
import { useRouter } from '@/i18n/navigation';

enum TabKey {
  LoginComponent = 'sign-in',
  SignupComponent = 'sign-up',
}

export default function LoginPage() {
  const params = useSearchParams();
  const router = useRouter();
  const t = useTranslations('LoginPage');

  return (
    <>
      <div className='m-auto h-full max-w-md space-y-6 px-6 pt-8 md:pt-24'>
        <p className='flex flex-row items-center gap-2'>
          <NextLogo className='h-10.5 w-10.5' />
          <span className='text-2xl font-bold'>Next.js</span>
        </p>
        <Tabs defaultValue={TabKey.LoginComponent}>
          <TabsList>
            <TabsTrigger value={TabKey.LoginComponent}>
              {t('Sign-in')}
            </TabsTrigger>
            <TabsTrigger value={TabKey.SignupComponent}>
              {t('Sign-up')}
            </TabsTrigger>
          </TabsList>
          <TabsContent value={TabKey.LoginComponent}>
            <SignInForm
              showPasswordToggle
              params={params}
              onSuccessAction={() => router.replace('/')}
            />
          </TabsContent>
          <TabsContent value={TabKey.SignupComponent}>
            <SignUpForm
              params={params}
              onSuccessAction={() => router.replace('/')}
            />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
