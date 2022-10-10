import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom";
import { Link } from 'react-router-dom';
import { FaThumbsUp, FaBed } from "react-icons/fa";
import { GiCampingTent } from "react-icons/gi"



const CampsiteItem = ({campsite}) => {
    const dispatch = useDispatch();
    const history = useHistory();
    // const sessionUser = useSelector(state => state.session.user);
    

    return (
        <div className="campsite-item-info-container">
            <Link key={`${campsite.id}1`} className='campsite-item-campsite-link' to={`/campsites/${campsite.id}`}>
                <img key={`${campsite.id}2`} className='campsite-item-img' src={campsite.photoUrl[0]} alt={campsite.location} />
            </Link>

            <div className="campsite-item-rating">
                <FaThumbsUp className='campsite-item-review-thumb'/>
                <p className='campsite-item-review-per'>{Math.floor(campsite.rating)}%</p>
                <p className='campsite-item-review-num'>({campsite.numRating})</p>
            </div>
            <div className='campsite-item-title-container'>
                <Link key={`${campsite.id}11`} className='campsite-item-campsite-link' to={`/campsites/${campsite.id}`}>
                    <p className='campsite-item-campsite-title'>{campsite.name}</p>
                </Link>
            </div>
            <div className='campsite-item-capacity-site-type'>
                <p className='campsite-item-capacity'>Capacity:</p>
                <p className='campsite-item-capacity'>{campsite.capacity}</p>
                <div className='campsite-item-types'>
                    { campsite.site_type === 'tent' ? <p className='campsite-item-type'>Tent</p> : <p className='campsite-item-type'>Lodging</p>  }
                </div>
                {/* <div className='campsite-item-capacity'>
                    <p>Sleeps </p> 
                    <p>{campsite.capacity}</p>
                </div> */}
            </div>
            <div className='campsite-item-price-per-night'>
                <p className="campsite-item-from">from</p>
                <p className="campsite-item-price">${campsite.price}</p>
                <p className="campsite-item-price-text">/</p>
                <p className="campsite-item-price-text">night</p>
            </div>
        </div>
    )

}

export default CampsiteItem;