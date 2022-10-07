import './HomeSearchBar.css'
import { BiSearchAlt2 } from 'react-icons/bi'
import { BsFillCalendarFill } from 'react-icons/bs'
import { BsFillPersonFill } from 'react-icons/bs'
import { useState } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getSearchedCampsites } from '../../store/campsite';


const HomeSearchBar = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(getSearchedCampsites);
        history.push("/search-results")
    }

    const handleChange = (field) => {
        return e => {
            switch (field) {
                case 'query':
                    setQuery(e.target.value)
                    break;
                default:
                    console.log('Field name error.');
                    break;     
            }
        }
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
                <div className='search-input-holder'>
                    <BsFillCalendarFill className='search-input-icons icon' />
                    <input 
                        className='search-date-input'
                        type="text" 
                        placeholder='Enter dates'
                    />
                </div>
            </div>
            <div className='search-home-guests'>
                <p className='search-input-title'>GUESTS</p>
                <div className='search-input-holder'>
                    <BsFillPersonFill className='search-input-icons icon' />
                    <input 
                        className='search-guest-input'
                        type="text"
                        placeholder='Add guests'
                    />
                </div>
            </div> 
            <div className='search-home-search'>
                <button className='search-home-search-button'>
                    <BiSearchAlt2 className='home-mag-icon'/>
                </button>

            </div>
        </form>
    )
}

export default HomeSearchBar;