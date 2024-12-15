import { PrismaClient } from '@prisma/client';
import {
  PrismaExtensionInstanceMethods,
  PrismaExtensionStaticMethods,
  PrismaExtensionTransformedField,
} from './prisma-extensions';
import { env } from '@/env';

const createPrismaClient = () =>
  new PrismaClient({
    log:
      env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })
    .$extends(PrismaExtensionTransformedField)
    .$extends(PrismaExtensionInstanceMethods)
    .$extends(PrismaExtensionStaticMethods);

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
};

export const db = globalForPrisma.prisma ?? createPrismaClient();

if (env.NODE_ENV !== 'production') globalForPrisma.prisma = db;
