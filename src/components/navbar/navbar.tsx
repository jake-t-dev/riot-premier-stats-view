import {
	AppBar,
	Container,
	Tab,
	Tabs,
	Toolbar,
	Typography,
} from '@mui/material'
import { Link, useLocation } from 'react-router-dom'

const tabs = [
	{ label: 'Premier', to: '/team-lookup', match: '/team-lookup' },
	{ label: 'Players', to: '/player-lookup', match: '/player' },
]

const Navbar = () => {
	const { pathname } = useLocation()
	const current =
		tabs.find((tab) => pathname.startsWith(tab.match ?? tab.to))?.to ?? false

	return (
		<AppBar
			position='sticky'
			elevation={0}
			sx={{
				bgcolor: 'background.navbar',
				backgroundImage: 'none',
				borderBottom: 1,
				borderColor: 'divider',
			}}
		>
			<Container maxWidth='md'>
				<Toolbar disableGutters sx={{ gap: 3 }}>
					<Typography
						variant='h6'
						component={Link}
						to='/'
						sx={{
							color: 'primary.main',
							textDecoration: 'none',
							fontWeight: 700,
						}}
					>
						ValoView
					</Typography>
					<Tabs value={current}>
						{tabs.map((tab) => (
							<Tab
								key={tab.to}
								label={tab.label}
								value={tab.to}
								component={Link}
								to={tab.to}
							/>
						))}
					</Tabs>
				</Toolbar>
			</Container>
		</AppBar>
	)
}

export default Navbar
