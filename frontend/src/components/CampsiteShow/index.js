import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './CampsiteShow.css'
import { fetchCampsite, getCampsite } from '../../store/campsite';
import { GiCampingTent, GiSurferVan } from 'react-icons/gi'
import { FaCaravan, FaBed } from 'react-icons/fa'
import { IoMdWalk } from 'react-icons/io'
import { MdNotAccessible } from 'react-icons/md'
import { getCampsiteReviews } from '../../store/review';
import ReviewIndex from './ReviewIndex';



const CampsiteShow = () => {
    const { campsiteId } = useParams();
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(fetchCampsite(campsiteId));
    },[campsiteId])

    const campsite = useSelector(getCampsite(campsiteId));

    
    // if(!campsite) return null
    
    if (campsite){
    return (
        <div className='campsite-parent'>
        <div className='campsite-container'>
            <div className='state-container'>
                <p id='state'>United States</p>
                <p id='state'>{campsite.state}</p>
            </div>
            <div className='campsite-title-container'>
                <h1 id='campsite-title'>{campsite.name}</h1>
            </div>
            <div className='location-container'>
                <p id='review-per'>Review %</p>
                <p id='review-num'><strong>Num Reviews</strong></p>
                <p id='city'>{campsite.city},</p>
                <p id='city'>{campsite.state}</p>
            </div>
            <div className='image-container-parent'>
                <div className='image-container'>
                    {campsite.photoUrl.length && campsite.photoUrl.map((photo, i) =>{
                    return <img key={i} id={`campsite-img-${i}`} src={photo} alt={campsite.location} />
                    })}
                </div>
            </div>
            {/* add a link and component to view all photos in last grid box */}
            <div className='under-img-info'>
                {/* <div id='num-stuff'>
                    <p>Num acres</p>
                    <p>Num sites</p>
                </div> */}
                <div id='under-left'>
                    <div id='site-type'>
                        <p>Campsite Type:</p>
                        { campsite.site_type === 'tent' ? <p><img className='home-tent' src="tent-text-icon.png" /> Tent</p> : <><FaBed /><p>Lodging</p></>  }
                    </div>
                    <div id='description'>
                        <p>{ campsite.description }</p>
                    </div>
                </div>
                <div id='under-right'>
                    <div id='under-img-array'>
                        <h2 id='section-title'>Activities</h2>
                        {/* {campsite.activities.map(activity => {
                            <li id='list-item'>{activity.icon}   {activity}</li>
                        })} */}
                    </div>
                </div>
                <div id='under-img-array'>
                    <h2 id='section-title'>Natural features</h2>
                    {/* {campsite.natFeatures.map(feature => {
                        <li>{feature.icon}   {feature}</li>
                    })} */}
                </div>
            </div>
            <div className='amenities'>
                <h2>What this site offers</h2>
                <p>this will be made from the tags table</p>
                <p>tag.icon</p>
                <p>tag.name</p>
                <p>tag.description</p>
            </div>
            <div className='get-there'>
                <h2>Getting there</h2>
                <div className='get-there-left'>
                    <p><strong>Check in:</strong> After 4:00pm</p>
                    <p><strong>Check out:</strong> Before 12:00pm</p>
                    <p><strong>On arrival:</strong> Meet with Host</p>
                    <p><strong>Cancellation policy:</strong> Super Strict</p>
                    <p><strong>Minimum Nights:</strong> 2 nights</p>
                    <p><strong>Accepts bookings:</strong> 9 months out</p>
                </div>
                <div className='get-there-left'>
                    <p><IoMdWalk /> Short Walk</p>
                    <p><MdNotAccessible /> No wheelchair access</p>
                    <p><GiSurferVan/> Max 1 vehicle</p>
                </div>
            </div>
            <div className='campsite-map'>
                <h2>Site map</h2>
                <p>cool google satellite map</p>
            </div>
            <div className='host'>
                <h2>Hosted by {campsite.host_id}</h2>
                <p>Joined in May 2015</p>
                <div className='response-time'>
                    <p>Response rate: 100%</p>
                    <p>Response time: Within 5 hours</p>
                </div>
            </div>
            <div className='reviews-container'>
                <h2>This is where the reviews will go</h2>
                <ReviewIndex campsiteId={campsite.id} />
            </div>
            
        </div>
        </div>
    )
    } else{
        return( <></> )
    }
}

export default CampsiteShow;


