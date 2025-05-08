import {
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Typography,
	Box,
	Divider,
	CardActions,
	Skeleton,
} from '@mui/material';

function AnimeCardLoader() {
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
				}}>
				<CardMedia
					component="figure"
					sx={{
						margin: 0,
						width: '100%',
						height: '100%',
						overflow: 'hidden',
						maxHeight: 300,
					}}>
					<Skeleton width={400} height={250} variant="rectangular" />
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
						<Skeleton variant="rounded" width={100} height={20} />
						<Skeleton variant="rounded" width={100} height={20} />
					</Box>
					<Box>
						<Typography gutterBottom variant="h4" component="h3">
							<Skeleton variant="text" width={160} height={26} />
						</Typography>
						<Typography
							variant="body2"
							sx={{ color: 'text.secondary' }}>
							<Skeleton variant="text" width={150} height={23} />
							<Skeleton variant="text" width={270} height={23} />
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
							<Skeleton variant="text" width={140} height={15} />
						</Typography>
						<Typography
							variant="body1"
							sx={{
								color: 'text.secondary',
								fontSize: '1.1rem',
							}}>
							<Skeleton variant="text" width={250} height={15} />
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
					<Skeleton variant="rounded" width={300} height={30} />
				</CardActions>
			</CardActionArea>
		</Card>
	);
}

export default AnimeCardLoader;
