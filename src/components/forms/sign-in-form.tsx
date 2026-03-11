'use client';

import { useTransition } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoaderCircle } from 'lucide-react';
import { toast } from 'sonner';

import {
  Button,
  Checkbox,
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
  Input,
  PasswordInput,
} from '@/components/ui';
import { z } from '@/lib/zod';
import { UserLoginInput } from '@/lib/validates';
import { authClient } from '@/server/better-auth/client';

type SignInFormProps = {
  callbackURL?: string;
  params?: URLSearchParams;
  showPasswordToggle?: boolean;
  onSuccessAction?: () => void;
};

function SignInForm({
  callbackURL = '/',
  params,
  showPasswordToggle = false,
  onSuccessAction,
}: SignInFormProps) {
  const [loading, startTransition] = useTransition();

  const form = useForm<z.infer<typeof UserLoginInput>>({
    resolver: zodResolver(UserLoginInput),
    defaultValues: {
      email: '',
      password: '',
      remember: false,
    },
  });

  const onSubmit = (value: z.infer<typeof UserLoginInput>) => {
    startTransition(async () => {
      await authClient.signIn.email(
        {
          email: value.email,
          password: value.password,
          rememberMe: value.remember,
          callbackURL,
        },
        {
          query: params ? Object.fromEntries(params.entries()) : undefined,
          onSuccess: () => {
            toast.success('Successfully signed in');
            onSuccessAction?.();
          },
          onError: (ctx) => {
            toast.error(ctx.error.message);
          },
        },
      );
    });
  };

  return (
    <>
      <form id='form-sign-in' onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup className='gap-2'>
          <Controller
            name='email'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor='form-sign-in-email'>Email</FieldLabel>
                <Input
                  {...field}
                  id='form-sign-in-email'
                  placeholder='Enter your email'
                  aria-invalid={fieldState.invalid}
                />
                <FieldDescription>
                  We&apos;ll never share your email with anyone else.
                </FieldDescription>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name='password'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor='form-sign-in-password'>
                  Password
                </FieldLabel>
                {showPasswordToggle ? (
                  <PasswordInput
                    {...field}
                    id='sign-in-password'
                    placeholder='Password'
                    aria-invalid={fieldState.invalid}
                    autoComplete='current-password'
                  />
                ) : (
                  <Input
                    {...field}
                    id='sign-in-password'
                    type='password'
                    placeholder='password'
                    aria-invalid={fieldState.invalid}
                    autoComplete='current-password'
                  />
                )}
                <FieldDescription>
                  We&apos;ll never share your password with anyone else too.
                </FieldDescription>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name='remember'
            control={form.control}
            render={({ field, fieldState }) => (
              <FieldSet data-invalid={fieldState.invalid}>
                <FieldGroup>
                  <Field
                    orientation='horizontal'
                    data-invalid={fieldState.invalid}
                  >
                    <Checkbox
                      name={field.name}
                      id='form-sign-in-remember'
                      aria-invalid={fieldState.invalid}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <FieldContent>
                      <FieldLabel htmlFor='form-sign-in-remember'>
                        Remember me
                      </FieldLabel>
                    </FieldContent>
                  </Field>
                </FieldGroup>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </FieldSet>
            )}
          />
        </FieldGroup>
      </form>
      <Field orientation='horizontal' className='mt-3 flex-wrap'>
        <Button
          className='w-full'
          type='submit'
          form='form-sign-in'
          disabled={loading}
        >
          {loading && <LoaderCircle size={16} className='animate-spin' />}
          Sign in with Password
        </Button>
        <Button
          disabled={loading}
          className='flex-1'
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
          disabled={loading}
          className='flex-1'
          onClick={async () => {
            await authClient.signIn.magicLink(
              {
                email: 'The1111mp@outlook.com',
                name: 'The1111mp',
              },
              {
                onSuccess() {
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
      </Field>
    </>
  );
}

export { SignInForm };
