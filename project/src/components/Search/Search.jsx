import React, { useEffect, useState } from "react";
import Button from "../Button/Button";
import { useMovieDispatch } from "../Context/useMovie";
import { useFetch } from "../../hooks/useFetch";
import Card from "../Card/Card";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w200";

const Search = () => {
  const [inputValue, setInputValue] = useState("");
  const dispatch = useMovieDispatch();

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

  return (
    <div>
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <Button text="Search" onClick={handleSearch} />
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {data?.results?.map((movie) => (
        <Card movie={movie} key={movie.id} />
      ))}
    </div>
  );
};

export default Search;
