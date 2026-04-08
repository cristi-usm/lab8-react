import { Link } from 'react-router-dom';
import useFavorites from '../hooks/useFavorites';
import MovieCard from '../components/MovieCard';
import './Favorites.css';

function Favorites() {
  const { favorites, removeFavorite, isFavorite } = useFavorites();

  if (favorites.length === 0) {
    return (
      <div className="favorites-empty">
        <h2>No favorites yet</h2>
        <p>Start adding movies to your favorites!</p>
        <Link to="/" className="browse-link">Browse Movies</Link>
      </div>
    );
  }

  return (
    <div className="favorites">
      <h2>My Favorites ({favorites.length})</h2>
      <div className="movies-grid">
        {favorites.map(movie => (
          <MovieCard
            key={movie.id}
            movie={movie}
            isFavorite={isFavorite(movie.id)}
            onToggleFavorite={() => removeFavorite(movie.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default Favorites;