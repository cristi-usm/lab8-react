import { useMovieState } from "./components/Context/useMovie";
import Dashboard from "./components/Dashboard/Dashboard";
import Favorites from "./components/Favorites/Favorites";
import Header from "./components/Header/Header";
import Search from "./components/Search/Search";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const App = () => {
  const state = useMovieState();

  const renderView = () => {
    switch (state.view) {
      case "Search":
        return <Search />;
      case "Dashboard":
        return <Dashboard />;
      case "Favorites":
        return <Favorites />;
    }
  };

  return (
    <div>
      <Header />
      {renderView()}
    </div>
  );
};

export default App;
