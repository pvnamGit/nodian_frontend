'use client'
import { Box, Button, Typography } from "@mui/material";

const Login = () => {

 

  const handleLoginByGoogle = (event: any) => {

    console.log(event)
  }

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      width: '80%',
      height: '50%',
      margin: 'auto',
      alignItems: 'center'
    }}>
      <Typography variant="h2" sx={{
        marginBottom: 4,
      }}>Nodian</Typography>
      <Button variant="outlined" color="primary" onClick={handleLoginByGoogle}>Login by Google</Button>
    </Box>
  )
};

export default Login;
