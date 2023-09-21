'use client';

import { Box, Button, Container, Paper, TextField, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { useGetCurrentUserInfoQuery, useGetHelloWorldQuery } from '@/app/redux-toolkit/features/userSlices';
import { currentUserState } from '@/app/recoil/atomState';
import { SuccessfulResponse } from '@/app/types/types';
import Login from '../login/Login';

function Home() {
  const navigate = useNavigate(); // Initialize useHistory
  const { isLoading, data: userInfo, isError } = useGetCurrentUserInfoQuery();
  useGetHelloWorldQuery();
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);

  useEffect(() => {
    if (!isLoading && userInfo) {
      const { status } = userInfo;
      if (status) {
        if (!currentUser) {
          setCurrentUser((userInfo as SuccessfulResponse).data);
        }
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
        <Typography
          variant="h2"
          align="center"
          sx={{
            fontSize: '3rem',
            fontWeight: 'bold',
            marginBottom: 2,
          }}
          gutterBottom
        >
          Welcome to Nodian
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            fontSize: '1.5rem',
            marginBottom: 16,
          }}
          align="center"
          paragraph
        >
          Your notes repository
        </Typography>
        <Login />
      </Container>
    </Box>
  );
}

export default Home;
