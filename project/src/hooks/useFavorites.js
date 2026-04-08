import {
  useMovieState,
  useMovieDispatch,
} from "../components/Context/useMovie";

export const useFavorites = () => {
  const { favorites } = useMovieState();
  const dispatch = useMovieDispatch();

  const addFavorite = (movie) => {
    if (!movie || !movie.id) return;
    dispatch({ type: "ADD_FAVORITE", payload: { movie } });
  };

  const removeFavorite = (id) => {
    if (!id) return;
    dispatch({ type: "REMOVE_FAVORITE", payload: { id } });
  };

  const isFavorite = (id) => {
    if (!id) return false;
    return favorites.some((f) => f.id === id);
  };

  return { isFavorite, addFavorite, removeFavorite };
};
