import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router-dom";
import { DateRangePicker } from 'react-date-range';
// import 'react-date-range/dist/styles.css'
// import 'react-date-range/dist/theme/default.css'
import { ThemeProvider } from "styled-components";
import './BookingForm.css'
import { useState } from "react";
import { createBooking } from "../../store/booking";
import { getCampsite } from "../../store/campsite";



const BookingForm = ({campsiteId}) => {
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    const campsite = useSelector(getCampsite(campsiteId))
    const history = useHistory();
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [booking, setBooking] = useState({});

    const selectedDates = {
        startDate: startDate,
        endDate: endDate,
        key: 'selection'
    };

    const handleChange = (ranges) => {
        setStartDate(ranges.selection.startDate);
        setEndDate(ranges.selection.endDate);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createBooking(booking)).then(()=> { history.push(`/campsite/${campsiteId}`) })
    }

    return(
        
        <div className='booking-component'>
            <div id='booking-title'>
                <p>from</p>
                <p>${campsite.price}</p>
                <p>/ night</p>
            </div>
            <form onSubmit={handleSubmit}>
                <label id='input-title'>DATES</label>
                <ThemeProvider
                    theme={{
                    breakpoints: ["32em", "48em", "64em"],
                    reactDatepicker: {
                        daySize: [36, 40],
                        fontFamily: "system-ui, -apple-system",
                        colors: {
                        accessibility: "#D80249",
                        selectedDay: "#f7518b",
                        selectedDayHover: "#F75D95",
                        primaryColor: "#d8366f"
                        }
                    }
                    }}
                >
                    <DateRangePicker
                        ranges={[selectedDates]}
                        minDate= {new Date()}
                        onChange={handleChange}
                    />
                </ThemeProvider>
                <label id='input-title'>GUESTS
                    <input 
                        id='guest-number' 
                        type="number" 
                        min='1' 
                        max={campsite.capacity} 
                        placeholder='1'
                    />
                </label>
                <button id='submit-button'>Book</button>
                <p>You won't be charged yet</p>
            </form>
        </div>
    )
}

export default BookingForm;