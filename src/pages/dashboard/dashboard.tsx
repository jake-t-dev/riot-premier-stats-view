import { useState } from 'react'
import { Alert, Stack, Typography } from '@mui/material'
import LoadingBoundary from '../../hooks/common/useIsLoading'
import useGetPremierTeam from '../../hooks/premier-team/useGetPremierTeam'
import type PremierTeamLookupOptions from '../../types/premier-teams/premier-lookup-options'
import TeamLookupForm from '../../components/dashboard/team-lookup-form'
import TeamMembersTable from '../../components/dashboard/team-members-table'
import TeamTable from '../../components/dashboard/team-table'

const emptyLookup: PremierTeamLookupOptions = { name: '', tag: '' }

const DashboardPage = () => {
	const [lookup, setLookup] = useState<PremierTeamLookupOptions>(emptyLookup)
	const { data: team, isLoading, error } = useGetPremierTeam(lookup)

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
