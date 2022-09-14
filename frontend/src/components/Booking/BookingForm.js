import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom";
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import './BookingForm.css'
import { useState } from "react";
import { createBooking } from "../../store/booking";
import { getCampsite } from "../../store/campsite";
import CalendarModal from "./CalendarModal";
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
        color: '#00A699',
        rangeColors: '#66E2DA',
        key: 'selection'
    };

    const handleDateChange = (ranges) => {
        setStartDate(ranges.selection.startDate);
        setEndDate(ranges.selection.endDate);
        console.log(startDate.toString().split(' '), "START")
        console.log(new Date(Date.parse(startDate)), "START PARSE")

    }

    const handleChange = (field) => {
        return (e)=>{
            let newBooking = Object.assign({}, booking, {[field]: e.currentTarget.value},
                { checkinDate: startDate, checkoutDate: endDate})
            setBooking(newBooking)
        }
    }

    const handleSubmit = (e) => {
        // console.log(campsite.hostId, "HOSTID")
        e.preventDefault();
        dispatch(createBooking(booking)).then(()=> { history.push(`/user/${sessionUser.id}`) })
    }

    if(!campsite) return null
    if (!sessionUser) return null
    return(
        
        <div className='booking-component'>
            <div id='booking-title'>
                <p>from</p>
                <p>${campsite.price}</p>
                <p>/ night</p>
            </div>
                {/* <button onClick={openModal}>Enter Dates</button>
                <CalendarModal showModal={showModal} setShowModal={setShowModal}/> */}
            <form onSubmit={handleSubmit}>
                <label id='input-title'>DATES</label>
                {/* <CalendarModal showModal={showModal} setShowModal={setShowModal}/> */}
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
                    {/* <input 
                        type="date" 
                        id="selected-dates"
                        onChange={handleChange('checkinDate')}
                    /> */}
                
                {/* <label id='input-title'>CHECKOUT DATE
                    <input 
                        type="date" 
                        id="selected-dates"
                        onChange={handleChange('checkoutDate')}
                    />
                </label> */}
                <label id='input-title'>GUESTS
                    <input 
                        id='guest-number' 
                        type="number" 
                        min='1' 
                        max={campsite.capacity} 
                        placeholder='1'
                        onChange={handleChange('adults')}
                    />
                </label>
                <button id='book-button'>Book</button>
                <p>You won't be charged yet</p>
            </form>
        </div>
    )
}

export default BookingForm;