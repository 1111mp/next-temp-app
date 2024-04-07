"use client";

import { useState } from "react";
import { Input } from "@/components/ui";
import { Button } from "@nextui-org/button";
import { toast } from "./toast";

import { api } from "@/trpc/react";
import { useRouter } from "@/navigation";
import { PostCreationInput } from "@/validates/post-validate";

export function CreatePost() {
  const router = useRouter();
  const [name, setName] = useState<string>("");
  const [desc, setDesc] = useState<string>("");

  const createPost = api.post.create.useMutation({
    onSuccess: () => {
      router.refresh();
      setName("");
      setDesc("");
    },
    onError(err) {
      console.log(err);
    },
  });

  return (
    <>
      <form
        className="space-y-2"
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
        <Input
          type="text"
          placeholder="Title"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <Button color="primary" type="submit" disabled={createPost.isPending}>
          {createPost.isPending ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </>
  );
}
