import { useState, useCallback } from 'react';

const STORAGE_KEY = 'pokedex_favorites';

function loadFavorites() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
}

function saveFavorites(favs) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favs));
}

export function useFavorites() {
    const [favorites, setFavorites] = useState(loadFavorites);

    const addFavorite = useCallback((pokemon) => {
        setFavorites(prev => {
            if (prev.find(f => f.id === pokemon.id)) return prev;
            const next = [...prev, pokemon];
            saveFavorites(next);
            return next;
        });
    }, []);

    const removeFavorite = useCallback((id) => {
        setFavorites(prev => {
            const next = prev.filter(f => f.id !== id);
            saveFavorites(next);
            return next;
        });
    }, []);

    const isFavorite = useCallback((id) => {
        return favorites.some(f => f.id === id);
    }, [favorites]);

    const toggleFavorite = useCallback((pokemon) => {
        if (isFavorite(pokemon.id)) {
            removeFavorite(pokemon.id);
        } else {
            addFavorite(pokemon);
        }
    }, [isFavorite, addFavorite, removeFavorite]);

    return { favorites, addFavorite, removeFavorite, isFavorite, toggleFavorite };
}
