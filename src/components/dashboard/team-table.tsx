import DataTable from '../common/data-table'
import type PremierTeam from '../../types/premier-teams/premier-team'

type SummaryRow = { field: string; value: string | number | boolean }

const columns = [
	{ header: 'Field', render: (row: SummaryRow) => row.field },
	{ header: 'Value', render: (row: SummaryRow) => String(row.value) },
]

const toSummaryRows = (team: PremierTeam): SummaryRow[] =>
	Object.entries({
		Name: team.name,
		Tag: team.tag,
		Enrolled: team.enrolled,
		Ranked: team.ranked,
		Matches: team.stats.matches,
		Wins: team.stats.wins,
		Losses: team.stats.losses,
		'Rounds won': team.stats.rounds_won,
		'Rounds lost': team.stats.rounds_lost,
		Points: team.placement.points,
		Conference: team.placement.conference,
		Division: team.placement.division,
		Place: team.placement.place,
	}).map(([field, value]) => ({ field, value }))

type TeamTableProps = {
	team: PremierTeam
}

const TeamTable = ({ team }: TeamTableProps) => {
	return (
		<DataTable
			columns={columns}
			rows={toSummaryRows(team)}
			getRowKey={(row) => row.field}
		/>
	)
}

export default TeamTable
