"use client";

import { useState } from "react";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { Tab, Tabs } from "@nextui-org/tabs";
import { Checkbox } from "@nextui-org/checkbox";
import { EyeFilledIcon, EyeSlashFilledIcon } from "@/components/eyes-icon";
import { NextLogo } from "@/components/next-logo";
import { useRouter } from "@/navigation";
import { Link } from "@nextui-org/link";
import {
  MailerInput,
  LoginInput,
  SignUpInput,
} from "@/validates/user-validate";
import { toast } from "@/components/toast";

type Props = {
  params: { locale: string };
};

enum TabKey {
  Signin = "sign-in",
  Signup = "sign-up",
}

export default function LoginPage({ params: { locale } }: Props) {
  const [selected, setSelected] = useState<TabKey>(TabKey.Signin);

  return (
    <>
      <div className="m-auto h-full max-w-screen-xl px-6">
        <div className="m-auto max-w-md pt-8 md:pt-24">
          <div className="mb-5 flex max-w-md flex-row items-center justify-between">
            <div className="flex flex-row items-center gap-2">
              <NextLogo width="42" height="42" />
              <p className="text-2xl font-bold">Next.js</p>
            </div>

            <Tabs
              color="warning"
              aria-label="Tabs colors"
              radius="full"
              size="sm"
              selectedKey={selected}
              onSelectionChange={(key) => setSelected(key as TabKey)}
            >
              <Tab key={TabKey.Signin} title="Sign in" />
              <Tab key={TabKey.Signup} title="Sign up" />=
            </Tabs>
          </div>
          {selected === TabKey.Signin ? (
            <SignIn onChange={() => setSelected(TabKey.Signup)} />
          ) : (
            <Signup onChange={() => setSelected(TabKey.Signin)} />
          )}
        </div>
      </div>
    </>
  );
}

type SignProps = {
  onChange: VoidFunction;
};

enum SignInType {
  Normal,
  Email,
}

function SignIn({ onChange }: SignProps) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [type, setType] = useState<SignInType>(SignInType.Normal);
  const [remember, setRemember] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const router = useRouter();

  const onChangeType = () => {
    setType(type === SignInType.Normal ? SignInType.Email : SignInType.Normal);
  };

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (evt) => {
    evt.preventDefault();

    switch (type) {
      case SignInType.Normal: {
        const validate = await LoginInput.spa({ email, password, remember });
        if (!validate.success) {
          const [error] = validate.error.issues;
          return toast.error(error?.message!);
        }

        const ret = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(validate.data),
        }).then((resp) => resp.json());
        if (ret.code !== 200) {
          return toast.error(ret.message);
        }
        return router.replace("/");
      }
      case SignInType.Email: {
        const validate = await MailerInput.spa({ email, remember });
        if (!validate.success) {
          const [error] = validate.error.issues;
          return toast.error(error?.message!);
        }

        const ret = await fetch("/api/auth/mailer", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(validate.data),
        }).then((resp) => resp.json());
        if (ret.code !== 200) {
          return toast.error(ret.message);
        }

        return toast.success(ret.message);
      }
    }
  };

  return (
    <form className="flex flex-col gap-3" onSubmit={onSubmit}>
      <Input
        size="sm"
        isRequired
        isClearable
        label="Email"
        value={email}
        description="We'll never share your email with anyone else."
        placeholder="Enter your email"
        onClear={() => setEmail("")}
        onValueChange={setEmail}
      />
      {type === SignInType.Normal ? (
        <Input
          size="sm"
          isRequired
          label="Password"
          value={password}
          placeholder="Enter your password"
          type={isVisible ? "text" : "password"}
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={() => setIsVisible(!isVisible)}
            >
              {isVisible ? (
                <EyeSlashFilledIcon className="pointer-events-none text-2xl text-default-400" />
              ) : (
                <EyeFilledIcon className="pointer-events-none text-2xl text-default-400" />
              )}
            </button>
          }
          description="We'll never share your password with anyone else too."
          onValueChange={setPassword}
        />
      ) : null}
      <div className="flex items-center justify-between">
        <Checkbox
          color="warning"
          size="sm"
          isSelected={remember}
          onValueChange={setRemember}
        >
          Remember me
        </Checkbox>
        <Link size="sm" onPress={onChangeType}>
          {type === SignInType.Normal
            ? "Sign in with Email"
            : "Sign in with Password"}
        </Link>
      </div>
      <p className="text-center text-small">
        Need to create an account?{" "}
        <Link size="sm" onPress={onChange}>
          Sign up
        </Link>
      </p>
      <Button type="submit" color="warning" data-testid="signin">
        Sign in
      </Button>
    </form>
  );
}

function Signup({ onChange }: SignProps) {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [remember, setRemember] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const router = useRouter();

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (evt) => {
    evt.preventDefault();

    const validate = await SignUpInput.spa({ name, email, password, remember });
    if (!validate.success) {
      const [error] = validate.error.issues;
      return toast.error(error?.message!);
    }

    const ret = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(validate.data),
    }).then((resp) => resp.json());
    if (ret.code !== 200) {
      return toast.error(ret.message);
    }
    router.replace("/");
  };

  return (
    <form className="flex flex-col gap-3" onSubmit={onSubmit}>
      <Input
        size="sm"
        isRequired
        isClearable
        label="Name"
        value={name}
        description="We'll never share your name with anyone else."
        placeholder="Enter your name"
        onClear={() => setName("")}
        onValueChange={setName}
      />
      <Input
        size="sm"
        isRequired
        isClearable
        label="Email"
        value={email}
        description="We'll never share your email with anyone else too."
        placeholder="Enter your email"
        onClear={() => setEmail("")}
        onValueChange={setEmail}
      />
      <Input
        size="sm"
        isRequired
        label="Password"
        value={password}
        placeholder="Enter your password"
        type={isVisible ? "text" : "password"}
        endContent={
          <button
            className="focus:outline-none"
            type="button"
            onClick={() => setIsVisible(!isVisible)}
          >
            {isVisible ? (
              <EyeSlashFilledIcon className="pointer-events-none text-2xl text-default-400" />
            ) : (
              <EyeFilledIcon className="pointer-events-none text-2xl text-default-400" />
            )}
          </button>
        }
        description="We'll never share your password with anyone else too."
        onValueChange={setPassword}
      />
      <Checkbox
        color="warning"
        size="sm"
        isSelected={remember}
        onValueChange={setRemember}
      >
        Remember me
      </Checkbox>
      <p className="text-center text-small">
        Already have an account?{" "}
        <Link size="sm" onPress={onChange}>
          Login
        </Link>
      </p>
      <Button type="submit" color="warning">
        Sign up
      </Button>
    </form>
  );
}
