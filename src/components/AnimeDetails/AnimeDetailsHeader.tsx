import { Box, Typography, Chip, Rating } from '@mui/material';
import { AnimeDetailed } from '../../types';
import { FavoriteBorder } from '@mui/icons-material';

interface AnimeDetailsHeaderProps {
	anime: AnimeDetailed;
}

function AnimeDetailsHeader({ anime }: AnimeDetailsHeaderProps) {
	return (
		<>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					gap: 1,
				}}>
				<Typography
					variant="h1"
					component="h1"
					gutterBottom
					display={'inline'}
					fontWeight="bold">
					{anime?.title}{' '}
					<Typography
						variant="h3"
						component="span"
						gutterBottom
						display={'inline'}
						sx={{ opacity: 0.9 }}>
						({anime?.title_japanese})
					</Typography>
				</Typography>
				<Chip
					label={`${anime?.score ? anime.score.toFixed(1) : '?'}/10`}
					size="medium"
					color="error"
				/>
			</Box>

			<Box
				sx={{
					display: 'flex',
					flexWrap: 'wrap',
					gap: 1,
					my: 2,
				}}>
				{anime?.genres.map((genre) => (
					<Chip
						key={genre.mal_id}
						label={genre.name}
						sx={{
							backgroundColor: 'rgba(255,255,255,0.2)',
							color: 'white',
							'&:hover': {
								backgroundColor: 'rgba(255,255,255,0.3)',
							},
						}}
					/>
				))}
			</Box>

			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'space-between',
					mb: 2,
				}}>
				<Box sx={{ display: 'flex' }}>
					<Rating
						value={anime?.score ? anime?.score / 2 : 0}
						precision={0.5}
						readOnly
					/>
					<Typography variant="body1" sx={{ ml: 1 }}>
						{anime?.score ? `${anime?.score} / 10` : 'No rating'}
						{(anime?.scored_by ?? 0) > 0 &&
							` (${(
								anime?.scored_by ?? 0
							).toLocaleString()} votes)`}
					</Typography>
				</Box>
				<Box
					sx={{
						display: 'flex',
					}}>
					<FavoriteBorder />
					<Typography variant="body1" sx={{ ml: 1 }}>
						{anime?.favorites
							? `${anime?.favorites.toLocaleString()} favorites`
							: 'No favorites'}
					</Typography>
				</Box>
			</Box>
		</>
	);
}

export default AnimeDetailsHeader;
