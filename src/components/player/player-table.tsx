import DataTable from '../common/data-table'
import type Player from '../../types/player/player'

type SummaryRow = { field: string; value: string | number | boolean }

const columns = [
	{ header: 'Field', render: (row: SummaryRow) => row.field },
	{ header: 'Value', render: (row: SummaryRow) => String(row.value) },
]

const toSummaryRows = ({ account, mmr }: Player): SummaryRow[] =>
	Object.entries({
		Name: account.name,
		Tag: account.tag,
		Region: account.region,
		Level: account.account_level,
		'Last updated': account.last_update ?? '—',
		'Current rank': mmr?.current_data?.currenttierpatched ?? '—',
		'Rank rating': mmr?.current_data?.ranking_in_tier ?? '—',
		Elo: mmr?.current_data?.elo ?? '—',
		'Last game change': mmr?.current_data?.mmr_change_to_last_game ?? '—',
		'Peak rank': mmr?.highest_rank?.patched_tier ?? '—',
		'Peak season': mmr?.highest_rank?.season ?? '—',
	}).map(([field, value]) => ({ field, value }))

type PlayerTableProps = {
	player: Player
}

const PlayerTable = ({ player }: PlayerTableProps) => {
	return (
		<DataTable
			columns={columns}
			rows={toSummaryRows(player)}
			getRowKey={(row) => row.field}
		/>
	)
}

export default PlayerTable
