'use client';

import { Box, Button, Typography } from '@mui/material';
import { GoogleLogin } from '@react-oauth/google';
import { toast } from 'react-toastify';
import { useLoginByGoogleMutation } from '@/app/redux-toolkit/features/authSlice';

function Login() {
  const [loginByGoogle] = useLoginByGoogleMutation();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any

  const handleLoginByGoogle = async (res: any) => {
    const { credential: tokenId } = res;
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

  const onFailure = () => {
    console.log('Login failed: res:');
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
      <GoogleLogin onSuccess={credentialResponse => handleLoginByGoogle(credentialResponse)} onError={onFailure} />
    </Box>
  );
}

export default Login;
