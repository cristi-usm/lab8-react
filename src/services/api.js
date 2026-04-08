const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000;

async function fetchFromTMDB(endpoint, params = {}) {
  const url = new URL(`${BASE_URL}${endpoint}`);
  url.searchParams.append('api_key', API_KEY);
  url.searchParams.append('language', 'ro-RO');
  
  Object.keys(params).forEach(key => {
    if (params[key] !== undefined && params[key] !== null && params[key] !== '') {
      url.searchParams.append(key, params[key]);
    }
  });
  
  const cacheKey = url.toString();
  const cached = cache.get(cacheKey);
  
  if (cached && Date.now() < cached.expiry) {
    return cached.data;
  }
  
  const response = await fetch(cacheKey, {
    method: 'GET',
    headers: { 'accept': 'application/json' }
  });
  
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  
  const data = await response.json();
  
  cache.set(cacheKey, {
    data,
    expiry: Date.now() + CACHE_DURATION
  });
  
  return data;
}

const movieAPI = {
  searchMovies: (query, page = 1) => 
    fetchFromTMDB('/search/movie', { query, page }),
  
  getPopularMovies: (page = 1) => 
    fetchFromTMDB('/movie/popular', { page }),
  
  getMovieDetails: (movieId) => 
    fetchFromTMDB(`/movie/${movieId}`, { append_to_response: 'credits,videos' }),
  
  getGenres: () => 
    fetchFromTMDB('/genre/movie/list'),
  
  discoverMovies: (params = {}) => 
    fetchFromTMDB('/discover/movie', { sort_by: 'popularity.desc', ...params })
};

const getImageUrl = (path, size = 'w342') => {
  if (!path) return 'https://via.placeholder.com/342x513?text=No+Image';
  return `${IMAGE_BASE_URL}/${size}${path}`;
};

export { movieAPI, getImageUrl };