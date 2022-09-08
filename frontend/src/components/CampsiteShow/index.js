import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './CampsiteShow.css'
import { fetchCampsite, getCampsite } from '../../store/campsite';

const CampsiteShow = () => {
    const { campsiteId } = useParams();
    const dispatch = useDispatch();
    const campsite = useSelector(getCampsite(campsiteId));

    useEffect(() => {
        dispatch(fetchCampsite(campsiteId));
    },[campsiteId])

    return (
        <div className='campsite-container'>
            <div className='state-container'>
                <p className='state'>United States</p>
                <p className='state'>{campsite.state}</p>
            </div>
            <div className='campsite-title-container'>
                <h1 className='campsite-title'>{campsite.name}</h1>
            </div>
            
            
        </div>
    )
}

export default CampsiteShow;