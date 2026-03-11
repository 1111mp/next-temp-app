'use client';

import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  Input,
} from '@/components/ui';
import { PostCreateOneInput } from '@/lib/validates';
import { api } from '@/trpc/react';
import { z } from '@/lib/zod';

export function LatestPost() {
  const [latestPost] = api.post.getLatest.useSuspenseQuery();

  const form = useForm<z.infer<typeof PostCreateOneInput>>({
    resolver: zodResolver(PostCreateOneInput),
    defaultValues: {
      name: '',
      description: '',
    },
  });
  const utils = api.useUtils();
  const createPost = api.post.create.useMutation({
    onSuccess: async () => {
      await utils.post.invalidate();
    },
  });

  const onSubmit = (values: z.infer<typeof PostCreateOneInput>) => {
    createPost.mutate(values);
  };

  return (
    <div>
      {latestPost ? (
        <p className='showcaseText'>Your most recent post: {latestPost.name}</p>
      ) : (
        <p className='showcaseText'>You have no posts yet.</p>
      )}
      <form id='form-create-post' onSubmit={form.handleSubmit(onSubmit)}>
        <FieldGroup className='gap-2'>
          <Controller
            name='name'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor='form-create-post-name'>Name</FieldLabel>
                <Input
                  {...field}
                  id='form-create-post-name'
                  placeholder='Enter name'
                  data-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
          <Controller
            name='description'
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor='form-create-post-description'>
                  Description
                </FieldLabel>
                <Input
                  {...field}
                  id='form-create-post-description'
                  placeholder='Enter description'
                  data-invalid={fieldState.invalid}
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
      </form>
      <Field className='mt-4'>
        <Button type='submit' form='form-create-post'>
          {createPost.isPending ? 'Submitting...' : 'Submit'}
        </Button>
      </Field>
    </div>
  );
}
