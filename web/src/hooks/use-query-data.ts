import {
  Enabled,
  QueryFunction,
  QueryKey,
  useQuery,
} from '@tanstack/react-query';

export function useQueryData(
  queryKey: QueryKey,
  queryFn: QueryFunction,
  enabled: Enabled
) {
  const { data, isPending, isFetched, isFetching, isError, error, refetch } =
    useQuery({
      queryKey,
      queryFn,
      enabled,
    });

  return {
    data,
    isPending,
    isFetched,
    isFetching,
    isError,
    error,
    refetch,
  };
}
