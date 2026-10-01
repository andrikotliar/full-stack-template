import { hc, type ClientResponse } from 'hono/client';
import type { Router } from '@template/api/router';

const _client = hc<Router>('');
export type Client = typeof _client;

type ApiClientOptions = Parameters<typeof hc>[1] & {
  onUnauthorized?: (response: Response) => Promise<boolean> | boolean;
};

export const createApiClient = (
  baseUrl: Parameters<typeof hc>[0],
  options?: ApiClientOptions,
): Client => {
  const { onUnauthorized, ...hcOptions } = options ?? {};

  return hc<Router>(baseUrl, {
    ...hcOptions,
    fetch: async (input: string | Request | URL, init?: RequestInit) => {
      let response = await fetch(input, init);

      if (response.status === 401 && onUnauthorized) {
        const handled = await onUnauthorized(response);

        if (handled) {
          response = await fetch(input, init);
        }
      }

      return response;
    },
  });
};

export type { ClientResponse };
