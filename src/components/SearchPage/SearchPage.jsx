import { SearchBar } from "../SearchBar";
import useFetch from "../../hooks/useFetch";
import { useNavigation, useNavigationDispatch } from "../../context/NavigationContext.jsx";

import { MovieCard } from "../MovieCard";

export function SearchPage() {
  const state = useNavigation();
  const dispatch = useNavigationDispatch();

  let url = "";

  if (state.searchInput && state.searchInput.trim() !== "") {
    url = `https://api.themoviedb.org/3/search/movie?api_key=8c85d6c54e1e9328bfa6e7ee6e4480fe&query=${state.searchInput}`;
  } else {
    url = null;
  }

  const { data, loading, error } = useFetch(url);

  let filter;

  if (Number(state.category) != 0) {
    filter = data?.results?.filter((movie) =>
      movie.genre_ids.includes(state.category),
    );
  }


  function onMovieClick(movie) {
    dispatch({type:'ON_MOVIE_CLICK', movie:movie})  
  }

  return (
    <div className="p-6">
      <SearchBar></SearchBar>
      {!state.searchInput && (
        <div className="mt-20 text-center">
          <h1 className="text-4xl font-bold text-white mb-2">
            Explore the Movie Collection
          </h1>
        </div>
      )}
      {state.searchInput && (
        <div>
          {loading && <p className="text-white text-center">Loading...</p>}
          {error && <p className="text-red-600 text-center">Error: {error}</p>}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {filter
              ? filter.map((movie) => (
                  <MovieCard
                    id={movie.id}
                    key={movie.id}
                    movie={movie}
                    onclick={() => onMovieClick(movie)}
                  ></MovieCard>
                ))
              : data?.results?.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    onclick={() => onMovieClick(movie)}
                  ></MovieCard>
                ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchPage;