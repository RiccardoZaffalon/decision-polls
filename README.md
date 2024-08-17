# Decision Polls

A SvelteKit application to make decisions together via polls. SQLite (libSQL) database hosted on Turso.

## Tech stack:

- [SvelteKit](https://kit.svelte.dev/docs/introduction) (web framework)
- [SQLite](https://www.sqlite.org/about.html) (database technology)
- [Turso](https://docs.turso.tech/introduction) (database service)
  - This could be replaced with any SQLite solution, including a local adapter for a fully offline solution
- [Drizzle](https://orm.drizzle.team/docs/overview) (ORM)

Hosted on [Vercel](https://vercel.com).
Icons from [Phosphor](https://phosphoricons.com/).

### Instructions

1. Install dependencies using node version ^20

- `npm install`

2. Configure the environment variables to point to the Turso DB in a .env file

```
  TURSO_DATABASE_URL=
  TURSO_AUTH_TOKEN=
```

3. Run migrations included in `/drizzle/migrations`, if needed
4. Run the application in development mode with hot module reloading

- `npm run dev`

5. Make your changes to the app in the `/src` directory
