import { useNavigate } from 'react-router-dom'
import DataTable from '../common/data-table'
import type PremierTeam from '../../types/premier-teams/premier-team'

type TeamMember = PremierTeam['member'][number]

const columns = [
	{ header: 'Name', render: (member: TeamMember) => member.name ?? '—' },
	{ header: 'Tag', render: (member: TeamMember) => member.tag ?? '—' },
]

type TeamMembersTableProps = {
	members: TeamMember[]
}

const TeamMembersTable = ({ members }: TeamMembersTableProps) => {
	const navigate = useNavigate()

	return (
		<DataTable
			columns={columns}
			rows={members}
			getRowKey={(member) => member.puuid}
			onRowClick={(member) => navigate(`/player/${member.puuid}`)}
		/>
	)
}

export default TeamMembersTable
