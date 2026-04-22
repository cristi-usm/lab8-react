import { useApp } from '../hooks/useApp';
import { getTypeColor } from '../utils/typeColors';
import styles from './PokemonCard.module.css';

export default function PokemonCard({ pokemon }) {
    const { openDetail, isFavorite, toggleFavorite } = useApp();

    const mainType = pokemon.types?.[0]?.type?.name || 'normal';
    const { bg, light } = getTypeColor(mainType);
    const isFav = isFavorite(pokemon.id);

    const img =
        pokemon.sprites?.other?.['official-artwork']?.front_default ||
        pokemon.sprites?.front_default ||
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;

    return (
        <div
            className={styles.card}
            style={{ '--type-color': bg, '--type-light': light }}
            onClick={() => openDetail(pokemon.name)}
        >
            <div className={styles.typeBg} />
            <button
                className={`${styles.favBtn} ${isFav ? styles.favActive : ''}`}
                onClick={e => { e.stopPropagation(); toggleFavorite(pokemon); }}
                title={isFav ? 'Remove from favorites' : 'Add to favorites'}
            >
                {isFav ? '★' : '☆'}
            </button>
            <div className={styles.number}>#{String(pokemon.id).padStart(3, '0')}</div>
            <div className={styles.imgWrap}>
                <img src={img} alt={pokemon.name} className={styles.img} loading="lazy" />
            </div>
            <div className={styles.info}>
                <h3 className={styles.name}>{pokemon.name}</h3>
                <div className={styles.types}>
                    {pokemon.types?.map(t => (
                        <span
                            key={t.type.name}
                            className={styles.typeChip}
                            style={{ background: getTypeColor(t.type.name).bg }}
                        >
                            {t.type.name}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
