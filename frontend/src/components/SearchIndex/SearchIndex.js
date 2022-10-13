import { useSelector } from "react-redux"
import { getCampsites } from "../../store/campsite"
import CampsiteItem from "./CampsiteItems"
import "./SearchIndex.css"
import SearchMapWrapper from "./SearchMapWrapper"


const SearchIndex = () => {

    window.scroll({
        top: 0, 
        left: 0, 
        // behavior: 'smooth'
    });

    const campsites = useSelector(getCampsites)
    
    let component;
    if (campsites.length <= 0) {
        component = (
            <div className="search-index-error-results-container">
                <div className="search-index-error-container">
                    <h1 className="search-index-error">No Campsites Found!</h1>
                </div>
            </div>
        )
    } else {
        component = (
            <div className="search-index-results-container">
                <div className="search-index-container">
                    {campsites.map(campsite => {
                        return(
                            <div key={`${campsite.id}`} className='campsite-item-single-campsite'>
                            <CampsiteItem campsite={campsite} />
                            </div>   
                        )
                    })}
                </div>
                <div className="search-index-map">
                    <SearchMapWrapper apiKey={process.env.REACT_APP_MAPS_API_KEY} campsites={Object.values(campsites)}/>
                </div>
            </div>
        )
    }


    return (
        <div className="search-index-component">
            {component}
        </div>
    )
}

export default SearchIndex;