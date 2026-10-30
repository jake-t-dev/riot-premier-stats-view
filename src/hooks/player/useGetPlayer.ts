import useApiQuery from '../common/useApiQuery'
import type Player from '../../types/player/player'
import type PlayerLookupOptions from '../../types/player/player-lookup-options'
import type APIError from '../../types/api/api-error'
import type APIResponse from '../../types/api/api-response'

const fetchPlayer = async ({
	puuid,
	name,
	tag,
}: PlayerLookupOptions): Promise<Player> => {
	const params = new URLSearchParams()
	if (puuid) params.set('puuid', puuid)
	else {
		params.set('name', name ?? '')
		params.set('tag', tag ?? '')
	}

	const response = await fetch(`/api/player?${params.toString()}`)

	if (!response.headers.get('content-type')?.includes('application/json')) {
		throw new Error('The /api/player function is unavailable.')
	}

	const body = (await response.json()) as APIResponse | APIError

	if (!response.ok) {
		const message =
			'errors' in body
				? body.errors.map((error) => error.message).join('; ')
				: `Valorant API request failed: ${response.status} ${response.statusText}`
		throw new Error(message)
	}

	if (!('data' in body)) {
		throw new Error('Valorant API returned an invalid player response')
	}

	return body.data
}

const useGetPlayer = (options: PlayerLookupOptions) => {
	return useApiQuery({
		queryKey: ['player', options.puuid, options.name, options.tag],
		queryFn: () => fetchPlayer(options),
		enabled: Boolean(options.puuid || (options.name && options.tag)),
	})
}

export default useGetPlayer
