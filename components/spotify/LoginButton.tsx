// components/LoginButton.tsx
'use client';

import React from 'react';
import { getSpotifyLoginUrl } from '@/utils/api';
import SpotifyLogo from "@/image/logo/SpotifyLogo";

const LoginButton: React.FC = () => {
  const handleLogin = async (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement, MouseEvent>) => {
    e.preventDefault(); // Prevent the default anchor tag behavior
    try {
      const loginUrl = await getSpotifyLoginUrl();
      window.location.href = loginUrl;
    } catch (error) {
      console.error('Failed to get Spotify login URL:', error);
    }
  };

  return (
    <button
      onClick={handleLogin}
      className="text-white bg-green-400 hover:bg-green-500 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-900 w-full">
        <div className="flex items-center justify-center group">
            <SpotifyLogo className="group-hover:rotate-45" width="35" height="35"/> 
            <span className="pl-1 font-bold">Login</span> 
        </div>
    </button>
  );
};

export default LoginButton;