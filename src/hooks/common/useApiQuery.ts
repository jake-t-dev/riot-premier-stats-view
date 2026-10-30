import {
	useQuery,
	type QueryKey,
	type UseQueryOptions,
} from '@tanstack/react-query'

const API_STALE_TIME_MS = 1000 * 60 * 10

const useApiQuery = <
	TQueryFnData,
	TError = Error,
	TData = TQueryFnData,
	TQueryKey extends QueryKey = QueryKey,
>(
	options: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
) => {
	return useQuery({
		staleTime: API_STALE_TIME_MS,
		refetchOnWindowFocus: false,
		refetchOnMount: false,
		...options,
	})
}

export default useApiQuery
