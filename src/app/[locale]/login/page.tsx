'use client';

import { useState } from 'react';
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

import { useRouter } from '@/i18n/routing';
import {
  MailerInput,
  LoginInput,
  SignUpInput,
} from '@/validates/user-validate';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { errorMap } from 'zod-validation-error';

enum TabKey {
  Signin = 'sign-in',
  Signup = 'sign-up',
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
        <Tabs defaultValue={TabKey.Signin}>
          <TabsList>
            <TabsTrigger value={TabKey.Signin}>{t('Log-in')}</TabsTrigger>
            <TabsTrigger value={TabKey.Signup}>{t('Sign-up')}</TabsTrigger>
          </TabsList>
          <TabsContent value={TabKey.Signin}>
            <SignIn />
          </TabsContent>
          <TabsContent value={TabKey.Signup}>
            <Signup />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}

enum SignInType {
  Normal,
  Email,
}

function SignIn() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [type, setType] = useState<SignInType>(SignInType.Normal);
  const [remember, setRemember] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof LoginInput>>({
    resolver: zodResolver(LoginInput, { errorMap }),
    defaultValues: {
      email: '',
      password: '',
      remember: false,
    },
  });

  const onChangeType = () => {
    setType(type === SignInType.Normal ? SignInType.Email : SignInType.Normal);
  };

  const onSubmit = async (values: z.infer<typeof LoginInput>) => {
    console.log(values);

    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(values),
    });
    if (!response.ok) {
      const error = await response.json();
      return toast.error(error.message);
    }
    return router.replace('/');
  };

  // const onSubmit: React.FormEventHandler<HTMLFormElement> = async (evt) => {
  //   evt.preventDefault();

  //   switch (type) {
  //     case SignInType.Normal: {
  //       const validate = await LoginInput.spa({ email, password, remember });
  //       if (!validate.success) {
  //         const [error] = validate.error.issues;
  //         return toast.error(error?.message!);
  //       }

  //       const ret = await fetch("/api/auth/login", {
  //         method: "POST",
  //         headers: {
  //           "content-type": "application/json",
  //         },
  //         body: JSON.stringify(validate.data),
  //       }).then((resp) => resp.json());
  //       if (ret.code !== 200) {
  //         return toast.error(ret.message);
  //       }
  //       return router.replace("/");
  //     }
  //     case SignInType.Email: {
  //       const validate = await MailerInput.spa({ email, remember });
  //       if (!validate.success) {
  //         const [error] = validate.error.issues;
  //         return toast.error(error?.message!);
  //       }

  //       const ret = await fetch("/api/auth/mailer", {
  //         method: "POST",
  //         headers: {
  //           "content-type": "application/json",
  //         },
  //         body: JSON.stringify(validate.data),
  //       }).then((resp) => resp.json());
  //       if (ret.code !== 200) {
  //         return toast.error(ret.message);
  //       }

  //       return toast.success(ret.message);
  //     }
  //   }
  // };

  return (
    <Form {...form}>
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
      <Button
        className='mt-4'
        data-testid='signin'
        onClick={form.handleSubmit(onSubmit)}
      >
        Sign in with Password
      </Button>
    </Form>
    // <form className="flex flex-col gap-3" onSubmit={onSubmit}>
    //   <Input
    //     size="sm"
    //     isRequired
    //     isClearable
    //     label="Email"
    //     value={email}
    //     description="We'll never share your email with anyone else."
    //     placeholder="Enter your email"
    //     onClear={() => setEmail("")}
    //     onValueChange={setEmail}
    //   />
    //   {type === SignInType.Normal ? (
    //     <Input
    //       size="sm"
    //       isRequired
    //       label="Password"
    //       value={password}
    //       placeholder="Enter your password"
    //       type={isVisible ? "text" : "password"}
    //       endContent={
    //         <button
    //           className="focus:outline-none"
    //           type="button"
    //           onClick={() => setIsVisible(!isVisible)}
    //         >
    //           {isVisible ? (
    //             <EyeSlashFilledIcon className="text-default-400 pointer-events-none text-2xl" />
    //           ) : (
    //             <EyeFilledIcon className="text-default-400 pointer-events-none text-2xl" />
    //           )}
    //         </button>
    //       }
    //       description="We'll never share your password with anyone else too."
    //       onValueChange={setPassword}
    //     />
    //   ) : null}
    //   <div className="flex items-center justify-between">
    //     <Checkbox
    //       color="warning"
    //       isSelected={remember}
    //       onValueChange={setRemember}
    //     >
    //       Remember me
    //     </Checkbox>
    //     <Button size="sm" variant="link" onClick={onChangeType}>
    //       {type === SignInType.Normal
    //         ? "Sign in with Email"
    //         : "Sign in with Password"}
    //     </Button>
    //   </div>
    //   Button
    //   <p className="text-small text-center">
    //     Need to create an account?{" "}
    //     <Button size="sm" variant="link" onClick={onChange}>
    //       Sign up
    //     </Button>
    //   </p>
    //   <Button type="submit" color="warning" data-testid="signin">
    //     Sign in
    //   </Button>
    // </form>
  );
}

