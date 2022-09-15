import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { deleteBooking, fetchBookings, getBookings } from "../../store/booking";
import { fetchUser, getUser } from "../../store/user";
import './UserShow.css'
import { AiOutlineDelete, AiOutlineCheckCircle, AiOutlinePlusCircle } from 'react-icons/ai'
import { BiEdit } from 'react-icons/bi'
import { getCampsites, getCampsites2 } from "../../store/campsite";


const UserShow = () => {
    const sessionUser = useSelector(state => state.session.user);
    const { userId } = useParams();
    const dispatch = useDispatch();
    // const user = useSelector(getUser(userId));
    const bookings = useSelector(getBookings);
    const campsites = useSelector(getCampsites2)
    
    useEffect(() => {
        dispatch(fetchBookings())
    }, [])

    
    if(!sessionUser) return null;
    return (
        <div className="user-component">
            <div className="user-show">
                <div className="left-div">
                    <div className="user-title">
                        <h1 id="name">Hello {sessionUser.firstName + " "+ sessionUser.lastName[0] + "."}</h1>
                        <h2 id="since">Basecamper since {sessionUser.createdAt.slice(0, 4)}</h2>
                    </div>
                    <div className="email-verification">
                        <p>Trusted Basecamper</p>
                        <p><AiOutlineCheckCircle /> Email address</p>
                    </div>
                    <div className="base-cash">
                        <div id="balance">
                            <p>$0</p>
                            <p>Balance</p>
                        </div>
                        <p>Earn Basecash</p>
                    </div>
                    <div className="build-profile">
                        <AiOutlinePlusCircle />
                        <p>Continue building out your Basecamp profile by adding places you have camped</p>
                    </div>
                </div>
                <div className="bookings-show-container">
                    <h3 id="total-bookings">{bookings.length} Trips</h3>
                    {bookings.map(booking => (
                        <div className="single-booking">
                            <div className="dates">
                                <p id="dates">DATES: {booking.checkinDate.slice(5, 7)}-{booking.checkinDate.slice(8, 10)}-{booking.checkinDate.slice(0, 4)} through {booking.checkoutDate.slice(5, 7)}-{booking.checkoutDate.slice(8, 10)}-{booking.checkoutDate.slice(0, 4)}</p>
                            </div>
                            <div className="location-info">
                                <div className="location">
                                    <p>{campsites[booking.campsiteId].name}</p>
                                    <p>{campsites[booking.campsiteId].location}</p>
                                </div>
                                <div className="city">
                                    <p>{campsites[booking.campsiteId].city}</p>
                                    <p>{campsites[booking.campsiteId].state}</p>
                                </div>
                            </div>
                            <div className="booking-info">
                                <p>${booking.price} per night</p>
                                <p>{booking.adults} Guests</p>
                            </div>
                            <img src={campsites[booking.campsiteId].photoUrl[0]} alt=""/>
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
            </div>
        </div>
    )
}

export default UserShow;