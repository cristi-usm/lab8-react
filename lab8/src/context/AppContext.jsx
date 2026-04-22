import { createContext, useState } from 'react';
import { useFavorites } from '../hooks/useFavorites';

// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext(null);

export function AppProvider({ children }) {
    const favorites = useFavorites();
    const [view, setView] = useState('home');
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [searchState, setSearchState] = useState({ query: '', type: '', page: 1 });

    const openDetail = (name) => {
        setSelectedPokemon(name);
        setView('detail');
    };

    const goBack = () => {
        setSelectedPokemon(null);
        setView('home');
    };

    return (
        <AppContext.Provider value={{
            ...favorites,
            view, setView,
            selectedPokemon,
            openDetail, goBack,
            searchState, setSearchState,
        }}>
            {children}
        </AppContext.Provider>
    );
}