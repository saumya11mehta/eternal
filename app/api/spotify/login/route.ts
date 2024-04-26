import { NextResponse } from 'next/server';

export async function GET(request: Request){
    const spotifyClientId = process.env.SPOTIFY_CLIENT_ID;
    const spotifyRedirectUri = process.env.SPOTIFY_REDIRECT_URI;
  
    const spotifyLoginUrl = `https://accounts.spotify.com/authorize?client_id=${spotifyClientId}&redirect_uri=${spotifyRedirectUri}&response_type=code&scope=user-read-private%20user-read-email`;

    return NextResponse.json({ url: spotifyLoginUrl });
}