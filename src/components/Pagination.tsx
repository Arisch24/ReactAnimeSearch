import { Pagination as MuiPagination, Box } from '@mui/material';
import { Pagination as ApiPaginationProps } from '../types';

interface PaginationProps extends ApiPaginationProps {
	onPageChange: (page: number) => void;
}

function Pagination({ onPageChange, ...pagination }: PaginationProps) {
	const handleChange = (event: React.ChangeEvent<unknown>, page: number) => {
		onPageChange(page);
	};

	return (
		<Box
			sx={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				flexDirection: 'column',
				my: 4,
			}}>
			<MuiPagination
				count={pagination.lastVisiblePage}
				page={pagination.currentPage}
				onChange={handleChange}
				color="primary"
				size="large"
				siblingCount={1}
				boundaryCount={1}
			/>
		</Box>
	);
}

export default Pagination;
