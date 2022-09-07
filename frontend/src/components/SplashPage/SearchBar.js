import './SearchBar.css'
import { BiSearchAlt2 } from 'react-icons/bi'
import { BsFillCalendarFill } from 'react-icons/bs'
import { BsFillPersonFill } from 'react-icons/bs'



const HomeSearchBar = () => {

    return (
        <form className='home-searchBar'>
            <div className='home-location'>
                <p className='input-title'>WHERE TO?</p>
                <div className='input-holder'>
                    <BiSearchAlt2 className='input-icons icon' />
                    <input 
                        className='location-input'
                        type="text" 
                        placeholder='Try Yosemite, Napa, Moab...' 
                    />
                </div>
            </div>
            <div className='home-date'>
                <p className='input-title'>DATES</p>
                <div className='input-holder'>
                    <BsFillCalendarFill className='input-icons icon' />
                    <input 
                        className='date-input'
                        type="text" 
                        placeholder='Enter dates'
                    />
                </div>
            </div>
            <div className='home-guests'>
                <p className='input-title'>GUESTS</p>
                <div className='input-holder'>
                    <BsFillPersonFill className='input-icons icon' />
                    <input 
                        className='guest-input'
                        type="text"
                        placeholder='Add guests'
                    />
                </div>
            </div> 
            <div className='home-search'>
                <button className='home-search-button'>
                    <BiSearchAlt2 className='home-mag-icon'/>
                </button>

            </div>
        </form>
    )
}

export default HomeSearchBar