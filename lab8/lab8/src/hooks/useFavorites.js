import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "favorites";

export default function useFavorites() {
  const [favorites, setFavorites] = useState(() => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const favoriteIds = useMemo(() => {
    return new Set(favorites.map((f) => f.id));
  }, [favorites]);

  const isFavorite = (id) => {
    return favoriteIds.has(id);
  };

  const toggleFavorite = (item) => {
    setFavorites((prev) => {
      if (prev.find((f) => f.id === item.id)) {
        return prev.filter((f) => f.id !== item.id);
      }
      return [...prev, item];
    });
  };

  return { favorites, isFavorite, toggleFavorite };
}