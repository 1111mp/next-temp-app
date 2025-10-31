'use client';

import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
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
import { UserLoginInput, UserCreateOneInput } from '@/lib/validates';
import { z } from '@/lib/zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { api } from '@/trpc/react';

enum TabKey {
  LoginComponent = 'login',
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
              {t('Log-in')}
            </TabsTrigger>
            <TabsTrigger value={TabKey.SignupComponent}>
              {t('Sign-up')}
            </TabsTrigger>
          </TabsList>
          <TabsContent value={TabKey.LoginComponent}>
            <Login />
          </TabsContent>
          <TabsContent value={TabKey.SignupComponent}>
            <Signup />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}

function Login() {
  const router = useRouter();
  const form = useForm<z.infer<typeof UserLoginInput>>({
    resolver: zodResolver(UserLoginInput),
    defaultValues: {
      email: '',
      password: '',
      remember: false,
    },
  });
  const login = api.user.login.useMutation({
    trpc: {
      context: {
        skipStream: true,
      },
    },
    onSuccess() {
      router.replace('/');
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  const onSubmit = async (values: z.infer<typeof UserLoginInput>) => {
    login.mutate(values);
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
        <Button className='mt-4' data-testid='user-login-btn' type='submit'>
          Log In with Password
        </Button>
      </form>
    </Form>
  );
}

function Signup() {
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
  const create = api.user.create.useMutation({
    trpc: {
      context: {
        skipStream: true,
      },
    },
    onSuccess() {
      router.replace('/');
    },
    onError(error) {
      toast.error(error.message);
    },
  });

  const onSubmit = async (values: z.infer<typeof UserCreateOneInput>) => {
    create.mutate(values);
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
