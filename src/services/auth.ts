import server from './server';
import { AxiosError } from 'axios';
export const registerUser = async (userData: {
  username: string;
  name: string;
  password: string;
}) => {
  try {
    const { data } = await server.post('/auth/register', userData);
    return { data, success: true };
  } catch (error: any) {
    return {
      success: false,
      message:
        error instanceof AxiosError
          ? error.response?.data.message
          : 'An unknown error occurred',
    };
  }
};

export const loginUser = async (credentials: {
  username: string;
  password: string;
}) => {
  try {
    const { data } = await server.post('/auth/login', credentials);
    return { data, success: true };
  } catch (error: any) {
    return {
      success: false,
      message:
        error instanceof AxiosError
          ? error.response?.data.message
          : 'Invalid username or password',
    };
  }
};
