import { useNavigation, useNavigationDispatch } from "../../context/NavigationContext";
import {genres} from "../../Data/genres.json";

export function Genres() {
    const state = useNavigation();
    const dispatch = useNavigationDispatch();

    function onchange(e) {
        dispatch({type:'CATEGORY_SELECT', category: Number(e.target.value)})
        console.log(state.category);
    }

    return (
        <div>
            <select name="genresSelect" value={state.category} onChange={(e) => onchange(e)} className="bg-transparent text-white border border-gray-500 rounded-lg px-4 py-2 outline-none cursor-pointer h-14 w-full max-w-xs hover:border-gray-400 transition-colors">
                {genres.map((genre) => (
                    <option key={genre.id} value={genre.id} className="bg-[#101010]">{genre.name}</option>
                ))}
            </select>
        </div>
    )
}

export default Genres;