import defaultPicture from '../../assets/image.png';
import heart from "../../assets/heart.svg";
import heartInactive from "../../assets/heartInactive.svg";
import { useNavigation, useNavigationDispatch } from "../../context/NavigationContext";

export function MovieCard({ movie, onclick }) {
    const state = useNavigation();
    const dispatch = useNavigationDispatch();

    const exists = state.favorites.includes(movie);
    
    function onFavoriteButton(movie){
        exists ? dispatch({type: 'REMOVE_FAVORITE', id:movie.id}) : dispatch({type: 'ADD_FAVORITE', movie: movie});
    }

    const imgUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : defaultPicture;
    const title = movie?.title || "No Title";
    return(
        <div className="group relative bg-[#1a1614] rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 hover:z-10 cursor-pointer">
            <div onClick={onclick}>
                <div className="aspect-2/3 w-full bg-[#2a2420]">
                    <img src={imgUrl} alt={title} className="w-full h-full object-cover"/>
                </div>
                <div className="p-3">
                    <h3 className="text-white text-sm font-bold truncate" title={title}>
                        {title}
                    </h3>

                </div>
            </div>
            <button onClick={() => onFavoriteButton(movie)} className="flex gap-2 text-white text-sm font-bold truncate justify-center items-center p-2">
                    {exists ? <>Remove from Favorites<img className='w-6 h-6' src={heart}/></>: <>Add To Favorites<img className='w-6 h-6' src={heartInactive}/></>}
            </button>
        </div>
    )
}