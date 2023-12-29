"use client";

import { useState } from "react";
import { useRouter } from "@/navigation";
import { Button } from "@nextui-org/button";
import { toast } from "./toast";

import { api } from "@/trpc/react";
import { PostCreationInput } from "@/validates/post-validate";

export function CreatePost() {
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [desc, setDesc] = useState<string>("");

  const createPost = api.post.create.useMutation({
    onSuccess: () => {
      router.refresh();
      setName("");
    },
    onError(err) {
      console.log(err);
    },
  });

  return (
    <>
      <form
        onSubmit={async (evt) => {
          evt.preventDefault();
          const validate = await PostCreationInput.spa({
            name,
            description: desc,
          });
          if (!validate.success) {
            const [error] = validate.error.issues;
            return toast.error(error?.message!);
          }
          createPost.mutate({ name, description: desc });
        }}
      >
        <input
          type="text"
          placeholder="Title"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button type="submit" disabled={createPost.isLoading}>
          {createPost.isLoading ? "Submitting..." : "Submit"}
        </button>
      </form>

      <Button
        color="primary"
        size="sm"
        onPress={() => {
          router.push("/login");
        }}
      >
        Presss me
      </Button>
    </>
  );
}
