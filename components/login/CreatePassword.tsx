import axios, { AxiosResponse } from 'axios';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { JsonObject } from '@prisma/client/runtime/library';

interface PasswordPopupProps {
    spotify_user_callback: JsonObject | null;
}

const PasswordPopup: React.FC<PasswordPopupProps> = ({ spotify_user_callback }) => {
    const router = useRouter();
    const [password, setPassword] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(spotify_user_callback){
        const response = await axios.post('/api/app/user',{...spotify_user_callback, ...{password:password}});
        if (response.status === 200 && response.data.created) {
            // Redirect to the desired location
            router.push('/');
        } else {
            // Handle error scenario
            console.error('Error:', response.statusText);
            router.push('/login');
        }
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50 z-10">
      <div className="bg-gray-800 p-6 rounded-md shadow-md">
        <h2 className="text-xl font-semibold mb-4">Create New Password</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Enter new password"
            value={password}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 mb-3 text-black"
          />
          <button
            type="submit"
            className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600 transition duration-300"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasswordPopup;