'use client';

import { Box, Button, Typography } from '@mui/material';
import { GoogleLogin, useGoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';
import { useLoginByGoogleMutation } from '@/app/redux-toolkit/features/authSlice';

const clientGoogleId: string = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string;

function Login() {
  const [login] = useLoginByGoogleMutation();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleLoginByGoogle = async (res: any) => {
    const { tokenId } = res;
    try {
      await login(tokenId)
        .unwrap()
        .then(result => {
          const { data } = result;
          const { jwt } = data;
          if (data && jwt) {
            localStorage.setItem('token', 'Bearer '.concat(jwt));
          }
          window.location.reload();
        });
      // console.log('🚀 ~ file: page.tsx:27 ~ handleLoginByGoogle ~ data:', data);
      // if (data && data.user && data.token) {
      //   localStorage.setItem('token', JSON.stringify(data.jwt));
      // }
      // handle successful login
    } catch (err: any) {
      console.log(err.message);
    }
  };

  const onFailure = (res: any) => {
    console.log('Login failed: res:', res);
  };

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
        Nodian
      </Typography>
      <GoogleLogin
        clientId={clientGoogleId}
        onSuccess={handleLoginByGoogle}
        onFailure={onFailure}
        buttonText="Login with Google"
        cookiePolicy="single_host_origin"
      />
    </Box>
  );
}

export default Login;
