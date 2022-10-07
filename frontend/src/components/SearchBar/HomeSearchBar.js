import './HomeSearchBar.css'
import { BiSearchAlt2 } from 'react-icons/bi'
import { BsFillCalendarFill } from 'react-icons/bs'
import { BsFillPersonFill } from 'react-icons/bs'

// DataRangePicker

const HomeSearchBar = () => {

    return (
        <form className='search-home-searchBar'>
            <div className='search-home-location'>
                <p className='search-input-title'>WHERE TO?</p>
                <div className='search-input-holder'>
                    <BiSearchAlt2 className='search-input-icons icon' />
                    <input 
                        className='search-location-input'
                        type="text" 
                        placeholder='Try Yosemite, Napa, Moab...' 
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

export default HomeSearchBar