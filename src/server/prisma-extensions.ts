import { Prisma } from "@prisma/client";
import { compare, hash } from "bcrypt";
import dayjs from "dayjs";

export const PrismaExtensionTransformedField = Prisma.defineExtension(
  (prisma) =>
    prisma.$extends({
      name: "prisma-extension-transformed-field",
      result: {
        $allModels: {
          createdAt: {
            // @ts-ignore
            needs: { createdAt: true },
            compute(model) {
              return dayjs(model.createdAt).format("YYYY-MM-DD HH:mm:ss");
            },
          },
          updatedAt: {
            // @ts-ignore
            needs: { updatedAt: true },
            compute(model) {
              return dayjs(model.updatedAt).format("YYYY-MM-DD HH:mm:ss");
            },
          },
        },
      },
    }),
);

export const PrismaExtensionInstanceMethods = Prisma.defineExtension((prisma) =>
  prisma.$extends({
    name: "prisma-extension-instance-methods",
    result: {
      user: {
        save: {
          needs: { id: true },
          compute(user) {
            return () =>
              prisma.user.update({
                where: { id: user.id },
                data: user,
              });
          },
        },
        delete: {
          needs: { id: true },
          compute(user) {
            return () => {
              return prisma.$transaction([
                prisma.post.deleteMany({ where: { userId: user.id } }),
                prisma.user.delete({ where: { id: user.id } }),
              ]);
            };
          },
        },
      },
    },
  }),
);

export const PrismaExtensionStaticMethods = Prisma.defineExtension((prisma) =>
  prisma.$extends({
    name: "prisma-extension-static-methods",
    model: {
      $allModels: {
        async exists<T>(
          this: T,
          where: Prisma.Args<T, "findFirst">["where"],
        ): Promise<boolean> {
          const context = Prisma.getExtensionContext(this);
          const result = await (context as any).findFirst({ where });
          return result !== null;
        },
      },
      user: {
        async signUp(args: Prisma.UserCreateInput) {
          const { name, email, password } = args;
          const hashed = await hash(password, 10);

          return prisma.user.create({
            data: {
              name,
              email,
              password: hashed,
            },
          });
        },

        async signIn(args: Pick<Prisma.UserCreateInput, "email" | "password">) {
          const { email, password } = args;
          const user = await prisma.user.findFirst({
            where: { email },
          });

          if (user === null) return null;

          const same = await compare(password, user.password);
          return same ? exclude(user, ["password"]) : null;
        },
      },
    },
  }),
);

// Exclude keys from model
function exclude<Model extends object, Key extends keyof Model>(
  model: Model,
  keys: Key[],
): Omit<Model, Key> {
  return Object.fromEntries(
    Object.entries(model).filter(([key]) => !keys.includes(key as Key)),
  ) as Omit<Model, Key>;
}
