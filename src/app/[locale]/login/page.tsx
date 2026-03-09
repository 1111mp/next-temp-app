'use client';

import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import {
  Button,
  Checkbox,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui';
import { NextLogo } from '@/components/next-logo';
import { useRouter } from '@/i18n/navigation';
import { z } from '@/lib/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserLoginInput, UserCreateOneInput } from '@/lib/validates';
import { authClient } from '@/server/better-auth/client';

enum TabKey {
  LoginComponent = 'sign-in',
  SignupComponent = 'sign-up',
}

export default function LoginPage() {
  const t = useTranslations('LoginPage');

  return (
    <>
      <div className='m-auto h-full max-w-md space-y-6 px-6 pt-8 md:pt-24'>
        <p className='flex flex-row items-center gap-2'>
          <NextLogo width='42' height='42' />
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
            <SignInPage />
          </TabsContent>
          <TabsContent value={TabKey.SignupComponent}>
            <SignUpPage />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}

function SignInPage() {
  const router = useRouter();

  const form = useForm<z.infer<typeof UserLoginInput>>({
    resolver: zodResolver(UserLoginInput),
    defaultValues: {
      email: '',
      password: '',
      remember: false,
    },
  });

  const onSubmit = async (value: z.infer<typeof UserLoginInput>) => {
    await authClient.signIn.email(
      {
        email: value.email,
        password: value.password,
        rememberMe: value.remember,
      },
      {
        onSuccess: () => {
          router.replace('/');
        },
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
      },
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='Enter your email' {...field} />
              </FormControl>
              <FormDescription>
                We&apos;ll never share your email with anyone else.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type='password'
                  placeholder='Enter your password'
                  {...field}
                />
              </FormControl>
              <FormDescription>
                We&apos;ll never share your password with anyone else too.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='remember'
          render={({ field }) => (
            <FormItem className='mt-2 flex items-center gap-2 space-y-0'>
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel>Remember me</FormLabel>
            </FormItem>
          )}
        />
        <Button className='mt-4' type='submit'>
          Sign in with Password
        </Button>
      </form>
      <div className='flex items-center space-x-2'>
        <Button
          className='mt-4'
          onClick={async () => {
            await authClient.signIn.social(
              {
                provider: 'github',
                callbackURL: '/',
              },
              {
                onError(ctx) {
                  toast.error(ctx.error.message);
                },
              },
            );
          }}
        >
          Sign in with Github
        </Button>
        <Button
          className='mt-4'
          onClick={async () => {
            await authClient.signIn.magicLink(
              {
                email: 'The1111mp@outlook.com',
                name: 'The1111mp',
              },
              {
                onSuccess(ctx) {
                  console.log('ctx', ctx);
                  toast.success(
                    'A sign in link has been send to your email address',
                  );
                },
                onError(ctx) {
                  toast.error(ctx.error.message);
                },
              },
            );
          }}
        >
          Sign in with Email
        </Button>
      </div>
    </Form>
  );
}

function SignUpPage() {
  const router = useRouter();
  const form = useForm<z.infer<typeof UserCreateOneInput>>({
    resolver: zodResolver(UserCreateOneInput),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      remember: false,
    },
  });

  const onSubmit = async (value: z.infer<typeof UserCreateOneInput>) => {
    await authClient.signUp.email(
      {
        name: value.name,
        email: value.email,
        password: value.password,
        // @ts-expect-error rememberMe is supported at runtime but missing from types
        rememberMe: value.remember,
      },
      {
        onSuccess() {
          router.replace('/');
        },
        onError(ctx) {
          toast.error(ctx.error.message);
        },
      },
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder='Enter your name' {...field} />
              </FormControl>
              <FormDescription>
                Name must be at least 3 characters long.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='Enter your email' {...field} />
              </FormControl>
              <FormDescription>
                We&apos;ll never share your email with anyone else.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type='password'
                  placeholder='Enter your password'
                  {...field}
                />
              </FormControl>
              <FormDescription>
                We&apos;ll never share your password with anyone else too.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='remember'
          render={({ field }) => (
            <FormItem className='mt-2 flex items-center gap-2 space-y-0'>
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel>Remember me</FormLabel>
            </FormItem>
          )}
        />
        <Button className='mt-4' data-testid='user-create-btn' type='submit'>
          Create Account with Password
        </Button>
      </form>
    </Form>
  );
}
