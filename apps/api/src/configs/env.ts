import 'dotenv/config';
import z from 'zod';

const envSchema = z.object({
  PORT: z.coerce.number().positive().min(3000),
  DATABASE_URL: z.url({ protocol: /postgresql/ }),
});

const getEnvironment = () => {
  return envSchema.parse(process.env);
};

export const env = getEnvironment();
