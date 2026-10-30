import useApiQuery from '../common/useApiQuery'
import type CompetitiveTierAsset from '../../types/valorant-api/competitive-tier-asset'

const fetchLatestTiers = async (): Promise<CompetitiveTierAsset[]> => {
	const response = await fetch('https://valorant-api.com/v1/competitivetiers')
	if (!response.ok) {
		throw new Error(`valorant-api.com tiers request failed: ${response.status}`)
	}
	const { data } = (await response.json()) as {
		data: { tiers: CompetitiveTierAsset[] }[]
	}
	return data[data.length - 1]?.tiers ?? []
}

const useGetCompetitiveTier = (tier: number | undefined) => {
	return useApiQuery({
		queryKey: ['valorant-api', 'competitivetiers'],
		queryFn: fetchLatestTiers,
		select: (tiers) => tiers.find((entry) => entry.tier === tier),
		enabled: tier !== undefined,
	})
}

export default useGetCompetitiveTier
