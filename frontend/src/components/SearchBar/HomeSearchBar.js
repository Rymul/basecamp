import './HomeSearchBar.css'
import { BiSearchAlt2 } from 'react-icons/bi'
import { BsFillCalendarFill } from 'react-icons/bs'
import { BsFillPersonFill } from 'react-icons/bs'
import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getSearchedCampsites } from '../../store/campsite';
import { toggleSearchDateModal, toggleSearchGuestModal } from "../../store/ui";
import SearchDateModal from "./SearchDateModal";
import SearchGuestModal from "./SearchGuestModal";


const HomeSearchBar = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const history = useHistory();

    const showSearchDateModal = useSelector(state => state.ui.showSearchDateModal);
    const showSearchGuestModal = useSelector(state => state.ui.showSearchGuestModal);
    const filters = useSelector(state => state.filters);
    if (!filters) {return null};


    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(getSearchedCampsites(query));
        history.push("/search-results")
    }

    const handleChange = (field) => {
        return e => {
            switch (field) {
                case 'query':
                    setQuery(e.target.value)
                    break;
                default:
                    // console.log('Field name error.');
                    break;     
            }
        }
    }

    const handleCalendar = (e) => {
        e.preventDefault();
        dispatch(toggleSearchDateModal(true))
    }

    const handleGuests = (e) => {
        e.preventDefault();
        dispatch(toggleSearchGuestModal(true))
    }

    return (
        <form onSubmit={handleSubmit} className='search-home-searchBar'>
            <div className='search-home-location'>
                <p className='search-input-title'>WHERE TO?</p>
                <div className='search-input-holder'>
                    <BiSearchAlt2 className='search-input-icons icon' />
                    <input 
                        className='search-location-input'
                        // type="text"
                        autoFocus='autofocus'
                        value={query}
                        placeholder='Try Yosemite, Napa, Moab...'
                        onChange={handleChange('query')}
                    />
                </div>
            </div>
            <div className='search-home-date'>
                <p className='search-input-title'>DATES</p>
                {/* <div className='search-input-holder'>
                    <BsFillCalendarFill className='search-input-icons icon' />
                    <input 
                        className='search-date-input'
                        type="text" 
                        placeholder='Enter dates'
                    />
                </div> */}
                
                <button onClick={handleCalendar} className='search-date-input'><BsFillCalendarFill className='search-input-calendar-guest-icons' />{filters && filters.startDate ? `${filters.startDate.toLocaleDateString()} - ${filters.endDate.toLocaleDateString()}` : 'Enter dates'}</button>
                {showSearchDateModal ? <SearchDateModal /> : null} 
    
            </div>
            <div className='search-home-guests'>
                <p className='search-input-title'>GUESTS</p>
                <div className='search-input-holder'>
                    {/* <BsFillPersonFill className='search-input-icons icon' />
                    <input 
                        className='search-guest-input'
                        type="text"
                        placeholder='Add guests'
                    /> */}
                    <button onClick={handleGuests} className='search-guest-input' ><BsFillPersonFill className='search-input-calendar-guest-icons' />{filters && (filters.children + filters.adults) > 0 ? `${filters.children + filters.adults} ${filters.children + filters.adults === 1 ? 'Guest' : 'Guests'}` : 'Add guests'}</button>
                            {showSearchGuestModal ? <SearchGuestModal /> : null }
                </div>
            </div> 
            <div className='search-home-search'>
                <button className='search-home-search-button'>
                    <BiSearchAlt2 />
                </button>

            </div>
        </form>
    )
}

export default HomeSearchBar;