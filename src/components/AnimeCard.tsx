import {
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Typography,
	Chip,
	Box,
	Divider,
	Button,
	CardActions,
} from '@mui/material';
import { Anime } from '../types';

interface AnimeCardProps {
	anime: Anime;
}

function AnimeCard({ anime }: AnimeCardProps) {
	return (
		<Card
			sx={{
				maxWidth: '100%',
				height: '100%',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'end',
				position: 'relative',
				'&:hover': {
					'& img': {
						transform: 'scale(1.07)',
						transition: 'transform 0.3s ease',
					},
				},
			}}>
			<CardActionArea
				sx={{
					flexGrow: 1,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'stretch',
				}}
				href={`/anime/${anime.mal_id}`}>
				<CardMedia
					component="figure"
					sx={{
						margin: 0,
						width: '100%',
						height: '100%',
						overflow: 'hidden',
						maxHeight: 300,
					}}>
					<img
						src={anime.images.jpg.large_image_url}
						alt={anime.title}
						loading="lazy"
						style={{
							width: '100%',
							height: '100%',
							objectFit: 'cover',
							objectPosition: 'top',
							transition: 'transform 0.3s ease',
						}}
					/>
				</CardMedia>
				<CardContent
					sx={{
						flexGrow: 1,
						display: 'flex',
						flexDirection: 'column',
						gap: 1.5,
					}}>
					<Box
						sx={{
							display: 'flex',
							flexWrap: 'wrap',
							gap: 0.5,
						}}>
						{anime.score !== null ? (
							<Chip
								sx={{
									position: 'absolute',
									top: 10,
									left: 10,
									letterSpacing: 0.75,
									lineHeight: 1,
								}}
								label={`${anime.score.toFixed(1)}/10`}
								size="small"
								color="error"
							/>
						) : (
							<Chip
								sx={{
									position: 'absolute',
									top: 10,
									left: 10,
									letterSpacing: 0.75,
									lineHeight: 1,
								}}
								label="?/10"
								size="small"
								color="error"
							/>
						)}
						{anime.type && (
							<Chip
								label={anime.type}
								size="small"
								variant="filled"
							/>
						)}
						{anime.status && (
							<Chip
								label={anime.status}
								size="small"
								color={
									anime.status === 'Currently Airing'
										? 'secondary'
										: anime.status === 'Finished Airing'
										? 'success'
										: anime.status === 'Not yet aired'
										? 'warning'
										: 'default'
								}
								variant="filled"
							/>
						)}
					</Box>
					<Box>
						<Typography gutterBottom variant="h4" component="h3">
							{anime.title}
						</Typography>
						<Typography
							variant="body2"
							sx={{ color: 'text.secondary' }}>
							{anime.synopsis
								? anime.synopsis.length > 100
									? `${anime.synopsis.substring(0, 100)}...`
									: anime.synopsis
								: 'No description available.'}
						</Typography>
					</Box>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
						}}>
						<Typography
							variant="body1"
							sx={{
								color: 'text.secondary',
								fontSize: '1.1rem',
							}}>
							Rating:{' '}
							{anime.rating
								? anime.rating
								: ' No rating available.'}
						</Typography>
						<Typography
							variant="body1"
							sx={{
								color: 'text.secondary',
								fontSize: '1.1rem',
							}}>
							Genres:{' '}
							{anime.genres.length > 0
								? anime.genres
										.map((genre) => genre.name)
										.join(', ')
								: ' No genres available.'}
						</Typography>
					</Box>
					<Divider
						sx={{
							marginTop: 'auto',
						}}
					/>
				</CardContent>
				<CardActions
					sx={{
						paddingX: 2,
						paddingY: 0,
						paddingBottom: 2,
					}}>
					<Button
						sx={{ flexGrow: 1 }}
						variant="outlined"
						color="primary"
						onMouseDown={(event) => event.stopPropagation()}
						onClick={(event) => {
							event.stopPropagation();
							event.preventDefault();
							window.open(anime.url, '_blank');
						}}>
						View on MyAnimeList
					</Button>
				</CardActions>
			</CardActionArea>
		</Card>
	);
}

export default AnimeCard;
