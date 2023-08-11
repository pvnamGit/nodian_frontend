'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { Box } from '@mui/material';
import { isEmpty } from 'lodash';
import Login from './components/login/page';
import Home from './components/home/page';
import store from './redux-toolkit/store';
import MainLayout from './components/mainLayout/page';

export default function App() {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    setIsLogin(!isEmpty(localStorage.getItem('token')));
  }, []);

  return (
    <Provider store={store}>
      <div className="h-full">{isLogin ? <MainLayout /> : <Home isLoggedIn={isLogin} />}</div>
    </Provider>
  );
}
