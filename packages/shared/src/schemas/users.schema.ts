import z from 'zod';
import { createOkResponseSchema } from '../helpers/create-response-schema.js';

export const usersResponseSchema = createOkResponseSchema(
  z.array(
    z.object({
      id: z.number(),
      firstName: z.string(),
      lastName: z.string(),
    }),
  ),
);
