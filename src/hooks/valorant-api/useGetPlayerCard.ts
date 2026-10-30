import useApiQuery from '../common/useApiQuery'
import type PlayerCardAsset from '../../types/valorant-api/player-card-asset'

const fetchPlayerCard = async (cardId: string): Promise<PlayerCardAsset> => {
	const response = await fetch(
		`https://valorant-api.com/v1/playercards/${encodeURIComponent(cardId)}`,
	)
	if (!response.ok) {
		throw new Error(
			`valorant-api.com player card request failed: ${response.status}`,
		)
	}
	return ((await response.json()) as { data: PlayerCardAsset }).data
}

const useGetPlayerCard = (cardId: string | undefined) => {
	return useApiQuery({
		queryKey: ['valorant-api', 'playercard', cardId],
		queryFn: () => fetchPlayerCard(cardId ?? ''),
		enabled: Boolean(cardId),
	})
}

export default useGetPlayerCard
