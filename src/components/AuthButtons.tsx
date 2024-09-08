'use client';

import { useAuth } from '@/context/authContext';
import { Button, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import PersonIcon from '@mui/icons-material/Person';

const AuthButtons = () => {
  const router = useRouter();
  const { isAuthenticated, logout, userName } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleLoginClick = () => {
    router.push('/login');
  };

  const handleRegisterClick = () => {
    router.push('/register');
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {isAuthenticated ? (
        <>
          <IconButton color='inherit' onClick={handleMenuClick}>
            <PersonIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem disabled>
              <Typography variant='body1'>
                Hello {userName ?? 'there,'}{' '}
                {/* Display user's greeting as non-clickable */}
              </Typography>
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleMenuClose();
                router.push('/my-list');
              }}
            >
              My List
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleLogout();
                handleMenuClose();
              }}
            >
              Logout
            </MenuItem>
          </Menu>
        </>
      ) : (
        <>
          <Button color='inherit' onClick={handleLoginClick}>
            Login
          </Button>
          <Button color='inherit' onClick={handleRegisterClick}>
            Register
          </Button>
        </>
      )}
    </>
  );
};

export default AuthButtons;
