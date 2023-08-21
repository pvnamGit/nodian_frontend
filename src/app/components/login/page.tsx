'use client';

import { Box, Button, Typography } from '@mui/material';
import { GoogleLogin, useGoogleLogin } from 'react-google-login';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useLoginByGoogleMutation } from '@/app/redux-toolkit/features/authSlice';

const GOOGLE_CLIENT_ID: string = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string;

const GAPI_CONFIG = {
  clientId: GOOGLE_CLIENT_ID,
  scope: 'email',
};

function Login() {
  useEffect(() => {
    const start = async () => {
      const gapi = (await import('gapi-script')).default;
      if (gapi) {
        gapi.client.init(GAPI_CONFIG);
        gapi.load('client:auth2', start);
      }
    };
    start();
  }, []);

  const [loginByGoogle] = useLoginByGoogleMutation();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleLoginByGoogle = async (res: any) => {
    const { tokenId } = res;
    try {
      await loginByGoogle(tokenId)
        .unwrap()
        .then(result => {
          const { data } = result;
          const { jwt } = data;
          if (data && jwt) {
            localStorage.setItem('token', 'Bearer '.concat(jwt));
            toast.success('Login Successfully', {
              position: toast.POSITION.BOTTOM_RIGHT,
            });
          }
          setTimeout(() => window.location.reload(), 500);
        });
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
        clientId={GOOGLE_CLIENT_ID}
        onSuccess={handleLoginByGoogle}
        onFailure={onFailure}
        buttonText="Login with Google"
        cookiePolicy="single_host_origin"
      />
    </Box>
  );
}

export default Login;
