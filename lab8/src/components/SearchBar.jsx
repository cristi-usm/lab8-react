import { useState } from 'react';
import { POKEMON_TYPES } from '../utils/typeColors';
import styles from './SearchBar.module.css';

export default function SearchBar({ onSearch, initialQuery = '', initialType = '' }) {
    const [query, setQuery] = useState(initialQuery);
    const [type, setType] = useState(initialType);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch({ query: query.trim(), type });
    };

    const handleTypeChange = (e) => {
        setType(e.target.value);
        onSearch({ query: query.trim(), type: e.target.value });
    };

    return (
        <form className={styles.bar} onSubmit={handleSubmit}>
            <div className={styles.searchWrap}>
                <span className={styles.icon}>⌕</span>
                <input
                    className={styles.input}
                    type="text"
                    placeholder="Search Pokémon..."
                    value={query}
                    onChange={e => setQuery(e.target.value)}
                />
                <button className={styles.searchBtn} type="submit">Search</button>
            </div>
            <select className={styles.select} value={type} onChange={handleTypeChange}>
                <option value="">All Types</option>
                {POKEMON_TYPES.map(t => (
                    <option key={t} value={t}>{t.charAt(0).toUpperCase() + t.slice(1)}</option>
                ))}
            </select>
        </form>
    );
}
