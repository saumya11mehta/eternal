'use client';

import SpotifyLogo from "@/image/logo/SpotifyLogo";
import Logo from "@/image/logo/Logo";
import Text from "@/image/logo/Text";
import { useState } from "react";

export default function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    try {
      const response = await fetch('YOUR_SIGNUP_API_ENDPOINT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (response.ok) {
        // Handle successful sign-up
        console.log('User signed up successfully!');
      } else {
        // Handle sign-up failure
        console.error('Sign-up failed');
      }
    } catch (error) {
      console.error('Error occurred during sign-up:', error);
    }
  };

  return (
    <main className="flex flex-wrap min-h-screen flex-col items-center p-10">
        <div className="flex items-center justify-center">
          <Logo className="w-1/4 p-3"/>
          <Text className="w-1/2"/>
        </div>
        <div className="flex flex-col items-center w-2/4 basis-full shrink-0 flex-grow bg-gray-900 border rounded-lg border-gray-900">
          <div className="text-3xl font-bold p-10">Sign up for Eternal</div>
          <div className="w-2/4 p-10">
            <div>
            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Username"
              required
            />
            </div>
            <br/>
            <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Email
            </label>
            <input
              type="text"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Email"
              required
            />
            </div>
            <br/>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Password"
                required
              />
            </div>
            <br/>
            <div className="flex items-center justify-center">
              <button type="button" className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 w-full"><div className="flex items-center justify-center"><Logo width="35" height="35"/> <span className="pl-1">Sign Up</span> </div></button>
              
            </div>
            <br/>
            <div className="flex items-center justify-center">
              <button type="button" className="text-white bg-green-400 hover:bg-green-500 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-900 w-full"><div className="flex items-center justify-center"><SpotifyLogo width="35" height="35"/> <span className="pl-1">Sign Up</span> </div></button>
              
            </div>
          </div>
        </div>
    </main>
  )
}
