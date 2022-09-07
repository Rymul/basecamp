import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCampsites, getCampsites } from '../../store/campsite';
import { Link } from 'react-router-dom';

const CampsiteIndex = () => {
    const dispatch = useDispatch();
    const campsites = useSelector(getCampsites)

    useEffect(()=> {
        dispatch(fetchCampsites());
    }, [])

    return (
        <>
            {campsites.map(campsite => {
                return(
                    <div>
                        {/* <Link to={'/'}>{campsite.photoUrl[0]}</Link> */}
                        <img src={campsite.photoUrl[0]} alt="" /> 
                    </div>
            )})}
        </>
    )
}

export default CampsiteIndex;