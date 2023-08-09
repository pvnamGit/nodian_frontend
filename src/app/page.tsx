'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import Login from './components/login/page';
import Home from './components/home/page';
import store from './redux-toolkit/store';

export default function App() {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    setIsLogin(localStorage.getItem('token') !== null);
  });

  return (
    <Provider store={store}>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
          {isLogin ? <Home /> : <Login />}
        </div>
      </main>
    </Provider>
  );
}
