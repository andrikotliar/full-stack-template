import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { serve } from '@hono/node-server';
import { variables } from './configs/variables.js';
import { initRootRouter } from './router.js';

const app = new Hono({});

app.use(
  cors({
    origin: variables.FRONTEND_ORIGIN,
    credentials: true,
  }),
);

initRootRouter(app);

serve({ fetch: app.fetch, port: variables.PORT }, (info) => {
  // eslint-disable-next-line no-console
  console.log(`Server is listening on http://localhost:${info.port}`);
});
