import './SearchBar.css';

function SearchBar({ 
  searchTerm, 
  onSearchChange, 
  selectedGenre, 
  onGenreChange, 
  genres,
  selectedType,
  onTypeChange 
}) {
  return (
    <div className="search-bar">
      <div className="search-input-wrapper">
        <input
          type="text"
          placeholder="Search movies, TV shows..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="search-input"
        />
        <span className="search-icon">🔍</span>
      </div>

      <div className="filters">
        <select 
          value={selectedType} 
          onChange={(e) => onTypeChange(e.target.value)}
          className="filter-select"
        >
          <option value="">All Types</option>
          <option value="movie">Movies</option>
          <option value="tv">TV Shows</option>
        </select>

        <select 
          value={selectedGenre} 
          onChange={(e) => onGenreChange(e.target.value)}
          className="filter-select"
        >
          <option value="">All Genres</option>
          {genres.map(genre => (
            <option key={genre.id} value={genre.id}>
              {genre.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default SearchBar;