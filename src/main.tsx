import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import theme from './theme'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<ThemeProvider theme={theme}>
			<QueryClientProvider client={queryClient}>
				<CssBaseline />
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</QueryClientProvider>
		</ThemeProvider>
	</StrictMode>,
)
