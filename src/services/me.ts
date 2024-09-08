import server from './server';

const getBearerToken = () => {
  return localStorage.getItem('token');
};

export const getMyLikedList = async (page = 1, limit = 3) => {
  try {
    const token = getBearerToken();
    const { data } = await server.get(
      `/me/my-list?page=${page}&limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
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

export const addToLikedList = async (itemId: string, type: string) => {
  try {
    const token = getBearerToken();
    const { data } = await server.post(
      `/me/add`,
      { itemId, type },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
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

export const removeFromLikedList = async (itemId: string) => {
  try {
    const token = getBearerToken();
    const { data } = await server.delete(`/me/remove/${itemId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (error: any) {
    if (error instanceof Error) {
      return error.message;
    } else {
      return 'An unknown error occurred';
    }
  }
};
