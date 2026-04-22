export const TYPE_COLORS = {
    normal: { bg: '#A8A77A', light: '#f5f5dc' },
    fire: { bg: '#EE8130', light: '#fff3e0' },
    water: { bg: '#6390F0', light: '#e3f2fd' },
    electric: { bg: '#F7D02C', light: '#fffde7' },
    grass: { bg: '#7AC74C', light: '#e8f5e9' },
    ice: { bg: '#96D9D6', light: '#e0f7fa' },
    fighting: { bg: '#C22E28', light: '#ffebee' },
    poison: { bg: '#A33EA1', light: '#f3e5f5' },
    ground: { bg: '#E2BF65', light: '#fff8e1' },
    flying: { bg: '#A98FF3', light: '#ede7f6' },
    psychic: { bg: '#F95587', light: '#fce4ec' },
    bug: { bg: '#A6B91A', light: '#f9fbe7' },
    rock: { bg: '#B6A136', light: '#f9f5e0' },
    ghost: { bg: '#735797', light: '#ede7f6' },
    dragon: { bg: '#6F35FC', light: '#ede7f6' },
    dark: { bg: '#705746', light: '#efebe9' },
    steel: { bg: '#B7B7CE', light: '#eceff1' },
    fairy: { bg: '#D685AD', light: '#fce4ec' },
};

export function getTypeColor(type) {
    return TYPE_COLORS[type] || { bg: '#888', light: '#f5f5f5' };
}

export const POKEMON_TYPES = Object.keys(TYPE_COLORS);

export function statColor(value) {
    if (value >= 100) return '#4caf50';
    if (value >= 70) return '#8bc34a';
    if (value >= 45) return '#ff9800';
    return '#f44336';
}
