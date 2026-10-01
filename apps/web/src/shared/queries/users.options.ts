import { queryOptions } from '@tanstack/react-query';
import { client } from '../services/api';

export const buildGetUsersQueryOptions = () => {
  return queryOptions({
    queryKey: [client.users.$path()],
    queryFn: async () => {
      const result = await client.users.$get();

      return result.json();
    },
  });
};
