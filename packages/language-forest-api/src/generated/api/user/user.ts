/**
 * Generated by orval v7.3.0 🍺
 * Do not edit manually.
 * Sample API
 * OpenAPI spec version: 1.0.0
 */
import {
  useQuery
} from '@tanstack/react-query'
import type {
  DataTag,
  DefinedInitialDataOptions,
  DefinedUseQueryResult,
  QueryFunction,
  QueryKey,
  UndefinedInitialDataOptions,
  UseQueryOptions,
  UseQueryResult
} from '@tanstack/react-query'
import type {
  UserInfoDto
} from '../../schemas'
import { fetchClient } from '../../../../fetchClient';

type AwaitedInput<T> = PromiseLike<T> | T;

      type Awaited<O> = O extends AwaitedInput<infer T> ? T : never;



/**
 * @summary 내 유저 정보 가져오기
 */
export const getUserInfo = (
    
 signal?: AbortSignal
) => {
      
      
      return fetchClient<UserInfoDto>(
      {url: `/user/me`, method: 'GET', signal
    },
      );
    }
  

export const getGetUserInfoQueryKey = () => {
    return [`/user/me`] as const;
    }

    
export const getGetUserInfoQueryOptions = <TData = Awaited<ReturnType<typeof getUserInfo>>, TError = unknown>( options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getUserInfo>>, TError, TData>>, }
) => {

const {query: queryOptions} = options ?? {};

  const queryKey =  queryOptions?.queryKey ?? getGetUserInfoQueryKey();

  

    const queryFn: QueryFunction<Awaited<ReturnType<typeof getUserInfo>>> = ({ signal }) => getUserInfo(signal);

      

      

   return  { queryKey, queryFn, ...queryOptions} as UseQueryOptions<Awaited<ReturnType<typeof getUserInfo>>, TError, TData> & { queryKey: DataTag<QueryKey, TData> }
}

export type GetUserInfoQueryResult = NonNullable<Awaited<ReturnType<typeof getUserInfo>>>
export type GetUserInfoQueryError = unknown


export function useGetUserInfo<TData = Awaited<ReturnType<typeof getUserInfo>>, TError = unknown>(
  options: { query:Partial<UseQueryOptions<Awaited<ReturnType<typeof getUserInfo>>, TError, TData>> & Pick<
        DefinedInitialDataOptions<
          Awaited<ReturnType<typeof getUserInfo>>,
          TError,
          TData
        > , 'initialData'
      >, }

  ):  DefinedUseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useGetUserInfo<TData = Awaited<ReturnType<typeof getUserInfo>>, TError = unknown>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getUserInfo>>, TError, TData>> & Pick<
        UndefinedInitialDataOptions<
          Awaited<ReturnType<typeof getUserInfo>>,
          TError,
          TData
        > , 'initialData'
      >, }

  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
export function useGetUserInfo<TData = Awaited<ReturnType<typeof getUserInfo>>, TError = unknown>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getUserInfo>>, TError, TData>>, }

  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> }
/**
 * @summary 내 유저 정보 가져오기
 */

export function useGetUserInfo<TData = Awaited<ReturnType<typeof getUserInfo>>, TError = unknown>(
  options?: { query?:Partial<UseQueryOptions<Awaited<ReturnType<typeof getUserInfo>>, TError, TData>>, }

  ):  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> } {

  const queryOptions = getGetUserInfoQueryOptions(options)

  const query = useQuery(queryOptions) as  UseQueryResult<TData, TError> & { queryKey: DataTag<QueryKey, TData> };

  query.queryKey = queryOptions.queryKey ;

  return query;
}



