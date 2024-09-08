import { Movie, ResponseData, TVShow } from '@/types/type';
import server from './server';
import axios from 'axios';

export const getMovies = async (
  page = 1,
  limit = 10
): Promise<ResponseData<Movie>> => {
  try {
    const { data } = await server.get<ResponseData<Movie>>(
      `/media/movies?page=${page}&limit=${limit}`
    );
    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data.message || 'Error fetching Movies';
    } else if (error instanceof Error) {
      throw error.message;
    } else {
      throw 'An unknown error occurred';
    }
  }
};

export const getTVShows = async (
  page = 1,
  limit = 10
): Promise<ResponseData<TVShow>> => {
  try {
    const { data } = await server.get<ResponseData<TVShow>>(
      `/media/tv-shows?page=${page}&limit=${limit}`
    );
    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response.data.message || 'Error fetching TV Shows';
    } else if (error instanceof Error) {
      throw error.message;
    } else {
      throw 'An unknown error occurred';
    }
  }
};
