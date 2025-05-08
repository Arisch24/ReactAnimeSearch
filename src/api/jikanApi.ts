import axios from 'axios';
import { AnimeDetailed, AnimeResponse } from '../types';

export const API = axios.create({
	baseURL: 'https://api.jikan.moe/v4',
});

export const searchAnime = async (
	abortSignal: AbortSignal | undefined,
	query: string,
	page: number = 1,
	sort: string = 'asc',
	order_by: string = 'mal_id',
	min_score: number = 0,
	max_score: number = 10,
	type?: string,
	status?: string,
	rating?: string,
): Promise<AnimeResponse> => {
	try {
		const response = await API.get('/anime', {
			signal: abortSignal,
			params: {
				q: query,
				page: page,
				limit: 12,
				sort,
				order_by,
				min_score,
				max_score,
				type,
				status,
				rating,
			},
		});

		return {
			data: response.data.data,
			pagination: {
				currentPage: response.data.pagination.current_page,
				lastVisiblePage: response.data.pagination.last_visible_page,
				hasNextPage: response.data.pagination.has_next_page,
				items: {
					count: response.data.pagination.items.count,
					total: response.data.pagination.items.total,
					per_page: response.data.pagination.items.per_page,
				},
			},
		};
	} catch (error) {
		if (axios.isAxiosError(error) && !abortSignal?.aborted) {
			console.error('Error fetching anime data:', error);
		}
		throw error;
	}
};

export const getAnimeById = async (id: number): Promise<AnimeDetailed> => {
	try {
		const response = await API.get(`/anime/${id}`);

		if (response.status !== 200) {
			throw new Error('Failed to fetch anime details');
		}

		return response.data.data;
	} catch (error) {
		console.error('Error fetching anime details:', error);
		throw error;
	}
};
