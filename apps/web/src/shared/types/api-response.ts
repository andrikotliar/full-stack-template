import type { ClientResponse } from '@template/api-client';

export type ApiResponse<T extends (...args: any) => any> =
  Awaited<ReturnType<T>> extends ClientResponse<infer TData, any, any>
    ? Exclude<TData, { ok: false }>
    : never;
