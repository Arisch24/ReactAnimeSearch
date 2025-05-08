import { createTheme } from '@mui/material';

const theme = createTheme({
	palette: {
		mode: 'dark',
		// primary: {
		// 	main: '#FF6F61',
		// 	contrastText: '#fff',
		// },
		// secondary: {
		// 	main: '#6B5B93',
		// 	contrastText: '#fff',
		// },
		// text: {
		// 	primary: '#333',
		// 	secondary: '#555',
		// },
	},
	typography: {
		htmlFontSize: 10,
		fontFamily: 'Inter, sans-serif',
		h1: {
			fontWeight: 700,
			fontSize: '3.815rem',
		},
		h2: {
			fontWeight: 700,
			fontSize: '3.052rem',
		},
		h3: {
			fontWeight: 700,
			fontSize: '2.441rem',
		},
		h4: {
			fontWeight: 700,
			fontSize: '1.953rem',
		},
		h5: {
			fontWeight: 700,
			fontSize: '1.563rem',
		},
		h6: {
			fontWeight: 700,
			fontSize: '1.25rem',
		},
		body1: {
			fontWeight: 400,
		},
		body2: {
			fontWeight: 400,
		},
	},
	components: {
		MuiCard: {
			styleOverrides: {
				root: {
					borderRadius: '8px',
				},
			},
		},
		MuiButton: {
			styleOverrides: {
				root: {
					textTransform: 'none',
				},
			},
		},
	},
});

export default theme;
