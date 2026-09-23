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
export PROJECT_NAME=<YOUR_PROJECT_NAME>
git clone git@github.com:andrikotliar/full-stack-template.git $PROJECT_NAME
```

2. Run the command to setup the repository:

```bash
cd $PROJECT_NAME
chmod +x prepare-project.sh
./prepare-project.sh
```

3. Run in the root of the project to install all dependencies

```bash
pnpm install
```

To start both API and Web apps at the same tine, run `pnpm dev` at the root of the project.
