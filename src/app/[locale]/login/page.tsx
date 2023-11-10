"use client";

import { useState } from "react";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { EyeFilledIcon, EyeSlashFilledIcon } from "@/components/eyes-icon";
import { NextLogo } from "@/components/next-logo";
import { Checkbox } from "@nextui-org/checkbox";
import toast from "react-hot-toast";

// import { useRouter } from "next/navigation";
type Props = {
  params: { locale: string };
};

export default function LoginPage({ params: { locale } }: Props) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [remember, setRemember] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  // const router = useRouter();

  // const onSubmit = async () => {
  //   const ret = await fetch("/api/auth/signin", {
  //     method: "POST",
  //     headers: {
  //       "content-type": "application/json",
  //     },
  //     body: JSON.stringify({ account: "17621398254", password: "password" }),
  //   });

  //   // router.replace("/");
  // };

  const onSignup = async () => {
    const ret = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ account: "17621398254", password: "password" }),
    });

    // router.replace("/");
    console.log(ret);
  };

  const onSignout = async () => {
    const ret = await fetch("/api/auth/signout", { method: "POST" });
    console.log(await ret.json());
  };

  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (evt) => {
    evt.preventDefault();
    console.log(email);
    console.log(password);
    console.log(remember);
    const ret = await fetch("/api/auth/signin", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ account: email, password, remember }),
    }).then((resp) => resp.json());
    console.log(ret);
    toast.error(ret.message, {
      className: "dark:bg-black dark:text-white",
    });
  };

  return (
    <>
      <div className="h-full m-auto max-w-screen-xl overflow-hidden px-6">
        <div className="m-auto max-w-md max-md:mt-10 md:mt-32">
          <div className="mb-5 flex max-w-md flex-row items-center gap-2">
            <NextLogo width="42" height="42" />
            <p className="text-2xl font-bold">Next.js</p>
          </div>
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
            <Button type="submit" color="warning">
              Submit
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
