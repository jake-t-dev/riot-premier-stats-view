import { createTheme } from '@mui/material/styles'

declare module '@mui/material/styles' {
	interface TypeBackground {
		navbar: string
	}
}

const theme = createTheme({
	palette: {
		mode: 'dark',
		primary: {
			main: '#ff4654',
			contrastText: '#ffffff',
		},
		secondary: {
			main: '#ba3a46',
			contrastText: '#ffffff',
		},
		background: {
			default: '#111111',
			paper: '#111823',
			navbar: '#111823',
		},
		text: {
			primary: '#ffffff',
		},
	},
	shape: {
		borderRadius: 8,
	},
	typography: {
		fontFamily: '"Share Tech", system-ui, Avenir, Helvetica, Arial, sans-serif',
	},
})

export default theme
