import { useNavigation, useNavigationDispatch } from "../../context/NavigationContext";
import { MovieCard } from "../MovieCard/MovieCard";

export function FavoritesPage() {
    const state = useNavigation();
    const dispatch = useNavigationDispatch();
    
    const favorites = state.favorites;
    
    function onMovieClick(movie) {
        dispatch({type:'ON_MOVIE_CLICK', movie:movie})  
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 p-6 ">
            {favorites.map((movie) => (
                  <MovieCard
                    key={movie.id}
                    movie={movie}
                    onclick={() => onMovieClick(movie)}
                  ></MovieCard>
                ))}
        </div>
    )
}

export default FavoritesPage;