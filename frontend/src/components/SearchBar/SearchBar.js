import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { toggleSearchDateModal, toggleSearchGuestModal } from "../../store/ui";
import SearchDateModal from "./SearchDateModal";
import SearchGuestModal from "./SearchGuestModal";
import "./SearchBar.css"



function SearchBar () {
    const history = useHistory();
    const handleClick = () => {
        history.push('/search')
    }
    const showSearchDateModal = useSelector(state => state.ui.showSearchDateModal)
    const showSearchGuestModal = useSelector(state => state.ui.showSearchGuestModal)
    const filters = useSelector(state => state.filters);
    const dispatch = useDispatch();
    if (!filters) {return null}

    return(
        <div className="SearchContainer">    
            <div className="SplashSearchBarContainer">
                <div className="splashSearchInputs">
                    <div className="SearchInputContainer splash">
                        WHERE TO?
                        <button id="SearchSelectorButton" ><i className="fa-solid fa-magnifying-glass"></i><input type="text"/></button>
                        
                    </div>
                    <div className="DateSelectorContainer splash">
                        DATES
                            <button onClick={() => (dispatch(toggleSearchDateModal(true)))} id="splashDatesSelectorButton" ><i className="fa-solid fa-calendar"></i>{filters && filters.startDate ? `${filters.startDate.toLocaleDateString()} - ${filters.endDate.toLocaleDateString()}` : 'Enter dates'}</button>
                            {showSearchDateModal ? <SearchDateModal /> : null} 
                    </div>
                    <div className="GuestsSelectorContainer splash">
                        GUESTS
                            <button onClick={() => (dispatch(toggleSearchGuestModal(true)))} id="splashGuestsSelectorButton" ><i className="fa-solid fa-user"></i>{filters && (filters.children + filters.adults) > 0 ? `${filters.children + filters.adults} ${filters.children + filters.adults === 1 ? 'Guest' : 'Guests'}` : 'Add guests'}</button>
                            {showSearchGuestModal ? <SearchGuestModal /> : null }
                    </div>
                </div>
                <button onClick={handleClick} className="searchPill"><i className="fa-solid fa-magnifying-glass"></i></button>
            </div>
        </div>
    )

}

export default SearchBar;