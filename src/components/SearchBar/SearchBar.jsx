import { useState } from "react";
import { useNavigation,useNavigationDispatch } from "../../context/NavigationContext";
import { Genres } from "../Genres/Genres";

export function SearchBar() {
    const state = useNavigation();
    const dispatch = useNavigationDispatch();

    const [text, setText] = useState(state.searchInput);

    function handleSearch(e){
        e.preventDefault();
        dispatch({type:'SEARCH', input: text})
        // setText('');
    }
    return(
        <div className="flex justify-center items-center p-4 gap-5">
            <form className="bg-[#101010] w-full max-w-2xl h-14 flex items-center rounded-lg overflow-hidden border border-gray-500">
                <input value={text} onChange={(e) => setText(e.target.value)} type="text" placeholder="Search movies... (e.g 'Barbie')" className="grow bg-transparent text-white outline-none px-4 py-2 placeholder-gray-500"/>
                <button onClick={(e) => {handleSearch(e)}} className="bg-[#E50914] text-white px-8 h-full font-bold hover:bg-[#b20710] transition-colors uppercase text-sm">Search</button>
            </form>
            <Genres></Genres>
        </div>
    )
}

export default SearchBar;