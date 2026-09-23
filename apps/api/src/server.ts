import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { env } from '@/configs/env.js';

const app = new Hono({});

app.get('/healthcheck', (c) => c.json({ ok: true }));

serve({ fetch: app.fetch, port: env.PORT }, (info) => {
  // eslint-disable-next-line no-console
  console.log(`Server is listening on http://localhost:${info.port}`);
});
