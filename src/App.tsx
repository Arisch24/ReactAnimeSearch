// import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { Box, CssBaseline } from '@mui/material';
import theme from './theme/theme';
import Header from './components/Header';
import SearchPage from './pages/SearchPage';
import Error404 from './pages/Error404';
import AnimeDetailsPage from './pages/AnimeDetailsPage';

function App() {
	return (
		<>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						minHeight: '100vh',
					}}>
					<Header />
					<Box sx={{ flexGrow: 1 }}>
						<Routes>
							<Route path="/" element={<SearchPage />} />
							<Route
								path="/anime/:id"
								element={<AnimeDetailsPage />}
							/>
							<Route path="*" element={<Error404 />} />
						</Routes>
					</Box>
				</Box>
			</ThemeProvider>
		</>
	);
}

export default App;
