"use client";

import { AiOutlinePlus } from "react-icons/ai"
import Image from "next/image"
import { getUsersPlaylists,getSpotifyAccessToken, getUserDetails, getPlaylistItems } from '@/lib/spotify';
import { useEffect, useState } from "react";
import LoginButton from "@/components/spotify/LoginButton";
import Carousel from "@/components/general/Carousel";
import { RiArrowDropLeftLine } from "react-icons/ri";

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

export type Song = {
    "added_at": string,
    "added_by": {
        "external_urls": {
        "spotify": string
        },
        "followers": {
        "href": string,
        "total": number
        },
        "href": string,
        "id": string,
        "type": string,
        "uri": string
    },
    "is_local": boolean,
    "track": {
        "album": {
            "album_type": string,
            "total_tracks": number,
            "available_markets": string[],
            "external_urls": {
                "spotify": string
            },
            "href": string,
            "id": string,
            "images": [
                {
                    "url": string,
                    "height": number,
                    "width": number
                }
            ],
            "name": string,
            "release_date": string,
            "release_date_precision": string,
            "restrictions": {
                "reason": string
            },
            "type": string,
            "uri": string,
            "artists": [
                {
                    "external_urls": {
                        "spotify": string
                    },
                    "href": string,
                    "id": string,
                    "name": string,
                    "type": string,
                    "uri": string
                }
            ]
        },
        "artists": [
            {
                "external_urls": {
                    "spotify": string
                },
                "followers": {
                    "href": string,
                    "total": 0
                },
                "genres": string[],
                "href": string,
                "id": string,
                "images": [
                    {
                        "url": string,
                        "height": number,
                        "width": number
                    }
                ],
                "name": string,
                "popularity": number,
                "type": string,
                "uri": string
            }
        ],
        "available_markets": string[],
        "disc_number": number,
        "duration_ms": number,
        "explicit": boolean,
        "external_ids": {
            "isrc": string,
            "ean": string,
            "upc": string
        },
        "external_urls": {
            "spotify": string
        },
        "href": string,
        "id": string,
        "is_playable": boolean,
        "linked_from": {
        },
        "restrictions": {
            "reason": string
        },
        "name": string,
        "popularity": number,
        "preview_url": string,
        "track_number": number,
        "type": string,
        "uri": string,
        "is_local": false
    }
}

export type PlalistSongs = {
    "href": string,
    "limit": number,
    "next": string,
    "offset": number,
    "previous": string,
    "total": number,
    "items": Song[]
}

export default function LibraryWidget() {
    let [userPlaylists, setUserPlaylists] = useState<Playlist[] | null>(null);
    let [playlistSongs , setPlaylistSongs] = useState<PlalistSongs | null>(null);
    let [isTokenSet,setIsTokenSet] = useState(false);
    const defaultTitle = "Your Library";
    let [title,setTitle] = useState(defaultTitle);
    let [currentIndex,setCurrentIndex] = useState(0);
    
    const updateCurrentIndex = (index: number) => {
        setCurrentIndex(index); // Callback function to update currentIndex
    };

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

    const showSongs = async (playlistId:string,playlistName:string) => {
        let accessToken = await getSpotifyAccessToken();
        if(accessToken){
            setPlaylistSongs((await getPlaylistItems(playlistId,accessToken)));
            setTitle(playlistName);
        }
    }
    
    const backToLibrary = () => {
        setTitle(defaultTitle);
        setPlaylistSongs(null);
        setCurrentIndex(0)
    }

    return (
     <section className="flex flex-col">
        {!isTokenSet && <div className="flex flex-col text-center items-center bg-gray-900 border border-gray-900 rounded-t-md p-5 mx-5 mt-5 border-b-2">
			<div className="text-white p-5">Login to Spotify to access your Song Library</div>
			<LoginButton/>
        </div>}
        {isTokenSet && <>
            <div className="flex items-center bg-gray-900 border border-gray-900 rounded-t-md p-5 mx-5 mt-5 border-b-2">
                {playlistSongs && <div className="bg-black p-2 border border-gray-950 rounded-full hover:bg-gray-800 hover:cursor-pointer mr-2" onClick={()=> {backToLibrary()}}><RiArrowDropLeftLine/></div>}
                <div className="text-sm flex-grow">{title}</div>
            </div>
            <div className="bg-gray-900 border mx-5 border-gray-900 rounded-b-md ">
                {
                        (!playlistSongs && userPlaylists) && userPlaylists.map((playlist : Playlist,i) => {
                            return(
                                <div key={i} onClick={() => showSongs(playlist.id,playlist.name)} className="flex items-center p-5 hover:bg-gray-700 hover:cursor-pointer">
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
                <Carousel visibleItems={5} currentIndex={currentIndex} updateCurrentIndex={updateCurrentIndex}>
                {
                    playlistSongs && playlistSongs.items.map((song:Song,i)=> {
                        return (
                            <div key={i} className="flex items-center p-5 hover:bg-gray-700 hover:cursor-pointer">
                                <div className="w-10">
                                    <Image src={song.track.album.images[0].url} alt="Album Cover" width={song.track.album.images[0].width} height={song.track.album.images[0].height}/>
                                </div>
                                <div className="flex flex-col mx-5 maker">
                                    <div className="text-lg">{song.track.name}</div>
                                    <div className="text-sm text-gray-500">{song.track.artists.map((artist,i)=> {
                                            let name = artist.name;
                                            if ( i !== song.track.artists.length -1){
                                                name += ", ";
                                            }
                                            return name;
                                        })}
                                    </div>
                                </div>
                            </div>
                        );
                    })
                }
                </Carousel>
            </div>
        </>}
        </section>
    )
} 