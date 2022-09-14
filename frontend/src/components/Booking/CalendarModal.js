import './CalendarModal.css'
import { DateRangePicker } from 'react-date-range';
// import { DayPicker } from 'react-day-picker';

import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'







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