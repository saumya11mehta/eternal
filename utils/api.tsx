import axios from 'axios';

export const getSpotifyLoginUrl = async (): Promise<string> => {
  try {
    const response = await axios.get('/api/spotify/login');
    return response.data.url;
  } catch (error) {
    throw new Error('Failed to get Spotify login URL');
  }
};