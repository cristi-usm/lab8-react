import { useState, useEffect, useCallback, useReducer } from 'react';
import { getCached, setCached } from '../utils/cache';
import { useApp } from '../hooks/useApp';
import SearchBar from '../components/SearchBar';
import PokemonCard from '../components/PokemonCard';
import Pagination from '../components/Pagination';
import LoadingSpinner from '../components/LoadingSpinner';
import styles from './HomePage.module.css';

const PAGE_SIZE = 20;
const BASE = 'https://pokeapi.co/api/v2';

const initialState = {
    pokemons: [],
    total: 0,
    loading: false,
    error: null,
};

function reducer(state, action) {
    switch (action.type) {
        case 'LOADING': return { ...state, loading: true, error: null };
        case 'SUCCESS': return { pokemons: action.pokemons, total: action.total, loading: false, error: null };
        case 'ERROR': return { ...state, loading: false, error: action.payload };
        default: return state;
    }
}

async function fetchWithCache(url) {
    const cached = getCached(url);
    if (cached) return cached;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    setCached(url, data);
    return data;
}

async function getPokemonDetails(nameOrId) {
    return fetchWithCache(`${BASE}/pokemon/${nameOrId}`);
}

export default function HomePage() {
    const { searchState, setSearchState } = useApp();
    const { query, type, page } = searchState;

    const [listState, dispatch] = useReducer(reducer, initialState);
    const [initialLoad, setInitialLoad] = useState(!query && !type);

    const totalPages = Math.ceil(listState.total / PAGE_SIZE);

    const load = useCallback(async ({ query: q, type: t, page: p }) => {
        dispatch({ type: 'LOADING' });

        try {
            let results = [];
            let count = 0;

            if (q) {
                try {
                    const poke = await getPokemonDetails(q.toLowerCase());
                    if (t) {
                        const hasType = poke.types.some(x => x.type.name === t);
                        results = hasType ? [poke] : [];
                    } else {
                        results = [poke];
                    }
                    count = results.length;
                } catch {
                    results = [];
                    count = 0;
                }
            } else if (t) {
                const typeData = await fetchWithCache(`${BASE}/type/${t}`);
                const allNames = typeData.pokemon.map(p => p.pokemon.name);
                count = allNames.length;
                const start = (p - 1) * PAGE_SIZE;
                const slice = allNames.slice(start, start + PAGE_SIZE);
                results = await Promise.all(slice.map(name => getPokemonDetails(name)));
            } else {
                const offset = (p - 1) * PAGE_SIZE;
                const listUrl = `${BASE}/pokemon?limit=${PAGE_SIZE}&offset=${offset}`;
                const listData = await fetchWithCache(listUrl);
                count = listData.count;
                results = await Promise.all(listData.results.map(r => getPokemonDetails(r.name)));
            }

            dispatch({ type: 'SUCCESS', pokemons: results, total: count });
        } catch (err) {
            dispatch({ type: 'ERROR', payload: err.message || 'Failed to load Pokémon.' });
        }
    }, []);

    useEffect(() => {
        if (!initialLoad) {
            load({ query, type, page });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSearch = ({ query: q, type: t }) => {
        const next = { query: q, type: t, page: 1 };
        setSearchState(next);
        setInitialLoad(false);
        load(next);
    };

    const handlePrev = () => {
        const next = { query, type, page: page - 1 };
        setSearchState(next);
        load(next);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleNext = () => {
        const next = { query, type, page: page + 1 };
        setSearchState(next);
        load(next);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const { pokemons, total, loading, error } = listState;

    return (
        <div className={styles.page}>
            <div className={styles.hero}>
                <h1 className={styles.heroTitle}>Pokémon Explorer</h1>
                <p className={styles.heroSub}>Discover, search, and collect your favorites from all generations.</p>
            </div>

            <SearchBar onSearch={handleSearch} initialQuery={query} initialType={type} />

            {initialLoad && (
                <div className={styles.welcome}>
                    <div className={styles.welcomeIcon}>◈</div>
                    <h2 className={styles.welcomeTitle}>Welcome, Trainer!</h2>
                    <p className={styles.welcomeText}>
                        Search for a Pokémon by name, filter by type, or just&nbsp;
                        <button className={styles.exploreBtn} onClick={() => handleSearch({ query: '', type: '' })}>
                            explore all Pokémon →
                        </button>
                    </p>
                </div>
            )}

            {loading && <LoadingSpinner message="Catching Pokémon..." />}

            {error && !loading && (
                <div className={styles.errorBox}>
                    <span className={styles.errorIcon}>✕</span>
                    <div>
                        <strong>No Pokémon found</strong>
                        <p>{error}</p>
                    </div>
                </div>
            )}

            {!loading && !error && !initialLoad && pokemons.length === 0 && (
                <div className={styles.empty}>
                    <p className={styles.emptyIcon}>🔍</p>
                    <p>No Pokémon match your search. Try a different name or type.</p>
                </div>
            )}

            {!loading && pokemons.length > 0 && (
                <>
                    <div className={styles.meta}>
                        <span>{total} Pokémon found</span>
                        {totalPages > 1 && <span>Page {page} of {totalPages}</span>}
                    </div>
                    <div className={styles.grid}>
                        {pokemons.map(p => (
                            <PokemonCard key={p.id} pokemon={p} />
                        ))}
                    </div>
                    {totalPages > 1 && (
                        <Pagination page={page} totalPages={totalPages} onPrev={handlePrev} onNext={handleNext} />
                    )}
                </>
            )}
        </div>
    );
}