// src/app/layout.tsx
'use client';

import { Inter } from 'next/font/google';
import { Provider } from 'react-redux';
import { store } from '@/store';
import Header from '@/components/Header';
import './globals.css';
import { metadata } from './layout.metadata';

const inter = Inter({ subsets: ['latin'] });

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body className={inter.className}>
        <Provider store={store}>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <footer className="bg-gray-100 py-6">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <p className="text-center text-gray-600">
                  © {new Date().getFullYear()} AI Tools Directory. All rights reserved.
                </p>
              </div>
            </footer>
          </div>
        </Provider>
      </body>
    </html>
  );
}