import { useEffect, useState } from 'react'
import { Alert, Stack, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import LoadingBoundary from '../../hooks/common/useIsLoading'
import useGetPlayer from '../../hooks/player/useGetPlayer'
import PlayerLookupForm from '../../components/player/player-lookup-form'

const PlayerLookupPage = () => {
	const [lookup, setLookup] = useState({ name: '', tag: '' })
	const navigate = useNavigate()
	const { data: player, isLoading, error } = useGetPlayer(lookup)

	useEffect(() => {
		if (player) navigate(`/player/${player.account.puuid}`)
	}, [player, navigate])

	return (
		<Stack spacing={3} sx={{ py: 4 }}>
			<Typography variant='h4'>Player lookup</Typography>

			<PlayerLookupForm onSearch={setLookup} />

			{isLoading && <LoadingBoundary />}
			{error && <Alert severity='error'>{error.message}</Alert>}
		</Stack>
	)
}

export default PlayerLookupPage
