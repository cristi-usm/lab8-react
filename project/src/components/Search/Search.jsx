import React, { useEffect } from "react";
import Button from "../Button/Button";
import { useMovieDispatch, useMovieState } from "../Context/useMovie";
import { useFetch } from "../../hooks/useFetch";
import Card from "../Card/Card";
import MoviePreview from "../MoviePreview/MoviePreview";
import styles from "./Search.module.css";
import genres from "../../data/genres.json";

const Search = () => {
  const dispatch = useMovieDispatch();
  const { selectedMovie, genre, page, searchQuery } = useMovieState();
  const [url, setUrl] = React.useState(null);
  const { data, loading, error } = useFetch(url);

  const buildUrl = (pageNumber = 1) => {
    if (searchQuery?.trim()) {
      return `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
        searchQuery.trim(),
      )}&page=${pageNumber}`;
    }

    let discoverUrl = `https://api.themoviedb.org/3/discover/movie?page=${pageNumber}&sort_by=popularity.desc`;
    if (genre) discoverUrl += `&with_genres=${genre}`;
    return discoverUrl;
  };

  useEffect(() => {
    if (data) {
      dispatch({ type: "SET_RESULTS", payload: { results: data.results } });
      dispatch({ type: "SET_PAGE", payload: { page: data.page || 1 } });
    }
  }, [data, dispatch]);

  const handleSearch = (pageNumber = 1) => {
    setUrl(buildUrl(pageNumber));
  };

  const handleInputChange = (e) => {
    dispatch({
      type: "SET_SEARCH_QUERY",
      payload: { searchQuery: e.target.value },
    });
  };

  const handleGenreChange = (e) => {
    dispatch({ type: "SET_GENRE", payload: { genre: Number(e.target.value) } });
    handleSearch(1);
  };

  const goToPage = (newPage) => {
    if (!data) return;
    if (newPage < 1 || newPage > data.total_pages) return;
    handleSearch(newPage);
  };

  let movies = data?.results || [];
  if (searchQuery?.trim() && genre) {
    movies = movies.filter((mv) => mv.genre_ids.includes(Number(genre)));
  }

  useEffect(() => {
    document.body.style.overflow = selectedMovie ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [selectedMovie]);

  return (
    <div className={styles.container}>
      <div className={styles.searchBar}>
        <input
          className={styles.input}
          value={searchQuery || ""}
          onChange={handleInputChange}
          placeholder="Search movies..."
        />
        <select
          className={styles.select}
          value={genre || ""}
          onChange={handleGenreChange}
        >
          <option value="">All Genres</option>
          {genres.map((g) => (
            <option key={g.id} value={g.id}>
              {g.name}
            </option>
          ))}
        </select>
        <Button text="Search" onClick={() => handleSearch(1)} />
      </div>

      {loading && <p className={styles.loading}>Loading...</p>}
      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.cardsGrid}>
        {movies.map((movie) => (
          <Card movie={movie} key={movie.id} />
        ))}
      </div>

      {data?.total_pages > 1 && (
        <div className={styles.pagination}>
          <button onClick={() => goToPage(page - 1)} disabled={page === 1}>
            Prev
          </button>
          <span>
            Page {page} of {data.total_pages}
          </span>
          <button
            onClick={() => goToPage(page + 1)}
            disabled={page === data.total_pages}
          >
            Next
          </button>
        </div>
      )}

      {selectedMovie && <MoviePreview />}
    </div>
  );
};

export default Search;
