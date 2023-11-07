import { PrismaClient } from "@prisma/client";
import {
  PrismaExtensionInstanceMethods,
  PrismaExtensionStaticMethods,
  PrismaExtensionTransformedField,
} from "./prisma-extensions";
import { env } from "@/env.mjs";

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof getExtendedClient> | undefined;
};

export const db = globalForPrisma.prisma ?? getExtendedClient();

function getExtendedClient() {
  return new PrismaClient({
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  })
    .$extends(PrismaExtensionTransformedField)
    .$extends(PrismaExtensionInstanceMethods)
    .$extends(PrismaExtensionStaticMethods);
}

if (env.NODE_ENV !== "production") globalForPrisma.prisma = db;
