import { env } from "@/env.mjs";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { cookies } from "next/headers";
import { z } from "zod";

export const userRouter = createTRPCRouter({});
