import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom";
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import './BookingForm.css'
import { useState } from "react";
import { createBooking } from "../../store/booking";
import { getCampsite } from "../../store/campsite";
import { useEffect } from "react";



const BookingForm = ({campsiteId}) => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const campsite = useSelector(getCampsite(campsiteId))
    const history = useHistory();
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const bookedPrice = campsite.price
    
    
    const [booking, setBooking] = useState({
        // campsiteId: ,
        // customerId: null,
        // hostId: null,
        adults: 1,
        children: 0,
        pets: 0,
        // price: null,
        checkinDate: startDate,
        checkoutDate: endDate
    });

    useEffect(() => {
        setBooking({...booking, campsiteId: campsite.id, customerId: sessionUser.id, hostId: campsite.hostId, price: campsite.price})
    },[campsite])


    // const [showModal, setShowModal] = useState(false);

    // const openModal = () => {
    //     // setShowModal(prev => !prev)
    //     showModal === 'false' ? setShowModal(true) : setShowModal(false)
    // }

    const selectedDates = {
        startDate: startDate,
        endDate: endDate,
        // color: '#40d9ac',
        // color: '#00A699',
        // rangeColors: '#66E2DA',
        key: 'selection'
    };


    const handleDateChange = (ranges) => {
        setStartDate(ranges.selection.startDate);
        setEndDate(ranges.selection.endDate);

    }

    const dayDif = () => {
        return(endDate.getTime() - startDate.getTime()) / 86400000
    }
   




    const handleChange = (field) => {
        return (e)=>{
            let newBooking = Object.assign({}, booking, {[field]: e.currentTarget.value},
                { checkinDate: startDate, checkoutDate: endDate, price: campsite.price * dayDif()})
            setBooking(newBooking)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createBooking(booking)).then(()=> { history.push(`/user/${sessionUser.id}`) })
    }

    if(!campsite) return null
    if (!sessionUser) return null
    return(
        
        <div className='booking-component'>
            <div className='booking-title-container'>
                <div className='booking-title-per-night'>
                    <p>from</p>
                    <p>${campsite.price}</p>
                    <p>/</p>
                    <p>night</p>
                </div>
                <div className='booking-title-total'>
                    <p>Total </p>
                    <p>${campsite.price * dayDif()}</p>
                </div>
            </div>
                {/* <button onClick={openModal}>Enter Dates</button>
                <CalendarModal showModal={showModal} setShowModal={setShowModal}/> */}
                <form onSubmit={handleSubmit} className="input-holder">
                    <label className='book-input-title'>DATES</label>
                    {/* <CalendarModal showModal={showModal} setShowModal={setShowModal}/> */}
                        <DateRangePicker 
                            className='calendar'
                            editableDateInputs={true}
                            moveRangeOnFirstSelection={false}
                            ranges={[selectedDates]}
                            minDate= {new Date()}
                            // staticRanges={[]}
                            // inputRanges={[]}
                            onChange={handleDateChange}

                        />
                        {/* <input 
                            type="date" 
                            className="selected-dates"
                            onChange={handleChange('checkinDate')}
                        /> */}
                    
                    {/* <label className='input-title'>CHECKOUT DATE
                        <input 
                            type="date" 
                            className="selected-dates"
                            onChange={handleChange('checkoutDate')}
                        />
                    </label> */}
                    <label className='book-guests-title'>GUESTS
                        <input 
                            className='guest-number' 
                            type="number" 
                            min='1' 
                            max={campsite.capacity} 
                            placeholder='1'
                            onChange={handleChange('adults')}
                        />
                    </label>
                    <button className='book-button'>Book</button>
                    <p>You won't be charged yet</p>
                </form>
        </div>
    )
}

export default BookingForm;