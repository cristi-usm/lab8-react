import { useApp } from '../hooks/useApp';
import PokemonCard from '../components/PokemonCard';
import styles from './FavoritesPage.module.css';

export default function FavoritesPage() {
    const { favorites } = useApp();

    return (
        <div className={styles.page}>
            <div className={styles.header}>
                <h1 className={styles.title}>Your Favorites</h1>
                <span className={styles.count}>{favorites.length} saved</span>
            </div>

            {favorites.length === 0 ? (
                <div className={styles.empty}>
                    <p className={styles.emptyIcon}>☆</p>
                    <h2 className={styles.emptyTitle}>No favorites yet</h2>
                    <p className={styles.emptyText}>
                        Browse Pokémon and click the star icon to save them here.
                    </p>
                </div>
            ) : (
                <div className={styles.grid}>
                    {favorites.map(p => (
                        <PokemonCard key={p.id} pokemon={p} />
                    ))}
                </div>
            )}
        </div>
    );
}
