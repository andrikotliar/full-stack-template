import 'dotenv/config';
import z from 'zod';

const envSchema = z.object({
  PORT: z.coerce.number().positive().min(3000),
  DATABASE_URL: z.url({ protocol: /postgresql/ }),
  FRONTEND_ORIGIN: z.url(),
});

const getEnvironment = () => {
  return envSchema.parse(process.env);
};

export const variables = getEnvironment();
