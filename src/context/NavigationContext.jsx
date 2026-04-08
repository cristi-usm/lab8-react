/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useReducer, useEffect } from "react";

const NavigationContext = createContext(null);
const NavigationDispatchContext = createContext(null);

const initialState = {
    currPage: 'SEARCH',
    prevPage: '',
    category: 0,
    searchInput: '',
    movie: null,
    favorites: JSON.parse(localStorage.getItem("fav_movies") || "[]")
}

function navigationReducer(state, action){
    switch(action.type){
        case 'SWITCH_PAGE':
            return {...state, currPage: action.page};
        case 'SEARCH':
            return {...state, searchInput: action.input} ;
        case 'CATEGORY_SELECT':
            return {...state, category: action.category};
        case 'ON_MOVIE_CLICK':{
            const prev = state.currPage
            const curr = 'MOVIE_DETAILS'
            return {...state, movie: action.movie, prevPage: prev, currPage: curr};
        }
        case 'ON_BACK_CLICK':{
            const curr = state.prevPage;
            return {...state, currPage: curr, prevPage: '', movie: null};
        }
        case "ADD_FAVORITE": {
            return {...state, favorites:[...state.favorites, action.movie]};
        }
        case "REMOVE_FAVORITE": {
            return {...state, favorites:state.favorites.filter((movie) => movie.id !== action.id)};
        }
        default:
            return state;
    }
}

export function NavigationProvider({children}) {
    const [state, dispatch] = useReducer(navigationReducer, initialState);

    useEffect(() => {
        localStorage.setItem("fav_movies", JSON.stringify(state.favorites));
    }, [state.favorites]);

    return(
        <NavigationContext value={state}>
            <NavigationDispatchContext value={dispatch}>
                {children}
            </NavigationDispatchContext>
        </NavigationContext>
    )
}

export function useNavigation() {
    return useContext(NavigationContext);
}

export function useNavigationDispatch() {
    return useContext(NavigationDispatchContext);
}