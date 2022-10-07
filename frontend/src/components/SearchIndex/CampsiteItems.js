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
        <div className="campsite-info-container">
            <Link key={`${campsite.id}1`} id='single-campsite-link' to={`/campsites/${campsite.id}`}>
                <img key={`${campsite.id}2`} id='campsite-img' src={campsite.photoUrl[0]} alt={campsite.location} />
            </Link>
            <FaThumbsUp id='review-thumb'/>
            <p id='review-per'>{Math.floor(campsite.rating)}%</p>
            <p id='review-num'>{campsite.numRating} reviews</p>
            <div className='campsite-title-container'>
                <h1 id='campsite-title'>{campsite.name}</h1>
            </div>
            <div id='site-type'>
                <h3 id='c-type'>Campsite Type:</h3>
                <div id='types'>
                    { campsite.site_type === 'tent' ? <p id='type-icon'><GiCampingTent /> Tent</p> : <p id='type-icon'><FaBed id='type-icon'/>Lodging</p>  }
                </div>
                <div id='capacity'>
                    <p>Sleeps </p> 
                    <p>{campsite.capacity}</p>
                </div>
            </div>
            <div className='booking-title-per-night'>
                <p>from</p>
                <p>${campsite.price}</p>
                <p>/</p>
                <p>night</p>
            </div>
        </div>
    )

}

export default CampsiteItem;