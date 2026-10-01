import { redirect } from '@tanstack/react-router';
import { createApiClient } from '@template/api-client';

export const client = createApiClient(import.meta.env.VITE_BASE_API_URL, {
  init: {
    credentials: 'include',
  },
  onUnauthorized: async () => {
    throw redirect({
      to: '/login',
    });
  },
});
