'use client';

import { ReactNode } from 'react';
import './globals.css';
import { CssBaseline } from '@mui/material';
import { Container, AppBar, Toolbar, Typography, Box } from '@mui/material';
import { useRouter } from 'next/navigation';
import { AuthProvider } from '@/context/authContext';
import AuthButtons from '@/components/AuthButtons';

export default function RootLayout({ children }: { children: ReactNode }) {
  const router = useRouter();

  const goToHome = () => {
    router.push('/');
  };

  return (
    <html lang='en'>
      <head>
        <title>Stage App</title>
      </head>
      <body>
        <AuthProvider>
          <Container maxWidth='lg'>
            <AppBar position='static'>
              <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography
                    variant='h6'
                    onClick={goToHome}
                    sx={{ cursor: 'pointer' }}
                  >
                    Stage
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <AuthButtons />
                </Box>
              </Toolbar>
            </AppBar>
            <CssBaseline />
            {children}
          </Container>
        </AuthProvider>
      </body>
    </html>
  );
}
