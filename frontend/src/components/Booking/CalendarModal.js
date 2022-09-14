import './CalendarModal.css'
import { DateRangePicker } from 'react-date-range';
// import { DayPicker } from 'react-day-picker';

import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { useState } from 'react';



const CalendarModal = () => {

    const [showModal, setShowModal] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const selectedDates = {
        startDate: startDate,
        endDate: endDate,
        color: '#40d9ac',
        key: 'selection'
    };

    const handleDateChange = (ranges) => {
        setStartDate(ranges.selection.startDate);
        setEndDate(ranges.selection.endDate);
        console.log(ranges.selection.startDate)
    }

    // const openModal = ([showModal, setShowModal]) => {
    //     setShowModal(prev => !prev)
    // }




    return (
        <>
        {showModal ? <div> Hello
             {/* <DateRangePicker 
             id='calendar'
             editableDateInputs={true}
             moveRangeOnFirstSelection={false}
             ranges={[selectedDates]}
             minDate= {new Date()}
             onChange={handleDateChange}
             /> */}
             </div>

        : null}
        </>
    )
    
    
    
}

export default CalendarModal;
