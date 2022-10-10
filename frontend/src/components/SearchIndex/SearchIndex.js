import { useSelector } from "react-redux"
import { getCampsites } from "../../store/campsite"
import CampsiteItem from "./CampsiteItems"
import "./SearchIndex.css"


const SearchIndex = () => {

    const campsites = useSelector(getCampsites)
    // let campsites = useSelector(state => Object.values(state.campsites));
    
    let component;
    if (campsites.length <= 0) {
        component = (
            <div className="search-index-error-container">
                <h1 className="search-index-error">No Campsites Found!</h1>
            </div>
        )
    } else {
        component = (
            <div className="search-index-container">
                {campsites.map(campsite => {
                    return(
                        <div key={`${campsite.id}`} className='campsite-item-single-campsite'>
                           <CampsiteItem campsite={campsite} />
                        </div>   
                    )
                })}
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