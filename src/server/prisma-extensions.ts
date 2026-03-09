import dayjs from 'dayjs';
import { Prisma } from '../../generated/prisma/client';

export const PrismaExtensionTransformedField = Prisma.defineExtension({
  name: 'prisma-extension-transformed-field',
  result: {
    $allModels: {
      createdAt: {
        needs: { createdAt: true as never },
        compute(model: { createdAt?: Date }) {
          return model.createdAt
            ? dayjs(model.createdAt).format('YYYY-MM-DD HH:mm:ss')
            : null;
        },
      },
      updatedAt: {
        needs: { updatedAt: true as never },
        compute(model: { updatedAt?: Date }) {
          return model.updatedAt
            ? dayjs(model.updatedAt).format('YYYY-MM-DD HH:mm:ss')
            : null;
        },
      },
    },
  },
});
