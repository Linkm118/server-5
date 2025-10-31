import { Hono } from 'jsr:@hono/hono';
import { serveStatic } from 'jsr:@hono/hono/deno';
const app = new Hono();

app.use('/*', serveStatic({ root: './public' }));

// GETリクエストに対する処理
app.get('/api/:name/:rank', async (c) => {
  const name = c.req.param('name');
  const rank = c.req.param('rank');
  return c.json({ message: 'GET', name, rank });
});

// POSTリクエストに対する処理
app.post('/api', async (c) => {
  // メッセージボディの受け取り
  const body = await c.req.parseBody();
  const name = body['name'];
  const rank = body['rank'];

  return c.json({ message: 'POST', form: { name, rank } });
});

// PUTリクエストに対する処理
app.put('/api', async (c) => {
  // メッセージボディの受け取り
  const body = await c.req.json();
  const name = body['name'];
  const rank = body['rank'];

  return c.json({ message: 'PUT', json: { name, rank } });
});

Deno.serve(app.fetch);
