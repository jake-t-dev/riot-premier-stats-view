import { useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { Alert, Stack, Typography } from '@mui/material'
import LoadingBoundary from '../../hooks/common/useIsLoading'
import useGetPremierTeam from '../../hooks/premier-team/useGetPremierTeam'
import type PremierTeamLookupOptions from '../../types/premier-teams/premier-lookup-options'
import type Affinity from '../../types/common/affinity'
import TeamLookupForm from '../../components/dashboard/team-lookup-form'
import TeamMembersTable from '../../components/dashboard/team-members-table'
import TeamTable from '../../components/dashboard/team-table'

const emptyLookup: PremierTeamLookupOptions = { name: '', tag: '' }
const affinities: Affinity[] = ['na', 'eu', 'ap', 'kr', 'br', 'latam']

const DashboardPage = () => {
	const [lookup, setLookup] = useState<PremierTeamLookupOptions>(emptyLookup)
	const { teamId } = useParams()
	const navigate = useNavigate()
	const [searchParams] = useSearchParams()
	const affinityParam = searchParams.get('affinity')
	const affinity = affinities.find((value) => value === affinityParam)
	const {
		data: team,
		isLoading,
		error,
	} = useGetPremierTeam(
		teamId
			? {
					...emptyLookup,
					id: teamId,
					season: searchParams.get('season') || undefined,
					affinity,
				}
			: lookup,
	)

	useEffect(() => {
		if (team && team.id !== teamId) {
			const params = new URLSearchParams()
			if (lookup.season) params.set('season', lookup.season)
			if (lookup.affinity) params.set('affinity', lookup.affinity)
			const query = params.toString()
			navigate(`/team-lookup/${team.id}${query ? `?${query}` : ''}`, {
				replace: true,
			})
		}
	}, [team, teamId, lookup.season, lookup.affinity, navigate])

	return (
		<Stack spacing={3} sx={{ py: 4 }}>
			<Typography variant='h4'>Premier team lookup</Typography>

			<TeamLookupForm onSearch={setLookup} />

			{isLoading && <LoadingBoundary />}
			{error && <Alert severity='error'>{error.message}</Alert>}

			{team && (
				<>
					<TeamTable team={team} />
					<Typography variant='h6'>Members ({team.member.length})</Typography>
					<TeamMembersTable members={team.member} />
				</>
			)}
		</Stack>
	)
}

export default DashboardPage
