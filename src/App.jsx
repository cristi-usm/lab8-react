import { FavoritesPage } from "./components/FavoritesPage";
import { MovieDetails } from "./components/MovieDetails";
import { Navbar } from "./components/Navbar";
import { SearchPage } from "./components/SearchPage/SearchPage";
import { NavigationProvider } from "./context/NavigationContext";
import { useNavigation } from "./context/NavigationContext";

function Content() {
  const state = useNavigation();
  const currPage = state.currPage;
  switch(currPage){
    case 'SEARCH':
      return <SearchPage></SearchPage>
    case 'FAVORITES':
      return <FavoritesPage></FavoritesPage>
    case 'MOVIE_DETAILS':
      return <MovieDetails movie={state.movie}></MovieDetails>
    default:
      return <div className="mt-20 text-center">
          <h1 className="text-4xl font-bold text-white mb-2">
            Explore the Movie Collection
          </h1>
        </div>
  }
}

function App() {
  return (
    <NavigationProvider>
      <Navbar></Navbar>
      <Content></Content>
    </NavigationProvider>
  );
}

export default App;
