import { useCallback, useEffect, useRef, useState } from 'react';
import SearchBar from '../components/SearchBar';
import {
	Alert,
	Box,
	Container,
	Divider,
	Paper,
	Stack,
	Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { SearchOff } from '@mui/icons-material';
import { useSearchParams } from 'react-router-dom';
import { Anime } from '../types';
import AnimeCard from '../components/AnimeCard';
import Pagination from '../components/Pagination';
import { searchAnime } from '../api/jikanApi';
import FilterBy from '../components/FilterBy';
import AnimeCardLoader from '../components/AnimeCardLoader';

function SearchPage() {
	const [searchParams, setSearchParams] = useSearchParams();

	// defaults
	const initialQuery = searchParams.get('query') || '';
	const currentPage = parseInt(searchParams.get('page') || '1', 10);
	const initialSort = searchParams.get('sort') || 'asc';
	const initialFilters = {
		min_score: parseInt(searchParams.get('min_score') || '0') || 0,
		max_score: parseInt(searchParams.get('max_score') || '10') || 10,
		type: searchParams.get('type') || '',
		status: searchParams.get('status') || '',
		rating: searchParams.get('rating') || '',
	};

	const [isLoading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [searchQuery, setSearchQuery] = useState(initialQuery);
	const [sort, setSort] = useState(initialSort);
	const [filters, setFilters] = useState(initialFilters);
	const [pagination, setPagination] = useState({
		currentPage,
		hasNextPage: false,
		lastVisiblePage: 0,
		items: {
			count: 0,
			total: 0,
			per_page: 0,
		},
	});
	const [searchResults, setSearchResults] = useState<Anime[]>([]);
	const [noResults, setNoResults] = useState(false);
	const abortControllerRef = useRef<AbortController>(null);

	const handleSearch = useCallback((query: string) => {
		setSearchQuery(query);
	}, []);

	const handlePageChange = useCallback((page: number) => {
		setPagination((prev) => ({
			...prev,
			currentPage: page,
		}));
	}, []);

	const handleSortChange = useCallback((sort: string) => {
		setSort(sort);
	}, []);

	const handleFilterChange = useCallback(
		(newFilters: {
			min_score: number;
			max_score: number;
			type: string;
			status: string;
			rating: string;
		}) => {
			setFilters((prevFilters) => ({
				...prevFilters,
				...newFilters,
			}));
		},
		[],
	);

	const fetchAnimeData = useCallback(async () => {
		if (abortControllerRef.current) {
			abortControllerRef.current.abort();
		}
		abortControllerRef.current = new AbortController();
		const { signal: abortSignal } = abortControllerRef.current;

		setSearchParams({
			query: searchQuery,
			page: pagination.currentPage.toString(),
			sort,
			min_score: filters.min_score.toString(),
			max_score: filters.max_score.toString(),
			type: filters.type,
			status: filters.status,
			rating: filters.rating,
		});

		setSearchResults([]);
		setLoading(true);
		setError(null);

		try {
			const response = await searchAnime(
				abortSignal,
				searchQuery,
				pagination.currentPage,
				sort,
				'mal_id',
				filters.min_score,
				filters.max_score,
				filters.type,
				filters.status,
				filters.rating,
			);
			// Jikan API returns some duplicate mal_id values
			const uniqueData = Array.from(
				new Map(
					response.data.map((item) => [item.mal_id, item]),
				).values(),
			);
			setLoading(false);
			setSearchResults(uniqueData);
			setPagination({
				currentPage: response.pagination.currentPage,
				lastVisiblePage: response.pagination.lastVisiblePage,
				hasNextPage: response.pagination.hasNextPage,
				items: {
					count: response.pagination.items.count,
					total: response.pagination.items.total,
					per_page: response.pagination.items.per_page,
				},
			});
			setNoResults(response.data.length === 0);
		} catch (error) {
			if (abortSignal.aborted) {
				return;
			} // Ignore errors caused by aborting
			setError(
				error instanceof Error ? error.message : 'An error occurred',
			);
			setSearchResults([]);
		}
	}, [setSearchParams, searchQuery, pagination.currentPage, sort, filters]);

	useEffect(() => {
		fetchAnimeData();

		return () => {
			if (abortControllerRef.current) {
				abortControllerRef.current.abort();
			}
		};
	}, [fetchAnimeData]);

	return (
		<Container maxWidth={'lg'} sx={{ py: 4 }}>
			<Box sx={{ mb: 4, textAlign: 'center' }}>
				<Typography variant="h1" component="h1" gutterBottom>
					Search for Your Favorite Anime
				</Typography>
				<SearchBar
					initialQuery={initialQuery}
					onSearch={handleSearch}
				/>
			</Box>
			<Divider sx={{ mb: 3 }} />
			<Stack
				direction="row"
				spacing={2}
				sx={{
					mb: 2,
					justifyContent: 'space-between',
					alignItems: 'center',
				}}>
				<FilterBy
					sort={sort}
					onSortChange={handleSortChange}
					filters={filters}
					onFilterChange={handleFilterChange}
				/>
			</Stack>
			<Divider sx={{ mb: 3 }} />

			{error && (
				<Alert
					severity="error"
					sx={{ mb: 4 }}
					onClose={() => setError(null)}>
					{error}
				</Alert>
			)}

			{isLoading && searchResults.length <= 0 ? (
				<Grid container spacing={3}>
					{Array.from({ length: 12 }, (_, index) => (
						<Grid
							size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
							key={index}>
							<AnimeCardLoader />
						</Grid>
					))}
				</Grid>
			) : noResults ? (
				<Paper elevation={2} sx={{ p: 5, textAlign: 'center', mt: 4 }}>
					<SearchOff
						sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }}
					/>
					<Typography variant="h5" gutterBottom>
						No results found
					</Typography>
					<Typography variant="body1" color="text.secondary">
						Try searching with different keywords or check your
						spelling.
					</Typography>
				</Paper>
			) : (
				searchResults.length > 0 && (
					<>
						<Box>
							<Stack
								direction="row"
								spacing={2}
								sx={{
									mb: 2,
									justifyContent: 'space-between',
									alignItems: 'center',
								}}>
								<Typography
									variant="body2"
									color="text.secondary"
									sx={{ mb: 1 }}>
									Showing page {pagination.currentPage} of{' '}
									{pagination.lastVisiblePage}{' '}
									{`(${pagination.items.total} results)`}
								</Typography>
							</Stack>
							<Grid container spacing={3}>
								{searchResults.map((anime) => (
									<Grid
										size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
										key={anime.mal_id}>
										<AnimeCard anime={anime} />
									</Grid>
								))}
							</Grid>

							{
								<Pagination
									currentPage={pagination.currentPage}
									lastVisiblePage={pagination.lastVisiblePage}
									hasNextPage={pagination.hasNextPage}
									items={pagination.items}
									onPageChange={handlePageChange}
								/>
							}
						</Box>
					</>
				)
			)}
		</Container>
	);
}

export default SearchPage;
