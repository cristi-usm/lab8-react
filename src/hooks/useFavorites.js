import { useCallback, useState } from 'react';

const STORAGE_KEY = 'shaker-favorites';

function readFavorites() {
  try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
  catch { return []; }
}

export function useFavorites() {
  const [favorites, setFavorites] = useState(readFavorites);

  const update = useCallback((next) => {
    setFavorites(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  }, []);

  const toggleFavorite = useCallback((drink) => {
    setFavorites((current) => {
      const next = current.some((item) => item.idDrink === drink.idDrink)
        ? current.filter((item) => item.idDrink !== drink.idDrink)
        : [...current, drink];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const isFavorite = useCallback((id) => favorites.some((item) => item.idDrink === id), [favorites]);
  return { favorites, toggleFavorite, isFavorite, clearFavorites: () => update([]) };
}
