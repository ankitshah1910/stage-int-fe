import server from './server';

// Login API
export const login = async (email: string, password: string) => {
  try {
    const { data } = await server.post('/auth/login', { email, password });
    return data;
  } catch (error: any) {
    if (error instanceof Error) {
      return error.message;
    } else {
      return 'An unknown error occurred';
    }
  }
};

// Register API
export const register = async (
  email: string,
  password: string,
  name: string
) => {
  try {
    const { data } = await server.post('/auth/register', {
      email,
      password,
      name,
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
