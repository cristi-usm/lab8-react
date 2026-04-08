import { useReducer } from "react";
import { initialState, reducer } from "../Context/movieReducer";
import {
  MovieDispatchContext,
  MovieStateContext,
} from "../Context/MovieContext";

const MovieProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <MovieStateContext.Provider value={state}>
      <MovieDispatchContext.Provider value={dispatch}>
        {children}
      </MovieDispatchContext.Provider>
    </MovieStateContext.Provider>
  );
};

export default MovieProvider;
