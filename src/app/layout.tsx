import React from 'react';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import 'dotenv/config';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Nodian',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        style={{
          height: '100vh',
        }}
      >
        {children}
      </body>
    </html>
  );
}
