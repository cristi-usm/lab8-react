import { Link } from 'react-router-dom';
import { getImageUrl } from '../services/api';
import './MovieCard.css';

function MovieCard({ movie, isFavorite, onToggleFavorite }) {
  const imageUrl = getImageUrl(movie.poster_path, 'w342');
  const year = movie.release_date ? movie.release_date.split('-')[0] : 'Necunoscut';
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A';

  return (
    <div className="movie-card">
      <Link to={`/movie/${movie.id}`} className="movie-card-link">
        <div className="movie-poster">
          <img src={imageUrl} alt={movie.title} />
        </div>
        <div className="movie-info">
          <h3 className="movie-title">{movie.title}</h3>
          <div className="movie-meta">
            <span className="movie-year">{year}</span>
            <span className="movie-rating">⭐ {rating}</span>
          </div>
        </div>
      </Link>
      <button
        className={`favorite-button ${isFavorite ? 'active' : ''}`}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onToggleFavorite();
        }}
      >
        {isFavorite ? '❤️' : '🤍'}
      </button>
    </div>
  );
}

export default MovieCard;