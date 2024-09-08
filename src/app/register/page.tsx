'use client';

import { useState } from 'react';
import { Box, Button, TextField, Typography, Container } from '@mui/material';
import { useRouter } from 'next/navigation';
import { registerUser } from '@/services/auth';

const RegisterPage = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await registerUser({ username, name, password });

    if (response.message) {
      router.push('/login');
    } else {
      setError(response.message || 'Registration failed');
    }
  };

  return (
    <Container maxWidth='sm'>
      <Box sx={{ mt: 5 }}>
        <Typography variant='h4' align='center'>
          Register
        </Typography>
        <form onSubmit={handleRegister}>
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
            label='Name'
            variant='outlined'
            margin='normal'
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            Register
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default RegisterPage;
