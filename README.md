# Riot Premier Stats

React and TypeScript app powered by Vite and Material UI.

## Getting started

```sh
npm install
npm run dev
```

`npm run dev` starts Netlify Dev, which serves the Vite app and Netlify
Functions together at `http://localhost:8888`. Copy `.env.example` to `.env`
and set `RIOT_DEV_API_KEY` there for local function requests. Do not use a
`VITE_` prefix; Vite exposes prefixed variables to browser code.

The Premier team hook calls the same-origin `/api/premier-team` function. The
function reads `RIOT_DEV_API_KEY` on the server and forwards only the supported
Premier lookup request to HenrikDev. For production, configure `RIOT_DEV_API_KEY`
in the Netlify site's environment variables, then deploy the project with this
repository as the site source. `netlify.toml` configures the build, function
directory, API rewrite, and SPA fallback.

The shared Material UI theme is defined in `src/theme.ts` and applied to the
app in `src/main.tsx`. Update the theme there to change the app-wide palette,
typography, and component defaults.
