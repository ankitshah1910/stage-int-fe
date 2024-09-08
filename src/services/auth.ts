import server from './server';

export const registerUser = async (userData: {
  username: string;
  name: string;
  password: string;
}) => {
  try {
    const { data } = await server.post('/auth/register', userData);
    return data;
  } catch (error: any) {
    return {
      message:
        error instanceof Error ? error.message : 'An unknown error occurred',
    };
  }
};

export const loginUser = async (credentials: {
  username: string;
  password: string;
}) => {
  try {
    const { data } = await server.post('/auth/login', credentials);
    return data;
  } catch (error: any) {
    return {
      message:
        error instanceof Error ? error.message : 'Invalid username or password',
    };
  }
};
