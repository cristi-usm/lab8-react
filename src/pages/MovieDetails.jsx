import { useParams, useNavigate } from 'react-router-dom';
import { getImageUrl } from '../services/api';
import useFetch from '../hooks/useFetch';
import useFavorites from '../hooks/useFavorites';
import './MovieDetails.css';


function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=ro-RO&append_to_response=credits,videos`;
  
  const { data: movie, loading, error } = useFetch(url);

  if (loading) return <div className="loading">Loading...</div>;
  
  if (error) return (
    <div className="error">
      <p>Error: {error}</p>
      <button onClick={() => navigate(-1)}>Back</button>
    </div>
  );
  
  if (!movie) return null;

  const backdropUrl = getImageUrl(movie.backdrop_path, 'original');
  const posterUrl = getImageUrl(movie.poster_path, 'w500');
  const year = movie.release_date ? movie.release_date.split('-')[0] : 'N/A';

  return (
    <div className="movie-details">
      <button onClick={() => navigate(-1)} className="back-btn">← Back</button>
      
      <div className="movie-header" style={{ backgroundImage: `url(${backdropUrl})` }}>
        <div className="movie-header-content">
          <img src={posterUrl} alt={movie.title} className="detail-poster" />
          <div className="movie-header-info">
            <h1 style={{ color: 'white' }}>{movie.title} ({year})</h1>
            <div className="movie-stats">
              <span>⭐ {movie.vote_average?.toFixed(1)}</span>
              <span>⏱️ {movie.runtime} min</span>
            </div>
            <button
              className={`favorite-btn ${isFavorite(movie.id) ? 'active' : ''}`}
              onClick={() => {
                isFavorite(movie.id) ? removeFavorite(movie.id) : addFavorite(movie);
              }}
            >
              {isFavorite(movie.id) ? '❤️ Remove' : '🤍 Add to Favorites'}
            </button>
          </div>
        </div>
      </div>
      
      <div className="movie-content">
        <div className="movie-genres">
          {movie.genres?.map(g => <span key={g.id} className="genre">{g.name}</span>)}
        </div>
        
        <div className="movie-overview">
          <h2>Overview</h2>
          <p>{movie.overview || 'No description available.'}</p>
        </div>
        
        {movie.credits?.cast && (
          <div className="movie-cast">
            <h2>Cast</h2>
            <div className="cast-list">
              {movie.credits.cast.slice(0, 10).map(actor => (
                <div key={actor.id} className="cast-item">
                  <img src={getImageUrl(actor.profile_path, 'w185')} alt={actor.name} />
                  <p className="actor-name">{actor.name}</p>
                  <p className="character">{actor.character}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MovieDetails;