import { useMovieState } from "./components/Context/useMovie";
import Header from "./components/Header/Header";
import Search from "./components/Search/Search";
import MoviePreview from "./components/MoviePreview/MoviePreview";
import Dashboard from "./components/Dashboard/Dashboard";
import Favorites from "./components/Favorites/Favorites";

const App = () => {
  const state = useMovieState();


  return (
    <div>
      <Header />

      {state.view === "Search" && <Search />}
      {state.view === "Dashboard" && <Dashboard />}
      {state.view === "Favorites" && <Favorites />}
      {state.selectedMovie && <MoviePreview />}
    </div>
  );
};

export default App;
