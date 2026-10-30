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
	return (
		<DataTable
			columns={columns}
			rows={members}
			getRowKey={(member) => member.puuid}
		/>
	)
}

export default TeamMembersTable
