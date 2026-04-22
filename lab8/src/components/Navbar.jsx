import { useApp } from '../hooks/useApp';
import styles from './Navbar.module.css';

export default function Navbar() {
    const { view, setView, favorites } = useApp();

    return (
        <nav className={styles.nav}>
            <div className={styles.brand} onClick={() => setView('home')}>
                <span className={styles.logo}>◈</span>
                <span className={styles.title}>PokéDex</span>
            </div>
            <div className={styles.links}>
                <button
                    className={`${styles.link} ${view === 'home' || view === 'detail' ? styles.active : ''}`}
                    onClick={() => setView('home')}
                >
                    Explore
                </button>
                <button
                    className={`${styles.link} ${view === 'favorites' ? styles.active : ''}`}
                    onClick={() => setView('favorites')}
                >
                    Favorites
                    {favorites.length > 0 && (
                        <span className={styles.badge}>{favorites.length}</span>
                    )}
                </button>
            </div>
        </nav>
    );
}
