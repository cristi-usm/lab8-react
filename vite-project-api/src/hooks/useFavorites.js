import { useState, useEffect } from "react";

const STORAGE_KEY = "favorites";

export default function useFavorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  const save = (items) => {
    setFavorites(items);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  };

  const addFavorite = (item) => {
    if (!favorites.find(f => f.id === item.id)) {
      save([...favorites, item]);
    }
  };

  const removeFavorite = (id) => {
    save(favorites.filter(f => f.id !== id));
  };

  const isFavorite = (id) => favorites.some(f => f.id === id);

  return { favorites, addFavorite, removeFavorite, isFavorite };
}