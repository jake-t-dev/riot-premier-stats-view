import Container from '@mui/material/Container'
import { Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './components/navbar/navbar'
import DashboardPage from './pages/dashboard/dashboard'
import PlayerPage from './pages/player/player'
import PlayerLookupPage from './pages/player/player-lookup'
import LandingPage from './pages/landing/landing'

const App = () => {
	return (
		<>
			<Navbar />
			<Container
				maxWidth='md'
				sx={{
					minHeight: 'calc(100vh - 64px)',
					display: 'flex',
					flexDirection: 'column',
					borderInline: 1,
					borderColor: 'divider',
				}}
			>
				<Routes>
					<Route path='/' element={<LandingPage />} />
					<Route path='/team-lookup/:teamId?' element={<DashboardPage />} />
					<Route path='/player-lookup' element={<PlayerLookupPage />} />
					<Route path='/player/:puuid' element={<PlayerPage />} />
					<Route path='*' element={<Navigate to='/' replace />} />
				</Routes>
			</Container>
		</>
	)
}

export default App
