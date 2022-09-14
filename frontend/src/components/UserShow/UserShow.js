import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { deleteBooking, getBookings } from "../../store/booking";
import { fetchUser, getUser } from "../../store/user";
import './UserShow.css'
import { AiOutlineDelete } from 'react-icons/ai'
import { BiEdit } from 'react-icons/bi'


const UserShow = () => {
    const sessionUser = useSelector(state => state.session.user);
    const { userId } = useParams();
    const dispatch = useDispatch();
    const user = useSelector(getUser(userId))
    const bookings = useSelector(getBookings);
    
    useEffect(() => {
        dispatch(fetchUser(sessionUser.id))
    }, [sessionUser.id])
    
    console.log(user, "USER")
    console.log(bookings, "BOOKINGS")
    if(!user) return null;
    return (
        <div className="user-show">
            <h1>Hello {user.displayName}</h1>
            <h2>User Show page</h2>

            {bookings.map(booking => (
                <div>
                    <li key={booking.id}>{booking.id}</li>
                    <Link to={`/booking/${booking.id}`}>
                        <BiEdit />
                    </Link>
                    <button 
                        onClick={() => dispatch(deleteBooking(booking.id))} 
                        className='delete-button'
                    >
                        <AiOutlineDelete />
                    </button>
                </div>
            ))}
            
        </div>
    )
}

export default UserShow;