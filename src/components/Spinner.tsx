import { Box, CircularProgress } from '@mui/material';

function Spinner() {
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyContent: 'center',
				p: 4,
				minHeight: '200px',
				width: '100%',
			}}>
			<CircularProgress size={60} thickness={5} />
		</Box>
	);
}

export default Spinner;
