const API_KEY = 'f3e6ffebe13a6082e65b15128d0d19f4';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

export const getImageUrl = (path: string | null, size: string = 'w500') => 
  path ? `${IMAGE_BASE_URL}/${size}${path}` : 'https://via.placeholder.com/500x750?text=No+Image';

async function handleResponse(response: Response) {
  if (!response.ok) {
    const text = await response.text();
    console.error('API Error Response:', text);
    throw new Error(`API Error: ${response.status}`);
  }
  const data = await response.json();
  return data;
}

export const fetchTrending = async (mediaType: 'movie' | 'tv') => {
  try {
    const response = await fetch(
      `${BASE_URL}/trending/${mediaType}/week?api_key=${API_KEY}&language=en-US&with_original_language=en`
    );
    const data = await handleResponse(response);
    return data.results;
  } catch (error) {
    console.error('Error fetching trending:', error);
    throw error;
  }
};

export const fetchNowPlaying = async (mediaType: 'movie' | 'tv') => {
  const endpoint = mediaType === 'movie' ? 'now_playing' : 'on_the_air';
  try {
    const response = await fetch(
      `${BASE_URL}/${mediaType}/${endpoint}?api_key=${API_KEY}&language=en-US&with_original_language=en&region=US`
    );
    const data = await handleResponse(response);


    return data.results;
  } catch (error) {
    console.error('Error fetching now playing:', error);
    throw error;
  }
};

export const fetchDetails = async (mediaType: 'movie' | 'tv', id: string) => {
  try {
    const response = await fetch(
      `${BASE_URL}/${mediaType}/${id}?api_key=${API_KEY}&append_to_response=videos,credits&language=en-US`
    );
    const data = await handleResponse(response);
    return data;
  } catch (error) {
    console.error('Error fetching details:', error);
    throw error;
  }
};

export const searchMedia = async (query: string) => {
  try {
    const response = await fetch(
      `${BASE_URL}/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=en-US`
    );
    const data = await handleResponse(response);
    return data.results.filter((item: any) => 
      (item.media_type === 'movie' || item.media_type === 'tv') &&
      item.original_language === 'en'
    );
  } catch (error) {
    console.error('Error searching media:', error);
    throw error;
  }
};
