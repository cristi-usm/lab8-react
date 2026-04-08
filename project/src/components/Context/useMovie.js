import { useContext } from "react";
import { MovieDispatchContext, MovieStateContext } from "./MovieContext";

export function useMovieState() {
  return useContext(MovieStateContext);
}

export function useMovieDispatch() {
  return useContext(MovieDispatchContext);
}
