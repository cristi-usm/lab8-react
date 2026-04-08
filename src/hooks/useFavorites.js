import { useState, useEffect } from 'react';

function useFavorites() {
  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('movie-favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('movie-favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (movie) => {
    setFavorites(prev => {
      if (prev.some(f => f.id === movie.id)) return prev;
      return [...prev, movie];
    });
  };

  const removeFavorite = (movieId) => {
    setFavorites(prev => prev.filter(m => m.id !== movieId));
  };

  const isFavorite = (movieId) => {
    return favorites.some(m => m.id === movieId);
  };

  return { favorites, addFavorite, removeFavorite, isFavorite };
}

export default useFavorites;