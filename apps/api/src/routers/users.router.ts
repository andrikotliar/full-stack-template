import { createRoute, OpenAPIHono } from '@hono/zod-openapi';
import { usersResponseSchema } from '@template/shared';
import { getUsersHandler } from '../handlers/users.handlers.js';

const usersListRoute = createRoute({
  method: 'get',
  path: '/users',
  responses: {
    200: {
      content: {
        'application/json': {
          schema: usersResponseSchema,
        },
      },
    },
  },
});

export const usersRouter = new OpenAPIHono().openapi(usersListRoute, async (c) => {
  const data = await getUsersHandler();

  return c.json({ data, ok: true }, 200);
});
