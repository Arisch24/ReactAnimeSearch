import { useCallback, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
	Container,
	Grid,
	Typography,
	Box,
	Paper,
	Divider,
	Button,
	Alert,
	Link,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import { getAnimeById } from '../api/jikanApi';
import { AnimeDetailed } from '../types';
import Spinner from '../components/Spinner';
import AnimeDetailsAddInfo from '../components/AnimeDetails/AnimeDetailsAddInfo';
import AnimeDetailsHeader from '../components/AnimeDetails/AnimeDetailsHeader';

function AnimeDetailsPage() {
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();

	const [anime, setAnime] = useState<AnimeDetailed>();
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	const fetchAnimeDetails = useCallback(async () => {
		if (!id) return;

		setIsLoading(true);
		setError(null);

		try {
			const animeId = parseInt(id || '0', 10);
			const data = await getAnimeById(animeId);
			setAnime(data);
		} catch (err) {
			setError(
				err instanceof Error
					? err.message
					: 'Failed to load anime details',
			);
		} finally {
			setIsLoading(false);
		}
	}, [id]);

	useEffect(() => {
		fetchAnimeDetails();

		return () => {
			setAnime(undefined);
			setError(null);
			setIsLoading(false);
		};
	}, [fetchAnimeDetails]);

	const handleGoBack = () => {
		navigate('/');
	};

	return (
		<Container maxWidth="lg" sx={{ py: 4 }}>
			{isLoading && (
				<>
					<Spinner />
				</>
			)}

			{error && (
				<>
					<Button
						startIcon={<ArrowBack />}
						onClick={handleGoBack}
						variant="outlined"
						sx={{ mb: 3 }}>
						Go Back
					</Button>
					<Alert severity="error" sx={{ mb: 2 }}>
						{error}
					</Alert>
					<Button
						variant="contained"
						onClick={() => window.location.reload()}>
						Retry
					</Button>
				</>
			)}

			<Button
				startIcon={<ArrowBack />}
				onClick={handleGoBack}
				variant="outlined"
				sx={{ mb: 3 }}>
				Back to Search
			</Button>

			<Paper elevation={3} sx={{ overflow: 'hidden', mb: 4 }}>
				<Box
					sx={{
						p: { xs: 2, md: 4 },
						background: `linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.75)), url(${anime?.images.jpg.large_image_url})`,
						backgroundSize: 'cover',
						backgroundPosition: 'center',
						color: 'white',
						position: 'relative',
					}}>
					<Grid container spacing={4}>
						<Grid size={{ xs: 12, md: 3 }}>
							<Box
								component="img"
								src={anime?.images.jpg.large_image_url}
								alt={anime?.title}
								sx={{
									width: '100%',
									borderRadius: 2,
									boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
									border: '4px solid white',
								}}
							/>
							{anime && <AnimeDetailsAddInfo anime={anime} />}
						</Grid>
						<Grid size={{ xs: 12, md: 9 }}>
							{anime && <AnimeDetailsHeader anime={anime} />}

							<Typography
								variant="h4"
								component="h2"
								gutterBottom
								fontWeight="bold">
								Synopsis
							</Typography>
							<Typography variant="body1">
								{anime?.synopsis || 'No synopsis available.'}
							</Typography>
							<Divider sx={{ my: 4 }} />
							<Typography
								variant="h4"
								component="h2"
								gutterBottom
								fontWeight="bold">
								Background
							</Typography>
							<Typography variant="body1">
								{anime?.background ||
									'No background available.'}
							</Typography>
						</Grid>
					</Grid>
					<Divider sx={{ my: 4 }} />
					<Box
						sx={{
							maxWidth: '800px',
							margin: '0 auto',
							display: 'flex',
							flexDirection: 'column',
							gap: 2,
						}}>
						<Box sx={{ flexGrow: 1 }}>
							<Typography
								variant="h3"
								component="h2"
								gutterBottom
								fontWeight="bold">
								Watch Trailer
							</Typography>
						</Box>
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								flexDirection: 'column',
							}}>
							<iframe
								title="Anime Trailer"
								style={{
									borderRadius: 8,
									boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
								}}
								width="800"
								height="400"
								src={`https://www.youtube.com/embed/${anime?.trailer?.youtube_id}`}></iframe>
							<Typography
								marginBlockStart={1}
								variant="body2"
								fontSize={12}
								textAlign={'center'}>
								If the video doesn't load for whatever reason,
								you can watch it{' '}
								<Link
									component="a"
									href={anime?.trailer?.embed_url}
									target="_blank"
									rel="noopener noreferrer">
									here.
								</Link>
							</Typography>
						</Box>
					</Box>
				</Box>
			</Paper>
		</Container>
	);
}

export default AnimeDetailsPage;
