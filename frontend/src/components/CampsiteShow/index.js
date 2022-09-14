import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './CampsiteShow.css'
import { fetchCampsite, getCampsite } from '../../store/campsite';
import { GiCampingTent, GiSurferVan } from 'react-icons/gi'
import { FaCaravan, FaBed, FaThumbsUp } from 'react-icons/fa'
import { IoMdWalk } from 'react-icons/io'
import { MdNotAccessible } from 'react-icons/md'
import { TbToiletPaper } from 'react-icons/tb'
import { getCampsiteReviews } from '../../store/review';
import ReviewIndex from './ReviewIndex';
import BookingForm from '../Booking/BookingForm';



const CampsiteShow = () => {
    const { campsiteId } = useParams();
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(fetchCampsite(campsiteId));
    },[campsiteId])

    const campsite = useSelector(getCampsite(campsiteId))

    // let hostDisplayName;
    // useEffect(() => {
    //     hostDisplayName = campsite.hostName.first_name + " "+ campsite.hostName.last_name[0] + ".";
    // },[hostDisplayName])


    // if(campsite.hostName){
    //     const hostDisplayName = campsite.hostName.first_name + " "+ campsite.hostName.last_name[0] + "."
    // }

    
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
                < FaThumbsUp id='review-thumb'/>
                <p id='review-per'>{campsite.rating}%</p>
                <p id='review-num'>{campsite.numRating} reviews</p>
                <p id='city'>{campsite.city}, {campsite.state}</p>
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
                        <h3 id='c-type'>Campsite Type:</h3>
                        <div id='types'>
                            { campsite.site_type === 'tent' ? <p id='type-icon'><img className='home-tent' src="tent-text-icon.png" /> Tent</p> : <><FaBed /><p>Lodging</p></>  }
                        </div>
                        <div id='capacity'>
                            <p>Sleeps </p> 
                            <p>{campsite.capacity}</p>
                        </div>
                    </div>
                    <div id='description'>
                        <p>{ campsite.description }</p>
                    </div>
                </div>
                <div id='under-right'>
                    <div id='under-img-array'>
                        <h3 id='section-title'>Activities</h3>
                        {/* {campsite.activities.map(activity => {
                            <li id='list-item'>{activity.icon}   {activity}</li>
                        })} */}
                    </div>
                    <div id='under-img-array'>
                        <h3 id='section-title'>Natural features</h3>
                        {/* {campsite.natFeatures.map(feature => {
                            <li>{feature.icon}   {feature}</li>
                        })} */}
                    </div>
                </div>
            </div>
            <div className='booking-container'>
                <BookingForm campsiteId={campsiteId} />
            </div>
            <div className='amenities'>
                <h2>What this site offers</h2>
                <TbToiletPaper id='tag-icon' />
                <h3>tag.name</h3>
                <p>tag.description</p>
            </div>
        
            <div className='get-there'>
                <h2>Getting there</h2>
                <div className='get-there-info'>
                    <div className='get-there-left'>
                        <p>Check in: After 4:00pm</p>
                        <p>Check out: Before 12:00pm</p>
                        <p>On arrival: Meet with Host</p>
                        <p>Cancellation policy: Super Strict</p>
                        <p>Minimum Nights: 2 nights</p>
                        <p>Accepts bookings: 9 months out</p>
                    </div>
                    <div className='get-there-right'>
                        <p><IoMdWalk /> Short Walk</p>
                        <p><MdNotAccessible /> No wheelchair access</p>
                        <p><GiSurferVan/> Max 1 vehicle</p>
                    </div>
                </div>
            </div>
            <div className='campsite-map'>
                <h2>Site map</h2>
                <p>cool google satellite map</p>
            </div>
            <div className='host'>
                <h2>Fix host name</h2>
                {/* <h2>Hosted by { campsite.hostName.first_name + " "+ campsite.hostName.last_name[0] + "."}</h2> */}
                {/* <h2>Hosted by {hostDisplayName}</h2> */}
                <p>Joined in May 2015</p>
                <div className='response-time'>
                    <p>Response rate: 100%</p>
                    <p>Response time: Within 5 hours</p>
                </div>
            </div>
            <div className='reviews-container'>
                <h2>This is where the reviews will go</h2>
                < FaThumbsUp id='review-thumb'/>
                <p id='review-per'>{campsite.rating}%</p>
                <p id='review-num'>{campsite.numRating} reviews</p>
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


