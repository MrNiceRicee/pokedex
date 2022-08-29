// src/server/router/index.ts
import { createRouter } from './context';
import superjson from 'superjson';

import { pokemonApi } from './pokemonApi';

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('pokemonApi.', pokemonApi);

// export type definition of API
export type AppRouter = typeof appRouter;
