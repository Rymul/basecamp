import { useDispatch } from 'react-redux';
import { toggleSearchDateModal, toggleSearchGuestModal } from '../../store/ui';
import SearchBar from '../SearchBar/SearchBar';
import CampsiteIndex from './CampsiteIndex';
import HomeSearchBar from '../SearchBar/HomeSearchBar';
import './SplashPage.css';


const SplashPage = () => {
    
    const dispatch = useDispatch()
    const hideModal = (event) => {
        const dateModal = document.getElementById("SplashDateModal")
        const guestModal = document.getElementById("SplashGuestsModal")
        if (dateModal && !dateModal.contains(event.target)) {
            dispatch(toggleSearchDateModal(false))
        }
        if (guestModal && !guestModal.contains(event.target)) {
            dispatch(toggleSearchGuestModal(false))
        }
    }

    return (
        <div onClick={hideModal} className="splash-container">
            <div className="splash-title">
                <h1 >Find yourself outside.</h1>
                <div className='splash-subTitle'>
                    <p>Discover and book tent camping, RV parks, cabins, treehouses, and glamping.</p>
                </div>
            </div>
            {/* <div className='searchBar'>
                <SearchBar />
            </div> */}
            <div className='searchBar-container'>
                <div className="searchBar-component">
                    <HomeSearchBar />
                </div>
            </div>
            <div className='img-container'>
                <img className='splash-img' src="woman_and_dog_in_tent.jpg" alt="picture of a woman and a dog in a tent"/>
            </div>
            <div className='campsite-idx'>
                <CampsiteIndex />
            </div>
        </div>
    )

}

export default SplashPage;