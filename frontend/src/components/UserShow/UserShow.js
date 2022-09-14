import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { deleteBooking, fetchBookings, getBookings } from "../../store/booking";
import { fetchUser, getUser } from "../../store/user";
import './UserShow.css'
import { AiOutlineDelete } from 'react-icons/ai'
import { BiEdit } from 'react-icons/bi'
import { getCampsites } from "../../store/campsite";


const UserShow = () => {
    const sessionUser = useSelector(state => state.session.user);
    const { userId } = useParams();
    const dispatch = useDispatch();
    const user = useSelector(getUser(userId));
    const bookings = useSelector(getBookings);
    const campsites = useSelector(getCampsites)
    console.log(campsites, "CAMPSITES")
    
    useEffect(() => {
        dispatch(fetchBookings())
    }, [])
    
    console.log(user, "USER")
    console.log(bookings, "BOOKINGS")
    if(!user) return null;

    return (
        <div className="user-show">
            <h1>Hello {user.displayName}</h1>
            <h2>Trusted camper since {user.createdAt.slice(0, 4)}</h2>
            <h3>{bookings.length} Trips</h3>
            {bookings.map(booking => (
                <div>
                    <ul>
                        <li key={booking.id}>{booking.id}</li>
                        {/* {camp}<img src={campsite.photoUrl[0]} alt=""/> */}
                        <Link to={`/booking/${booking.id}`}>
                            <BiEdit />
                        </Link>
                        <button 
                            onClick={() => dispatch(deleteBooking(booking.id))} 
                            className='delete-button'
                        >
                            <AiOutlineDelete />
                        </button>
                    </ul>
                </div>
            ))}
            
        </div>
    )
}

export default UserShow;