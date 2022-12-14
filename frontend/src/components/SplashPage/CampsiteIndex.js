import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCampsites, getCampsites } from '../../store/campsite';
import { Link } from 'react-router-dom';
import './CampsiteIndex.css'

const CampsiteIndex = () => {
    const dispatch = useDispatch();
    const campsites = useSelector(getCampsites)
    const selectCampsites = campsites.slice(0, 6)
    useEffect(()=> {
        dispatch(fetchCampsites());
    }, [])
    
    return (
        <>
        <div className='campsite-index-title-container'>
            <p className='index-title'>Find your next getaway</p>
        </div>
            <div className='campsite-index-container'>
                {/* {campsites.map(campsite => { */}
                    {selectCampsites.map(campsite => {
                    return(
                        <div key={`${campsite.id}`} className='single-campsite'>
                            <Link key={`${campsite.id}1`} id='single-campsite-link' to={`/campsites/${campsite.id}`}>
                                <img key={`${campsite.id}2`} id='campsite-img' src={campsite.photoUrl[0]} alt={campsite.location} />
                            </Link>
                            <Link key={`${campsite.id}3`} id='single-campsite-link' to={`/campsites/${campsite.id}`}>
                                <p key={`${campsite.id}4`} id='campsite-location'>{campsite.location}</p>
                            </Link>
                            <Link key={`${campsite.id}5`} id='single-campsite-link' to={`/campsites/${campsite.id}`}>
                                <p key={`${campsite.id}6`} id='campsite-state'>{campsite.state}</p>
                            </Link>
                        </div>   
                    )
                })}
            </div>
        </>
    )
    
}

export default CampsiteIndex;