import type { Hono } from 'hono';
import { usersRouter } from './routers/users.router.js';

export const initRootRouter = (app: Hono) => {
  return app.route('/', usersRouter);
};

export type Router = ReturnType<typeof initRootRouter>;
