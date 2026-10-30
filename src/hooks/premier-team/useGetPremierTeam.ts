import useApiQuery from '../common/useApiQuery'
import type PremierTeam from '../../types/premier-teams/premier-team'
import type APIError from '../../types/api/api-error'
import type APIResponse from '../../types/api/api-response'
import type PremierTeamLookupOptions from '../../types/premier-teams/premier-lookup-options'

const fetchPremierTeam = async ({
	id,
	name,
	tag,
	season,
	affinity,
}: PremierTeamLookupOptions & { id?: string }): Promise<PremierTeam> => {
	const params = new URLSearchParams()
	if (id) params.set('id', id)
	else {
		params.set('name', name)
		params.set('tag', tag)
	}
	if (season) params.set('season', season)
	if (affinity) params.set('affinity', affinity)

	const response = await fetch(`/api/premier-team?${params.toString()}`)

	if (!response.headers.get('content-type')?.includes('application/json')) {
		throw new Error('The /api/premier-team function is unavailable.')
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
		throw new Error('Valorant API returned an invalid Premier team response')
	}

	return body.data
}

const useGetPremierTeam = (
	options: PremierTeamLookupOptions & { id?: string },
) => {
	return useApiQuery({
		queryKey: [
			'premier-team',
			options.id,
			options.name,
			options.tag,
			options.season,
			options.affinity,
		],
		queryFn: () => fetchPremierTeam(options),
		enabled: Boolean(options.id || (options.name.trim() && options.tag.trim())),
	})
}

export default useGetPremierTeam
