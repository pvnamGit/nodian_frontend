'use client';

import { GoogleOAuthProvider } from '@react-oauth/google';
import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { Box, ThemeProvider } from '@mui/material';
import { isEmpty } from 'lodash';
import { ToastContainer } from 'react-toastify';
import { RecoilRoot } from 'recoil';
import { BrowserRouter, Link, redirect, Route, Routes } from 'react-router-dom';
import { ApiProvider } from '@reduxjs/toolkit/dist/query/react';
import Home from './components/home/Home';
import store from './redux-toolkit/store';
import MainLayout from './components/mainLayout/MainLayout';
import 'react-toastify/dist/ReactToastify.css';
import theme from './theme';
import { useGetCurrentUserInfoQuery } from './redux-toolkit/features/userSlices';

const GOOGLE_CLIENT_ID: string = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID as string;

export default function App() {
  const [render, setRender] = useState(false);
  useEffect(() => setRender(true), []);

  if (typeof window === 'undefined') return null;
  return render ? (
    <BrowserRouter>
      <Provider store={store}>
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
          <RecoilRoot>
            <ThemeProvider theme={theme}>
              {/* <div className="h-full">{isLogin ? <MainLayout /> : <Home isLoggedIn={isLogin} />}</div> */}
              <Routes>
                <Route index element={<Home />} />
                <Route path="/d" element={<MainLayout />} />
              </Routes>
              <ToastContainer />
            </ThemeProvider>
          </RecoilRoot>
        </GoogleOAuthProvider>
      </Provider>
    </BrowserRouter>
  ) : null;
}
