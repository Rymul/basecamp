import './SearchBar.css'
import { BiSearchAlt2 } from 'react-icons/bi'
import { BsFillCalendarFill } from 'react-icons/bs'
import { BsFillPersonFill } from 'react-icons/bs'



const HomeSearchBar = () => {

    return (
        <form className='home-searchBar'>
            <div className='home-location'>
                <p>WHERE TO?</p>
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
                <p>DATES</p>
                <BsFillCalendarFill className='input-icons icon' />
                <input 
                    className='date-input'
                    type="text" 
                    placeholder='Enter dates'
                />
            </div>
            <div className='home-guests'>
                <p>GUESTS</p>
                <BsFillPersonFill className='input-icons icon' />
                <input 
                    className='guest-input'
                    type="text"
                    placeholder='Add guests'
                />
            </div> 
            <div className='home-search'>
                <button className='home-search-button'>
                    <BiSearchAlt2 />
                </button>

            </div>
        </form>
    )
}

export default HomeSearchBar