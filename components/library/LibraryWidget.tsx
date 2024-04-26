"use client";

import { AiOutlinePlus } from "react-icons/ai"
import Image from "next/image"
import { getUsersPlaylists,getSpotifyAccessToken, getUserDetails } from '@/lib/spotify';
import { useEffect, useState } from "react";
import LoginButton from "../spotify/LoginButton";

export type Playlist = {
	collaborative: boolean,
	description: string,
	external_urls: {
		spotify: string
	},
	href: string,
	id: string,
	images: [
	{
		url: string,
		height: number,
		width: number
	}
	],
	name: string,
	owner: {
		external_urls: {
			spotify: string
		},
		followers: {
			href: string,
			total: number
		},
		href: string,
		id: string,
		type: string,
		uri: string,
		display_name: string
	},
	public: false,
	snapshot_id: string,
	tracks: {
		href: string,
		total: number
	},
	type: string,
	uri: string
}

export default function LibraryWidget() {
    let [userPlaylists, setUserPlaylists] = useState<Playlist[] | null>(null);
    let [isTokenSet,setIsTokenSet] = useState(false);

    useEffect(() => {
        const setPlaylists = async () => {
            let accessToken = await getSpotifyAccessToken();
            if(accessToken){
              setIsTokenSet(true);
              let userDetails = await getUserDetails(accessToken);

              setUserPlaylists( (await getUsersPlaylists(userDetails.id,accessToken)).items);
            }
        }
        setPlaylists();
    },[]);

    const showSongs = () => {
      
    }

    return (
     <section className="flex flex-col">
        {!isTokenSet && <div className="flex flex-col text-center items-center bg-gray-900 border border-gray-900 rounded-t-md p-5 mx-5 mt-5 border-b-2">
			<div className="text-white p-5">Login to Spotify to access your Song Library</div>
			<LoginButton/>
        </div>}
        {isTokenSet && <>
          <div className="flex items-center bg-gray-900 border border-gray-900 rounded-t-md p-5 mx-5 mt-5 border-b-2">
              <div className="text-sm flex-grow">Your Library</div>
              <div className="bg-black p-2 border border-gray-950 rounded-full hover:bg-gray-800 hover:cursor-pointer"><AiOutlinePlus/></div>
          </div>
          <div className="bg-gray-900 border mx-5 border-gray-900 rounded-b-md ">
              {
                  userPlaylists && userPlaylists.map((playlist : Playlist,i) => {
                      return(
                          <div key={i} onClick={showSongs} className="flex items-center p-5 hover:bg-gray-700 hover:cursor-pointer">
                              <div className="w-10">
                                  <Image src={playlist.images[0].url} alt="Album Cover" width={playlist.images[0].width} height={playlist.images[0].height}/>
                              </div>
                              <div className="flex flex-col mx-5 maker">
                                  <div className="text-lg">{playlist.name}</div>
                                  <div className="text-sm text-gray-500">{playlist.owner.display_name}</div>
                              </div>
                          </div>
                      )
                  })
                  
              }
          </div>
        </>}
        </section>
    )
} 