import { useState, useEffect } from 'react';
import { movieAPI } from '../services/api';
import SearchBar from '../components/SearchBar';
import MovieCard from '../components/MovieCard';
import Pagination from '../components/Pagination';
import useFavorites from '../hooks/useFavorites';
import './Home.css';

function Home() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [genres, setGenres] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  useEffect(() => {
    const loadGenres = async () => {
      try {
        const data = await movieAPI.getGenres();
        setGenres(data.genres);
      } catch (error) {
        console.error('Eroare la genuri:', error);
      }
    };
    loadGenres();
  }, []);

  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true);
      try {
        let data;
        let results = [];
        
        if (searchTerm) {
          data = await movieAPI.searchMovies(searchTerm, currentPage);
          results = data.results || [];
          
          if (selectedType === 'movie') {
            results = results.filter(m => m.media_type === 'movie' || !m.media_type);
          } else if (selectedType === 'tv') {
            results = results.filter(m => m.media_type === 'tv');
          }
          
          if (selectedGenre) {
            const genreIds = selectedGenre.split(',').map(Number);
            results = results.filter(movie => {
              return movie.genre_ids && genreIds.some(id => movie.genre_ids.includes(id));
            });
          }
          
          setMovies(results);
          setTotalPages(data.total_pages || 1);
          setTotalResults(data.total_results || 0);
        } else {
          const params = { page: currentPage };
          if (selectedGenre) params.with_genres = selectedGenre;
          data = await movieAPI.discoverMovies(params);
          setMovies(data.results || []);
          setTotalPages(data.total_pages || 1);
          setTotalResults(data.total_results || 0);
        }
      } catch (error) {
        console.error('Eroare la filme:', error);
      } finally {
        setLoading(false);
      }
    };

    const timer = setTimeout(loadMovies, 500);
    return () => clearTimeout(timer);
  }, [searchTerm, selectedGenre, selectedType, currentPage]);

  const handleSearchChange = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handleGenreChange = (genre) => {
    setSelectedGenre(genre);
    setCurrentPage(1);
  };

  const handleTypeChange = (type) => {
    setSelectedType(type);
    setCurrentPage(1);
  };

  return (
    <div className="home">
      <section className="search-section">
        <SearchBar
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          selectedGenre={selectedGenre}
          onGenreChange={handleGenreChange}
          genres={genres}
          selectedType={selectedType}
          onTypeChange={handleTypeChange}
        />
      </section>

      <section className="hero-section">
        <h2>Explore the Movie Collection</h2>
        <p>Search over {totalResults.toLocaleString()} movies</p>
      </section>

      <section className="content-section">
        {loading ? (
          <div className="loading">⏳ Loading...</div>
        ) : movies.length === 0 ? (
          <div className="no-results">No movies found</div>
        ) : (
          <>
            <div className="movies-grid">
              {movies.map(movie => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  isFavorite={isFavorite(movie.id)}
                  onToggleFavorite={() => {
                    isFavorite(movie.id) 
                      ? removeFavorite(movie.id) 
                      : addFavorite(movie);
                  }}
                />
              ))}
            </div>
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </>
        )}
      </section>
    </div>
  );
}

export default Home;