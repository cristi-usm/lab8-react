import { useApp } from '../hooks/useApp';
import { useFetch } from '../hooks/useFetch';
import { getTypeColor, statColor } from '../utils/typeColors';
import LoadingSpinner from '../components/LoadingSpinner';
import styles from './DetailPage.module.css';

const BASE = 'https://pokeapi.co/api/v2';

export default function DetailPage() {
    const { selectedPokemon, goBack, isFavorite, toggleFavorite } = useApp();
    const { data: poke, loading, error } = useFetch(
        selectedPokemon ? `${BASE}/pokemon/${selectedPokemon}` : null
    );
    const { data: species } = useFetch(
        poke ? `${BASE}/pokemon-species/${poke.id}` : null
    );

    const mainType = poke?.types?.[0]?.type?.name || 'normal';
    const { bg } = getTypeColor(mainType);
    const isFav = poke ? isFavorite(poke.id) : false;

    const description = species?.flavor_text_entries
        ?.find(e => e.language.name === 'en')
        ?.flavor_text?.replace(/\f/g, ' ') || '';

    const genera = species?.genera?.find(g => g.language.name === 'en')?.genus || '';

    const img =
        poke?.sprites?.other?.['official-artwork']?.front_default ||
        poke?.sprites?.front_default;

    if (loading) return <LoadingSpinner message="Loading Pokémon data..." />;

    if (error) return (
        <div className={styles.page}>
            <button className={styles.backBtn} onClick={goBack}>← Back</button>
            <div className={styles.error}>Failed to load Pokémon: {error}</div>
        </div>
    );

    if (!poke) return null;

    const maxStat = 255;

    return (
        <div className={styles.page}>
            <button className={styles.backBtn} onClick={goBack}>← Back to results</button>

            <div className={styles.card} style={{ '--type-color': bg }}>
                <div className={styles.glow} />

                <div className={styles.header}>
                    <div className={styles.imgSection}>
                        <div className={styles.imgBg} style={{ background: bg }} />
                        <img src={img} alt={poke.name} className={styles.img} />
                    </div>

                    <div className={styles.basicInfo}>
                        <div className={styles.numRow}>
                            <span className={styles.number}>#{String(poke.id).padStart(3, '0')}</span>
                            <button
                                className={`${styles.favBtn} ${isFav ? styles.favActive : ''}`}
                                onClick={() => toggleFavorite(poke)}
                            >
                                {isFav ? '★ Saved' : '☆ Save'}
                            </button>
                        </div>
                        <h1 className={styles.name}>{poke.name}</h1>
                        {genera && <p className={styles.genera}>{genera}</p>}

                        <div className={styles.types}>
                            {poke.types.map(t => (
                                <span
                                    key={t.type.name}
                                    className={styles.typeChip}
                                    style={{ background: getTypeColor(t.type.name).bg }}
                                >
                                    {t.type.name}
                                </span>
                            ))}
                        </div>

                        {description && (
                            <p className={styles.desc}>{description}</p>
                        )}

                        <div className={styles.physRow}>
                            <div className={styles.physItem}>
                                <span className={styles.physLabel}>Height</span>
                                <span className={styles.physVal}>{(poke.height / 10).toFixed(1)} m</span>
                            </div>
                            <div className={styles.physDivider} />
                            <div className={styles.physItem}>
                                <span className={styles.physLabel}>Weight</span>
                                <span className={styles.physVal}>{(poke.weight / 10).toFixed(1)} kg</span>
                            </div>
                            <div className={styles.physDivider} />
                            <div className={styles.physItem}>
                                <span className={styles.physLabel}>Base XP</span>
                                <span className={styles.physVal}>{poke.base_experience ?? '—'}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.sections}>
                    {/* Stats */}
                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>Base Stats</h2>
                        <div className={styles.stats}>
                            {poke.stats.map(s => {
                                const val = s.base_stat;
                                const pct = Math.round((val / maxStat) * 100);
                                const color = statColor(val);
                                return (
                                    <div key={s.stat.name} className={styles.statRow}>
                                        <span className={styles.statName}>
                                            {s.stat.name.replace('special-', 'sp. ')}
                                        </span>
                                        <span className={styles.statVal} style={{ color }}>{val}</span>
                                        <div className={styles.statBarBg}>
                                            <div
                                                className={styles.statBar}
                                                style={{ width: `${pct}%`, background: color }}
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Abilities */}
                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>Abilities</h2>
                        <div className={styles.abilities}>
                            {poke.abilities.map(a => (
                                <div key={a.ability.name} className={styles.ability}>
                                    <span className={styles.abilityName}>{a.ability.name.replace('-', ' ')}</span>
                                    {a.is_hidden && <span className={styles.hidden}>Hidden</span>}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Moves sample */}
                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>Moves (first 12)</h2>
                        <div className={styles.moves}>
                            {poke.moves.slice(0, 12).map(m => (
                                <span key={m.move.name} className={styles.move}>
                                    {m.move.name.replace('-', ' ')}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Sprites */}
                    <div className={styles.section}>
                        <h2 className={styles.sectionTitle}>Sprites</h2>
                        <div className={styles.sprites}>
                            {[
                                poke.sprites.front_default,
                                poke.sprites.back_default,
                                poke.sprites.front_shiny,
                                poke.sprites.back_shiny,
                            ].filter(Boolean).map((src, i) => (
                                <img key={i} src={src} alt={`sprite-${i}`} className={styles.sprite} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
