import server from './server';

// Get "My List" API (liked list)
export const getMyLikedList = async (page = 1, limit = 10) => {
  try {
    const { data } = await server.get(
      `/me/my-list?page=${page}&limit=${limit}`
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
