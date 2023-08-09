'use client';

import { Box, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useGetCurrentUserInfoQuery } from '@/app/redux-toolkit/features/userSlices';

function Home() {
  const { data: currentUser, isLoading } = useGetCurrentUserInfoQuery();
  useEffect(() => {
    if (!isLoading) {
      console.log('🚀 ~ file: page.tsx:9 ~ Home ~ currentUser:', currentUser);
    }
  });

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
      <Typography
        variant="h2"
        sx={{
          marginBottom: 4,
        }}
      >
        Nodian Logged in
      </Typography>
    </Box>
  );
}

export default Home;
