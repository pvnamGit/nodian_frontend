'use client';

import { Box, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useGetCurrentUserInfoQuery } from '@/app/redux-toolkit/features/userSlices';
import Login from '../login/page';

function Home({ isLoggedIn }: { isLoggedIn: boolean }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '80%',
        height: '50%',
        margin: 'auto',
        alignItems: 'center',
      }}
    >
      {isLoggedIn ? (
        <Typography
          variant="h2"
          sx={{
            marginBottom: 4,
          }}
        >
          Nodian Logged in
        </Typography>
      ) : (
        <Login />
      )}
    </Box>
  );
}

export default Home;
