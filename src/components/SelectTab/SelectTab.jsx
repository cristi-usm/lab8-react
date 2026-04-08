import { useNavigation, useNavigationDispatch } from "../../context/NavigationContext";

export function SelectTab() {
    const state = useNavigation();
    const dispatch = useNavigationDispatch();

    function handleClick(e) {
        dispatch({type:'SWITCH_PAGE', page:e.currentTarget.name}) 
        console.log(state.currPage);
    }

    const baseStyle = "px-6 py-2 text-sm font-bold transition-all duration-200 rounded-lg";
    const activeStyle = "bg-[#2a2420] text-white shadow-inner";
    const inactiveStyle = "text-gray-500 hover:text-gray-300";

    return(
        <div className="flex justify-center p-6">
            <div className="bg-[#1a1614] inline-flex p-1.5 rounded-2xl border border-white/5">
                <button name="SEARCH" value="SEARCH" onClick={(e) => handleClick(e)} className={`${baseStyle} ${state.currPage === 'SEARCH' ? activeStyle : inactiveStyle}`}>SEARCH</button>
                <button name="FAVORITES" value="FAVORITES" onClick={(e) => handleClick(e)} className={`${baseStyle} ${state.currPage === 'FAVORITES' ? activeStyle : inactiveStyle}`}>FAVORITES</button>
            </div>
        </div>
    )
}

export default SelectTab;