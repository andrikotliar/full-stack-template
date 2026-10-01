import './index.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import { MutationCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { routeTree } from './routeTree.gen';
import type { InvalidateQueryOption } from './shared/types/invalidate-query-option';
import { toast } from './components/ui/toast';

const queryClient = new QueryClient({
  mutationCache: new MutationCache({
    onSuccess: (_data, _vars, _ctx, mutation) => {
      if (mutation.meta?.invalidateQueries) {
        const options = mutation.meta.invalidateQueries;

        if (Array.isArray(options)) {
          for (const option of options) {
            queryClient.invalidateQueries({ queryKey: option.queryKey });
          }
          return;
        }

        queryClient.invalidateQueries({ queryKey: options.queryKey });
      }
    },
    onError: async (error, _vars, _ctv, mutation) => {
      if (mutation.meta?.skipErrorToast) {
        return;
      }

      toast.add({ type: 'error', description: error.message });
    },
  }),
});

const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  scrollRestoration: true,
  context: { queryClient },
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

declare module '@tanstack/react-query' {
  interface Register {
    mutationMeta: {
      invalidateQueries?: InvalidateQueryOption | InvalidateQueryOption[];
      skipErrorToast?: boolean;
    };
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
);
