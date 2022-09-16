import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { fetchBooking, getBooking, updateBooking } from '../../store/booking';
import { getCampsites } from '../../store/campsite';
import './UpdateBookingForm.css'
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'



const UpdateBookingForm = () => {

    const { bookingId } = useParams();
    const sessionUser = useSelector(state => state.session.user)
    const dispatch = useDispatch();
    const bookingData = useSelector(getBooking(bookingId))
    const [booking, setBooking] = useState(bookingData)
    const campsite = useSelector(getCampsites)[0]
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const history = useHistory()

    const selectedDates = {
        startDate: startDate,
        endDate: endDate,
        color: '#40d9ac',
        key: 'selection'
    };
    
    useEffect(()=> {
        dispatch(fetchBooking(bookingId))
    },[bookingId])

    useEffect(()=>{
        if(!bookingData) return
        setBooking(bookingData)
    },[bookingData])
    
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateBooking(booking)).then(()=> history.push(`/user/${sessionUser.id}`))
    }
    
    const handleDateChange = (ranges) => {
        setStartDate(ranges.selection.startDate);
        setEndDate(ranges.selection.endDate);

    }

    const handleChange = (field) => {
        return(e) => {
            let newBooking = Object.assign({}, booking, {[field]: e.currentTarget.value})
            setBooking(newBooking)
        }
    }
    console.log(bookingData)
    if(!booking) return null

    return(
        <div className='bookingUpdate-component'>
            <div className='bookingUpdate-info'>    
                <div className="booking-img-container">
                    <img id='update-img' src={campsite.photoUrl[0]} alt=""/>
                </div>  
                <div className="update-info">
                        <p id='update-camp-name'>{campsite.name}</p>
                    <div className="update-dates">
                        <p id="update-dates">DATES: {booking.checkinDate.slice(5, 7)}-{booking.checkinDate.slice(8, 10)}-{booking.checkinDate.slice(0, 4)} through {booking.checkoutDate.slice(5, 7)}-{booking.checkoutDate.slice(8, 10)}-{booking.checkoutDate.slice(0, 4)}</p>
                    </div>
                    <div className="update-location-info">
                        <div className="update-location">
                            <p>{campsite.location}</p>
                        </div>
                        <div className="update-city">
                            <p>{campsite.city},</p>
                            <p>{campsite.state}</p>
                        </div>
                    </div>
                    <div className="update-booking-info">
                        <p>Total Price: ${booking.price}</p>
                        <p>${campsite.price} per night</p>
                        <p>{booking.adults} Guests</p>
                    </div>
                </div>
            </div>
            <div className='update-bookingUpdate-container'>
                <form onSubmit={handleSubmit}>
                <label id='update-input-title'>DATES</label>
                    <DateRangePicker 
                        id='calendar'
                        editableDateInputs={true}
                        moveRangeOnFirstSelection={false}
                        ranges={[selectedDates]}
                        minDate= {new Date()}
                        // staticRanges={[]}
                        // inputRanges={[]}
                        onChange={handleDateChange}

                    />
                    <label id='update-input-title'>GUESTS
                        <input 
                            type="number"
                            value={booking.adults} 
                            id="adults"
                            min='1' 
                            max={campsite.capacity} 
                            onChange={handleChange('adults')}
                        />
                    </label>
                    {/* <label id='input-title'>Children
                        <input 
                            type="number" 
                            value={booking.children} 
                            id="children"
                            onChange={handleChange('children')}
                        />
                    </label>
                    <label id="input-title">Pets
                        <input 
                            type="number" 
                            value={booking.pets} 
                            id="pets"
                            onChange={handleChange('pets')}
                        />
                    </label> */}
                    <button id='update-submit-button'>Update Booking</button>
                    <button id='update-cancel-button'>Cancel</button>
                </form>
            </div>
        </div>
    )
}

export default UpdateBookingForm;