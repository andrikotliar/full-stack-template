import z from 'zod';

export const createOkResponseSchema = <T extends z.ZodType>(schema: T) => {
  return z.object({
    ok: z.literal(true),
    data: schema,
  });
};
