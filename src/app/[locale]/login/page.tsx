"use client";

// import { useRouter } from "next/navigation";
type Props = {
  params: { locale: string };
};

export default function LoginPage({ params: { locale } }: Props) {
  console.log(locale);
  // const router = useRouter();

  const onSubmit = async () => {
    const ret = await fetch("/api/auth/signin", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ account: "17621398254", password: "password" }),
    });

    // router.replace("/");
  };

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

  return (
    <>
      <button onClick={onSubmit}>Sign in</button>
      <button onClick={onSignup}>Sign up</button>
      <button onClick={onSignout}>Sign out</button>
    </>
  );
}
