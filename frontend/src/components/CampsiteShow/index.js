import { useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './CampsiteShow.css'
import { fetchCampsite, getCampsite } from '../../store/campsite';
import { GiCampingTent, GiSurferVan, GiFishing, GiHummingbird, GiTap, GiPineTree, GiCampfire } from 'react-icons/gi'
import { FaCaravan, FaBed, FaThumbsUp, FaMountain, FaDog } from 'react-icons/fa'
import { IoMdWalk } from 'react-icons/io'
import { MdNotAccessible, MdDirectionsBike, MdHiking, MdHotTub } from 'react-icons/md'
import { TbToiletPaper } from 'react-icons/tb'
import { BiWater } from 'react-icons/bi'
import { getCampsiteReviews } from '../../store/review';
import ReviewIndex from './ReviewIndex';
import BookingForm from '../Booking/BookingForm';




const CampsiteShow = () => {
    const { campsiteId } = useParams();
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user)
    const history = useHistory()
    
    useEffect(() => {
        dispatch(fetchCampsite(campsiteId));
    },[campsiteId])

    const campsite = useSelector(getCampsite(campsiteId))

    // if (!sessionUser) {
    //     history.push('/')
    // }
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
                <FaThumbsUp id='review-thumb'/>
                <p id='review-per'>{Math.floor(campsite.rating)}%</p>
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
                            { campsite.site_type === 'tent' ? <p id='type-icon'><GiCampingTent /> Tent</p> : <p id='type-icon'><FaBed id='type-icon'/>Lodging</p>  }
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
                            <p><MdDirectionsBike id='under-icon'/> Biking</p>
                            <p><GiFishing id='under-icon'/> Fishing</p>
                            <p><MdHiking id='under-icon'/> Hiking</p>
                            <p><GiHummingbird id='under-icon'/> Wildlife watching</p>
                        {/* {campsite.activities.map(activity => {
                            <li id='list-item'>{activity.icon}   {activity}</li>
                        })} */}
                    </div>
                    <div id='under-img-array'>
                        <h3 id='section-title'>Natural features</h3>
                        <p><BiWater id='under-icon'/> River, stream, or creek</p>
                        <p><FaMountain id='under-icon'/> Mountainous</p>
                        <p><MdHotTub id='under-icon'/> Hot spring</p>
                        <p><GiPineTree id='under-icon'/> Forest</p>
                        {/* {campsite.natFeatures.map(feature => {
                            <li>{feature.icon}   {feature}</li>
                        })} */}
                    </div>
                </div>
            </div>
           
                
                <div className='amenities'>
                    <h2>What this site offers</h2>
                    <h3><GiCampfire id='under-icon'/> Campfires allowed</h3>
                    <p>Firepit. Outdoor fires are typically allowed from October - May, depending on local burn bans.</p>
                    <h3><TbToiletPaper id='under-icon' /> Toilet available</h3>
                    <p>Flush toilet, portable toilet. Please pack out your waste baggies upon departure. There is a dump station at the bottom of our property.</p>
                    <h3><FaDog id='under-icon'/>Pets allowed</h3>
                    <p>On leash. Please bring a dog bed or a blanket, and be respectful of neighbors and other animals in the area.</p>
                    <h3><GiTap id='under-icon'/>Potable water available</h3>
                    <p>Garden Hose is up the hill for camper's use.</p>
                </div>
                {sessionUser ?
                <div className='booking-container'>
                     <BookingForm campsiteId={campsiteId} /> 
                </div> : null }
            
        
            <div className='get-there'>
                <h2>Getting there</h2>
                <div className='get-there-info'>
                    <div className='get-there-left'>
                        <p><strong>Check in:</strong> After 4:00pm</p>
                        <p><strong>Check out:</strong> Before 12:00pm</p>
                        <p><strong>On arrival:</strong> Meet with Host</p>
                        <p><strong>Cancellation policy:</strong> Super Strict</p>
                        <p><strong>Minimum Nights:</strong> 2 nights</p>
                        <p><strong>Accepts bookings:</strong> 9 months out</p>
                    </div>
                    <div className='get-there-right'>
                        <p><IoMdWalk id='get-there-icon'/> Short Walk</p>
                        <p><MdNotAccessible id='get-there-icon'/> No wheelchair access</p>
                        <p><GiSurferVan id='get-there-icon'/> Max 1 vehicle</p>
                    </div>
                </div>
            </div>
            <div className='campsite-map'>
                <h2>Site map</h2>
                <p>cool google satellite map</p>
            </div>
            <div className='host'>
                <div className='host-join-container'>
                    <h2>Hosted by {campsite.hostName}</h2>
                    <p>Joined in Sept 2022</p>
                </div>
                <div className='response-time'>
                    <p><strong>Response rate:</strong> 100%</p>
                    <p><strong>Response time:</strong> Within 5 hours</p>
                </div>
            </div>
            <div className='reviews-container'>
                <div id='rate-percent'>
                    < FaThumbsUp id='rev-per'/>
                    <p id='rev-per'>{Math.floor(campsite.rating)}%</p>
                </div>
                <p id='rev-num'>{campsite.numRating} reviews</p>
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


