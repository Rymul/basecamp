import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchBooking, getBooking, updateBooking } from '../../store/booking';
import { getCampsites } from '../../store/campsite';
import './UpdateBookingForm.css'
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'



const UpdateBookingForm = () => {

    const { bookingId } = useParams();
    const dispatch = useDispatch();
    const bookingData = useSelector(getBooking(bookingId))
    const [booking, setBooking] = useState(bookingData)
    const campsite = useSelector(getCampsites)[0]
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

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
        dispatch(updateBooking(booking))
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
            <h1>Update Booking For {campsite.name}</h1>
            <h2>{booking.checkinDate}</h2>
            <img src={campsite.photoUrl[0]} alt={campsite.name}/>
            <div className='bookingUpdate-container'>
                <form onSubmit={handleSubmit}>
                <label id='input-title'>DATES</label>
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
                    <label id='input-title'>Adult
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
                    <button id='submit-button'>Update Booking</button>
                </form>
            </div>
        </div>
    )
}

export default UpdateBookingForm;