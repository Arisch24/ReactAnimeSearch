import {
	Box,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	Slider,
	Typography,
	SelectChangeEvent,
	Button,
	Collapse,
} from '@mui/material';
import { SyntheticEvent, useState, useEffect } from 'react';

interface FilterByProps {
	sort: string;
	onSortChange: (sort: string) => void;
	filters: {
		min_score: number;
		max_score: number;
		type: string;
		status: string;
		rating: string;
	};
	onFilterChange: (filters: {
		min_score: number;
		max_score: number;
		type: string;
		status: string;
		rating: string;
	}) => void;
}

function FilterBy({
	sort,
	onSortChange,
	filters,
	onFilterChange,
}: FilterByProps) {
	const handleScoreChange = (
		e: Event | SyntheticEvent,
		newValue: number | number[],
	) => {
		if (Array.isArray(newValue)) {
			onFilterChange({
				...filters,
				min_score: newValue[0],
				max_score: newValue[1],
			});
		}
	};

	const handleTypeChange = (e: SelectChangeEvent<string>) => {
		onFilterChange({ ...filters, type: e.target.value });
	};

	const handleStatusChange = (e: SelectChangeEvent<string>) => {
		onFilterChange({ ...filters, status: e.target.value });
	};

	const handleRatingChange = (e: SelectChangeEvent<string>) => {
		onFilterChange({ ...filters, rating: e.target.value });
	};

	const [value, setValue] = useState<number[]>([
		filters.min_score,
		filters.max_score,
	]);

	const [expanded, setExpanded] = useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	useEffect(() => {
		setValue([filters.min_score, filters.max_score]);
	}, [filters.min_score, filters.max_score]);

	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				gap: 2,
				flexGrow: 1,
			}}>
			<Box
				sx={{
					display: 'flex',
					gap: 2,
					alignItems: 'center',
					justifyContent: 'space-between',
				}}>
				<Typography component="p" variant="h4">
					Filters
				</Typography>
				<Button
					onClick={handleExpandClick}
					variant="outlined"
					size="small">
					{expanded ? 'Hide Filters' : 'Show Filters'}
				</Button>
			</Box>
			<Collapse in={expanded} timeout={150} unmountOnExit>
				<Box
					sx={{
						display: 'flex',
						flexDirection: {
							xs: 'column',
							md: 'row',
						},
						alignItems: {
							xs: 'flex-start',
							md: 'center',
						},
						gap: 2,
						flexGrow: 1,
					}}>
					<FormControl fullWidth size="small">
						<Typography variant="body2" gutterBottom>
							Score Range
						</Typography>
						<Slider
							value={value}
							onChange={(e, newValue) =>
								setValue(newValue as number[])
							}
							onChangeCommitted={handleScoreChange}
							valueLabelDisplay="auto"
							min={0}
							max={10}
							size="small"
						/>
					</FormControl>

					<FormControl fullWidth size="small">
						<InputLabel>Type</InputLabel>
						<Select
							value={filters.type}
							onChange={handleTypeChange}>
							<MenuItem value="">All</MenuItem>
							<MenuItem value="tv">TV</MenuItem>
							<MenuItem value="movie">Movie</MenuItem>
							<MenuItem value="ova">OVA</MenuItem>
							<MenuItem value="special">Special</MenuItem>
							<MenuItem value="ona">ONA</MenuItem>
							<MenuItem value="music">Music</MenuItem>
						</Select>
					</FormControl>

					<FormControl fullWidth size="small">
						<InputLabel>Status</InputLabel>
						<Select
							value={filters.status}
							onChange={handleStatusChange}>
							<MenuItem value="">All</MenuItem>
							<MenuItem value="airing">Airing</MenuItem>
							<MenuItem value="complete">Completed</MenuItem>
							<MenuItem value="upcoming">Upcoming</MenuItem>
						</Select>
					</FormControl>

					<FormControl fullWidth size="small">
						<InputLabel>Rating</InputLabel>
						<Select
							value={filters.rating}
							onChange={handleRatingChange}>
							<MenuItem value="">All</MenuItem>
							<MenuItem value="g">G - All Ages</MenuItem>
							<MenuItem value="pg">PG - Children</MenuItem>
							<MenuItem value="pg13">
								PG-13 - Teens 13 or older
							</MenuItem>
							<MenuItem value="r17">
								R - 17+ (violence & profanity)
							</MenuItem>
							<MenuItem value="r">R+ - Mild Nudity</MenuItem>
							<MenuItem value="rx">Rx - Hentai</MenuItem>
						</Select>
					</FormControl>

					<FormControl sx={{ minWidth: 140 }} size="small">
						<InputLabel id="sortAnime">Sort</InputLabel>
						<Select
							labelId="sortAnime"
							value={sort}
							onChange={(e) => onSortChange(e.target.value)}
							label="Sort">
							<MenuItem value="asc">Ascending</MenuItem>
							<MenuItem value="desc">Descending</MenuItem>
						</Select>
					</FormControl>
				</Box>
			</Collapse>
		</Box>
	);
}

export default FilterBy;