function Signup() {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [remember, setRemember] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof SignUpInput>>({
    resolver: zodResolver(SignUpInput, { errorMap }),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      remember: false,
    },
  });

  // const onSubmit: React.FormEventHandler<HTMLFormElement> = async (evt) => {
  //   evt.preventDefault();

  //   const validate = await SignUpInput.spa({ name, email, password, remember });
  //   if (!validate.success) {
  //     const [error] = validate.error.issues;
  //     return toast.error(error?.message!);
  //   }

  //   const ret = await fetch("/api/auth/signup", {
  //     method: "POST",
  //     headers: {
  //       "content-type": "application/json",
  //     },
  //     body: JSON.stringify(validate.data),
  //   }).then((resp) => resp.json());
  //   if (ret.code !== 200) {
  //     return toast.error(ret.message);
  //   }
  //   router.replace("/");
  // };

  const onSubmit = async (values: z.infer<typeof SignUpInput>) => {
    console.log(values);
    await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(values),
    });
  };

  return (
    <Form {...form}>
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
      <Button className='mt-4' onClick={form.handleSubmit(onSubmit)}>
        Sign up with Password
      </Button>
    </Form>
    // <form className="flex flex-col gap-3" onSubmit={onSubmit}>
    //   <Input
    //     size="sm"
    //     isRequired
    //     isClearable
    //     label="Name"
    //     value={name}
    //     description="We'll never share your name with anyone else."
    //     placeholder="Enter your name"
    //     onClear={() => setName("")}
    //     onValueChange={setName}
    //   />
    //   <Input
    //     size="sm"
    //     isRequired
    //     isClearable
    //     label="Email"
    //     value={email}
    //     description="We'll never share your email with anyone else too."
    //     placeholder="Enter your email"
    //     onClear={() => setEmail("")}
    //     onValueChange={setEmail}
    //   />
    //   <Input
    //     size="sm"
    //     isRequired
    //     label="Password"
    //     value={password}
    //     placeholder="Enter your password"
    //     type={isVisible ? "text" : "password"}
    //     endContent={
    //       <button
    //         className="focus:outline-none"
    //         type="button"
    //         onClick={() => setIsVisible(!isVisible)}
    //       >
    //         {isVisible ? (
    //           <EyeSlashFilledIcon className="text-default-400 pointer-events-none text-2xl" />
    //         ) : (
    //           <EyeFilledIcon className="text-default-400 pointer-events-none text-2xl" />
    //         )}
    //       </button>
    //     }
    //     description="We'll never share your password with anyone else too."
    //     onValueChange={setPassword}
    //   />
    //   <Checkbox
    //     color="warning"
    //     size="sm"
    //     isSelected={remember}
    //     onValueChange={setRemember}
    //   >
    //     Remember me
    //   </Checkbox>
    //   <p className="text-small text-center">
    //     Already have an account?{" "}
    //     <Button size="sm" variant="link" onClick={onChange}>
    //       Login
    //     </Button>
    //   </p>
    //   <Button type="submit" color="warning">
    //     Sign up
    //   </Button>
    // </form>
  );
}
