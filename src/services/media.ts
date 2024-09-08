import server from './server';

export const getMovies = async (page = 1, limit = 10) => {
  try {
    const { data } = await server.get(
      `/media/movies?page=${page}&limit=${limit}`
    );
    return data;
  } catch (error: any) {
    if (error instanceof Error) {
      return error.message;
    } else {
      return 'An unknown error occurred';
    }
  }
};

export const getTVShows = async (page = 1, limit = 10) => {
  try {
    const { data } = await server.get(
      `/media/tv-shows?page=${page}&limit=${limit}`
    );
    return data;
  } catch (error: any) {
    if (error instanceof Error) {
      return error.message;
    } else {
      return 'An unknown error occurred';
    }
  }
};
