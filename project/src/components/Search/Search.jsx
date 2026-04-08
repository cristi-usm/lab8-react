import React, { useEffect, useState } from "react";
import Button from "../Button/Button";
import { useMovieDispatch, useMovieState } from "../Context/useMovie";
import { useFetch } from "../../hooks/useFetch";
import Card from "../Card/Card";
import MoviePreview from "../MoviePreview/MoviePreview";
import styles from "./Search.module.css";

const Search = () => {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useMovieDispatch();
  const { selectedMovie } = useMovieState();
  const [url, setUrl] = useState(null);
  const { data, loading, error } = useFetch(url);

  useEffect(() => {
    if (data) {
      dispatch({ type: "SET_RESULTS", payload: { results: data.results } });
    }
  }, [data, dispatch]);

  const handleSearch = () => {
    if (!inputValue.trim()) return;
    setUrl(`https://api.themoviedb.org/3/search/movie?query=${inputValue}`);
  };

  useEffect(() => {
    document.body.style.overflow = selectedMovie ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [selectedMovie]);

  return (
    <div className={styles.container}>
      <div className={styles.searchBar}>
        <input
          className={styles.input}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Search movies..."
        />
        <Button text="Search" onClick={handleSearch} />
      </div>

      {loading && <p className={styles.loading}>Loading...</p>}
      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.cardsGrid}>
        {data?.results?.map((movie) => (
          <Card movie={movie} key={movie.id} />
        ))}
      </div>
    </div>
  );
};

export default Search;
