'use client';

import { api } from '@/trpc/react';
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from './ui';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { PostCreateOneInput } from '@/lib/validates';
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
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder='Enter name' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder='Enter description' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className='mt-4' type='submit'>
            {createPost.isPending ? 'Submitting...' : 'Submit'}
          </Button>
        </form>
      </Form>
    </div>
  );
}
