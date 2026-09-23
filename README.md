# Full-Stack TypeScript App Monorepo Template

## Tech Stack

### Global tools

- ESLint
- Prettier
- TypeScript
- PNPM Workspaces
- Docker Compose

### Web

- React
- TanStack Router
- TanStack Query
- Tailwind CSS
- Shadcn/UI

### API

- Hono
- Drizzle ORM
- Postgres

## Start

1. Copy the repository:

```bash
git clone git@github.com:andrikotliar/full-stack-template.git <YOUR_FOLDER_NAME>
```

2. Run the command to setup the repository:

```bash
cd <YOUR_FOLDER_NAME>
chmod +x prepare-project.sh && ./prepare-project.sh

```

3. Run in the root of the project to install all dependencies

```bash
pnpm install
```

4. Start the database

```bash
docker compose up -d
```

5. Create a desired user, password and database in the postgres.

6. Setup environment variables in the API folder:

```bash
cp apps/api/.env.sample apps/api/.env
```

To start both API and Web apps at the same tine, run `pnpm dev` at the root of the project.
