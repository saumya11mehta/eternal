"use client";

import React, { useEffect,useState } from 'react';
import { useSearchParams  } from 'next/navigation';
import PasswordPopup from '@/components/login/CreatePassword';
import { useRouter } from 'next/navigation';
import Loading from '@/components/general/Loading';
import { generateAuthToken, getUserDetails } from '@/lib/spotify';
import { JsonObject } from '@prisma/client/runtime/library';
import { checkUserExists } from '@/lib/user';

const SpotifyCallback = () => { 
    const router = useRouter();
    const searchParams = useSearchParams();
    const [showPopup, setShowPopup] = useState(false);
    const [spotifyCallback, setSpotifyCallback] = useState<JsonObject | null>(null);

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    useEffect(() => {
        const authorizeUser = async () => {
          const code = searchParams.get('code') // Extract the code from the URL

          if (code) {
            try {
                const spotify_get_token = await generateAuthToken(code,'authorization_code');

                const spotify_user_details = await getUserDetails(spotify_get_token.access_token);

                
                if(spotify_user_details != null){
                    setSpotifyCallback(spotify_user_details)
                    const user_check = await checkUserExists(spotify_user_details);
                    if(!user_check.exists){
                        togglePopup();
                    }else{
                        router.push("/");
                    }
                }
            } catch (error) {
                console.error('Error sending code to backend:', error);
            }
          }
        };
        authorizeUser();
      }, []);

      return (
        <>
            {
                showPopup && <div className="flex w-full h-screen bg-black items-center justify-center">
                    <PasswordPopup spotify_user_callback={spotifyCallback} />
                </div>
            }
            {
                !showPopup && <Loading/>
            }
        </>
      )
}

export default SpotifyCallback;