import { Box, Typography, Link } from '@mui/material';
import { AnimeDetailed } from '../../types';
import React from 'react';

interface AnimeDetailsAddInfoProps {
	anime: AnimeDetailed;
}

function AnimeDetailsAddInfo({ anime }: AnimeDetailsAddInfoProps) {
	return (
		<Box
			sx={{
				display: 'flex',
				flexDirection: 'column',
				gap: 0.75,
				mt: 2,
			}}>
			<Typography
				variant="h4"
				component="h2"
				gutterBottom
				fontWeight="bold">
				Additional Info
			</Typography>
			<Typography component="span" variant="body2">
				<b>Type:</b> {anime?.type}
			</Typography>
			<Typography component="span" variant="body2">
				<b>Status:</b> {anime?.status}
			</Typography>
			<Typography component="span" variant="body2">
				<b>Aired:</b> {anime?.aired.string}
			</Typography>
			<Typography component="span" variant="body2">
				<b>Duration:</b> {anime?.duration}
			</Typography>
			<Typography component="span" variant="body2">
				<b>Rating:</b> {anime?.rating}
			</Typography>
			<Typography component="span" variant="body2">
				<b>Source:</b> {anime?.source && anime?.source}
			</Typography>
			<Typography component="span" variant="body2">
				<b>Genres:</b>{' '}
				{(anime?.genres ?? []).length > 0
					? anime?.genres.map((genre, index) => (
							<React.Fragment key={index}>
								{index > 0 && ', '}
								<Link
									component="a"
									target="_blank"
									rel="noopener noreferrer"
									href={genre.url}>
									{genre.name}
								</Link>
							</React.Fragment>
					  ))
					: 'No genres'}
			</Typography>
			<Typography component="span" variant="body2">
				<b>Themes:</b>{' '}
				{(anime?.themes ?? []).length > 0
					? anime?.themes.map((theme, index) => (
							<React.Fragment key={index}>
								{index > 0 && ', '}
								<Link
									component="a"
									target="_blank"
									rel="noopener noreferrer"
									href={theme.url}>
									{theme.name}
								</Link>
							</React.Fragment>
					  ))
					: 'No themes'}
			</Typography>
			<Typography component="span" variant="body2">
				<b>Producers:</b>{' '}
				{(anime?.producers ?? []).length > 0
					? anime?.producers.map((producer, index) => (
							<React.Fragment key={index}>
								{index > 0 && ', '}
								<Link
									component="a"
									target="_blank"
									rel="noopener noreferrer"
									href={producer.url}>
									{producer.name}
								</Link>
							</React.Fragment>
					  ))
					: 'No producers'}
			</Typography>
			<Typography component="span" variant="body2">
				<b>Studios:</b>{' '}
				{(anime?.studios ?? []).length > 0
					? anime?.studios.map((studio, index) => (
							<React.Fragment key={index}>
								{index > 0 && ', '}
								<Link
									component="a"
									target="_blank"
									rel="noopener noreferrer"
									href={studio.url}>
									{studio.name}
								</Link>
							</React.Fragment>
					  ))
					: 'No studios'}
			</Typography>
			<Typography component="span" variant="body2">
				<b>Licensors:</b>{' '}
				{(anime?.licensors ?? []).length > 0
					? anime?.licensors.map((studio, index) => (
							<React.Fragment key={index}>
								{index > 0 && ', '}
								<Link
									component="a"
									target="_blank"
									rel="noopener noreferrer"
									href={studio.url}>
									{studio.name}
								</Link>
							</React.Fragment>
					  ))
					: 'No licensors'}
			</Typography>
		</Box>
	);
}

export default AnimeDetailsAddInfo;
