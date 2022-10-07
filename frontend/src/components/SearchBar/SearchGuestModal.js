import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateStoreFilter } from '../../store/filters';


function SearchGuestModal() {

    const dispatch = useDispatch();

    const adults = useSelector(state => state.filters.adults);
    const children = useSelector(state => state.filters.children);


    const incrementGuests = (type, current) => {
        if (adults + children < 20) {
            dispatch(updateStoreFilter({ [type]: current + 1 }));
        }
    }

    const decrementGuests = (type, current) => {
        if (current > 1 || (type === "children" && current >= 1)) {
            dispatch(updateStoreFilter({ [type]: current - 1 }));
        }
    }

    useEffect(() => {
        const ele = document.getElementsByClassName(`adults toggle subtract`)[0]
        const ele2 = document.getElementsByClassName(`adults toggle add`)[0]
        if ((adults > 1)) {
            if (ele.classList.contains("greyToggle")) ele.classList.remove("greyToggle")
        } else {
            if (!ele.classList.contains("greyToggle")) ele.classList.add("greyToggle")
        }

        if (children + adults < 20) {
            if (ele2.classList.contains("greyToggle")) ele2.classList.remove("greyToggle")
        } else {
            if (!ele2.classList.contains("greyToggle")) ele2.classList.add("greyToggle")
        }


        const ele3 = document.getElementsByClassName(`children toggle subtract`)[0]
        const ele4 = document.getElementsByClassName(`children toggle add`)[0]
        if ((children > 1 || (children === 1 && adults + children > 1))) {
            if (ele3.classList.contains("greyToggle")) ele3.classList.remove("greyToggle")
        } else {
            if (!ele3.classList.contains("greyToggle")) ele3.classList.add("greyToggle")
        }
        if (children + adults < 20) {
            if (ele4.classList.contains("greyToggle")) ele4.classList.remove("greyToggle")
        } else {
            if (!ele4.classList.contains("greyToggle")) ele4.classList.add("greyToggle")
        }
    }, [adults, children])


    return (
        <>
            <div id="SplashGuestsModal" className="SplashGuestsModalContainer" >
                <ul className='SplashGuestsModalList' >
                    <li className='adults'>
                        <div className="adults titlesContainer">
                            <p>ADULTS</p>
                            <p className='guestDescription'>Ages 13 or above</p>
                        </div>
                        <div className="adults togglesContainer">
                            <div onClick={() => { decrementGuests("adults", adults) }} className="adults toggle subtract">-</div>
                            <div>{adults ? adults : 0}</div>
                            <div onClick={() => { incrementGuests("adults", adults) }} className="adults toggle add">+</div>
                        </div>
                    </li>
                    <li className='children'>
                        <div className="children titlesContainer">
                            <p>CHILDREN</p>
                            <p className='guestDescription'>Ages 12 or below</p>
                        </div>
                        <div className="adults togglesContainer">
                            <div onClick={() => { decrementGuests("children", children) }} className="children toggle subtract">-</div>
                            <div>{children ? children : 0}</div>
                            <div onClick={() => { incrementGuests("children", children) }} className="children toggle add">+</div>
                        </div>
                    </li>
                
                </ul>
            </div>

        </>
    )
}


export default SearchGuestModal;