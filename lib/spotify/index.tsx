import axios from "axios";
import { getCookie, setCookie } from "cookies-next";

const baseUrl = process.env.BASE_SPOTIFY_URL

export const getSpotifyAccessToken = async () => {
    return await getCookie("spotify_access_token") as string;
}

const getAuthHeaders = () => {
    const client = process.env.SPOTIFY_CLIENT_ID + ":" + process.env.SPOTIFY_CLIENT_SECRET;
    return {
        'content-type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + Buffer.from(client).toString('base64')
    }
}

export const generateAuthToken = async (code:string,grantType:string,) => {
    if(code){
        let  result = await axios.post("https://accounts.spotify.com/api/token",{
            code: code,
            redirect_uri: process.env.SPOTIFY_REDIRECT_URI,
            grant_type: grantType
        },{ headers: getAuthHeaders() });

        setCookie("spotify_access_token",result.data.access_token,{ maxAge: result.data.expires_in} );
        setCookie("spotify_refresh_token",result.data.refresh_token,{ maxAge: result.data.expires_in} );

        return result.data;
    }
}

export const getUserDetails = async (access_token: string) => {
    let result = await axios.get(baseUrl+"/me",
        { headers: {'Authorization' : "Bearer "+access_token } 
    })

    return result.data;
}

export const getUsersPlaylists = async (userId: string,access_token: string) => {
    let result = await axios.get(baseUrl+`/users/${userId}/playlists`,
        { headers: {'Authorization' : "Bearer "+access_token } 
    })

    return result.data;
}

export const getPlaylistItems= async (playlistId: string,access_token: string) => {
    let result = await axios.get(baseUrl+`/playlists/${playlistId}/tracks`,
        { headers: {'Authorization' : "Bearer "+access_token } 
    })

    return result.data;
}

