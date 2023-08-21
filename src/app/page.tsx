'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { Box, ThemeProvider } from '@mui/material';
import { isEmpty } from 'lodash';
import { ToastContainer } from 'react-toastify';
import Home from './components/home/page';
import store from './redux-toolkit/store';
import MainLayout from './components/mainLayout/page';
import 'react-toastify/dist/ReactToastify.css';
import theme from './theme';

export default function App() {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    setIsLogin(!isEmpty(localStorage.getItem('token')));
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <div className="h-full">{isLogin ? <MainLayout /> : <Home isLoggedIn={isLogin} />}</div>
        <ToastContainer />
      </ThemeProvider>
    </Provider>
  );
}
