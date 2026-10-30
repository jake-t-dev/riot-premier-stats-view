import { Alert, Avatar, Box, Button, Stack, Typography } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import LoadingBoundary from '../../hooks/common/useIsLoading'
import useGetPlayer from '../../hooks/player/useGetPlayer'
import useGetPlayerCard from '../../hooks/valorant-api/useGetPlayerCard'
import useGetCompetitiveTier from '../../hooks/valorant-api/useGetCompetitiveTier'
import PlayerTable from '../../components/player/player-table'

const PlayerPage = () => {
	const { puuid } = useParams()
	const navigate = useNavigate()
	const { data: player, isLoading, error } = useGetPlayer({ puuid })
	const accountCard = player?.account.card
	const cardId = typeof accountCard === 'string' ? accountCard : accountCard?.id
	const fallbackCard =
		typeof accountCard === 'object' && accountCard !== null
			? accountCard.small
			: undefined
	const { data: card } = useGetPlayerCard(cardId)
	const { data: rank } = useGetCompetitiveTier(
		player?.mmr?.current_data?.currenttier,
	)

	return (
		<Stack spacing={3} sx={{ py: 4 }}>
			<Button
				onClick={() =>
					window.history.length > 1 ? navigate(-1) : navigate('/team-lookup')
				}
				sx={{ alignSelf: 'flex-start' }}
			>
				← Back
			</Button>

			<Stack direction='row' spacing={2} sx={{ alignItems: 'center' }}>
				{(card?.smallArt ?? fallbackCard) && (
					<Avatar src={card?.smallArt ?? fallbackCard} variant='rounded' />
				)}
				<Typography variant='h4'>
					{player
						? `${player.account.name}#${player.account.tag}`
						: 'Player details'}
				</Typography>
				{rank?.smallIcon && (
					<Box
						component='img'
						src={rank.smallIcon}
						alt={rank.tierName}
						title={rank.tierName}
						sx={{ height: 40 }}
					/>
				)}
			</Stack>

			{isLoading && <LoadingBoundary />}
			{error && <Alert severity='error'>{error.message}</Alert>}
			{player && <PlayerTable player={player} />}
		</Stack>
	)
}

export default PlayerPage
