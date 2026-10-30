import { Box, CircularProgress } from '@mui/material'
import { useIsFetching } from '@tanstack/react-query'

const LoadingBoundary = () => {
	const isFetching = useIsFetching()
	const isLoading = isFetching > 0

	if (isLoading) {
		return (
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					minHeight: '100%',
					width: '100%',
				}}
			>
				<CircularProgress size={40} />
			</Box>
		)
	}
}

export default LoadingBoundary
