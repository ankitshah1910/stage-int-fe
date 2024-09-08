'use client';

import { useState } from 'react';
import { Box, Button, TextField, Typography, Container } from '@mui/material';
import { useRouter } from 'next/navigation';
import { loginUser } from '@/services/auth';
import { useAuth } from '@/context/authContext';

const LoginPage = () => {
  const router = useRouter();
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await loginUser({ username, password });

    if (response.token) {
      login(response.token, response.myList);
      router.push('/');
    } else {
      setError(response.message || 'Login failed');
    }
  };

  return (
    <Container maxWidth='sm'>
      <Box sx={{ mt: 5 }}>
        <Typography variant='h4' align='center'>
          Login
        </Typography>
        <form onSubmit={handleLogin}>
          <TextField
            fullWidth
            label='Username'
            variant='outlined'
            margin='normal'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label='Password'
            type='password'
            variant='outlined'
            margin='normal'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && (
            <Typography color='error' align='center' sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}
          <Button type='submit' variant='contained' fullWidth>
            Login
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default LoginPage;
