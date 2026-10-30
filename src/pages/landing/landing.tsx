import { Button, Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

const LandingPage = () => {
	return (
		<Stack
			spacing={3}
			sx={{ py: 12, alignItems: 'center', textAlign: 'center' }}
		>
			<Typography variant='h2' sx={{ fontWeight: 700 }}>
				ValoView
			</Typography>
			<Typography variant='h6' color='text.secondary' sx={{ maxWidth: 560 }}>
				Look up any Premier team to see its roster, standings and match history.
			</Typography>
			<Button
				variant='contained'
				size='large'
				component={Link}
				to='/team-lookup'
			>
				Look up a team
			</Button>
		</Stack>
	)
}

export default LandingPage
