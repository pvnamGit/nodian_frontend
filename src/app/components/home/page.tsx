'use client';

import { Box, Button, Container, Paper, TextField, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetCurrentUserInfoQuery } from '@/app/redux-toolkit/features/userSlices';
import Login from '../login/page';

function Home() {
  const navigate = useNavigate(); // Initialize useHistory
  const { isLoading, data: userInfo, isError } = useGetCurrentUserInfoQuery();

  useEffect(() => {
    if (!isLoading && userInfo) {
      const { status } = userInfo;
      if (status) {
        navigate('/d'); // Initialize useHistory;
      }
    }
  }, [userInfo]);

  if (isError) {
    localStorage.clear();
  }

  return (
    <Box
      sx={{
        backgroundColor: '#3f51b5', // Dark purple background color
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white', // Text color
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="h2" align="center" gutterBottom>
          Nodian
        </Typography>
        <Typography variant="h5" align="center" paragraph>
          Your Note-Taking Companion
        </Typography>
        <Login />
      </Container>
    </Box>
  );
}

export default Home;
