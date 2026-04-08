export const initialState = {
  results: [],
  page: 1,
  searchQuery: "",
  filters: {},
  favorites: JSON.parse(localStorage.getItem("favorites")) || [],
  selectedMovie: null,
  view: "Dashboard",
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "SET_PAGE": {
      const { page } = action.payload;
      return { ...state, page };
    }
    case "SET_RESULTS": {
      const { results } = action.payload;
      return { ...state, results };
    }
    case "SET_SEARCH_QUERY": {
      const { searchQuery } = action.payload;
      return { ...state, searchQuery };
    }
    case "SET_FILTERS": {
      const { filters } = action.payload;
      return { ...state, filters };
    }
    case "ADD_FAVORITE": {
      const { movie } = action.payload;
      const updated = [...state.favorites, movie];
      localStorage.setItem("favorites", JSON.stringify(updated));
      return { ...state, favorites: updated };
    }
    case "REMOVE_FAVORITE": {
      const { id } = action.payload.movie;
      const updated = state.favorites.filter((f) => f.id !== id);
      localStorage.setItem("favorites", JSON.stringify(updated));
      return { ...state, favorites: updated };
    }
    case "SET_SELECTED_MOVIE": {
      const { id } = action.payload;
      return { ...state, selectedMovie: id };
    }
    case "SET_VIEW": {
      const { view } = action.payload;
      return { ...state, view };
    }
  }
};
