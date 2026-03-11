'use client';

import { useTransition } from 'react';
import { LoaderCircle } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
} from '@/components/ui';
import { z } from '@/lib/zod';
import { UserCreateOneInput } from '@/lib/validates';
import { authClient } from '@/server/better-auth/client';

type SignUpFormProps = {
  callbackURL?: string;
  params?: URLSearchParams;
  onSuccessAction?: () => void;
};

function SignUpForm({ callbackURL, params, onSuccessAction }: SignUpFormProps) {
  const [loading, startTransition] = useTransition();

  const form = useForm<z.infer<typeof UserCreateOneInput>>({
    resolver: zodResolver(UserCreateOneInput),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      remember: false,
    },
  });

  const onSubmit = (value: z.infer<typeof UserCreateOneInput>) => {
    startTransition(async () => {
      await authClient.signUp.email(
        {
          name: value.name,
          email: value.email,
          password: value.password,
          // @ts-expect-error rememberMe is supported at runtime but missing from types
          rememberMe: value.remember,
          callbackURL,
        },
        {
          query: params ? Object.fromEntries(params.entries()) : undefined,
          onSuccess() {
            toast.success('Successfully signed up');
            onSuccessAction?.();
          },
          onError(ctx) {
            toast.error(ctx.error.message);
          },
        },
      );
    });
  };

  return (
    <>
      <form id='form-sign-up' onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup className='gap-2'>
          <Controller
            name='name'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor='form-sign-up-name'>Name</FieldLabel>
                <Input
                  {...field}
                  id='form-sign-up-name'
                  placeholder='Enter your name'
                  data-invalid={fieldState.invalid}
                />
                <FieldDescription>
                  Name must be at least 3 characters long.
                </FieldDescription>
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name='email'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor='form-sign-up-email'>Email</FieldLabel>
                <Input
                  {...field}
                  id='form-sign-up-email'
                  placeholder='Enter your email'
                  data-invalid={fieldState.invalid}
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
                <FieldLabel htmlFor='form-sign-up-password'>
                  Password
                </FieldLabel>
                <Input
                  {...field}
                  type='password'
                  id='form-sign-up-password'
                  placeholder='Enter your password'
                  data-invalid={fieldState.invalid}
                />
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
            name='passwordConfirmation'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor='form-sign-up-password-confirmation'>
                  Confirm Password
                </FieldLabel>
                <Input
                  {...field}
                  type='password'
                  id='form-sign-up-password-confirmation'
                  placeholder='Confirm password'
                  data-invalid={fieldState.invalid}
                />
                <FieldDescription>
                  Please confirm your password.
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
                      id='form-sign-up-remember'
                      aria-invalid={fieldState.invalid}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <FieldContent>
                      <FieldLabel htmlFor='form-sign-up-remember'>
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
      <Field className='mt-3'>
        <Button
          className='w-full'
          type='submit'
          form='form-sign-up'
          disabled={loading}
        >
          {loading && <LoaderCircle size={16} className='animate-spin' />}
          Create Account with Password
        </Button>
      </Field>
    </>
  );
}

export { SignUpForm };
