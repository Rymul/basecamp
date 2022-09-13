import csrfFetch from "./csrf";


const ADD_BOOKING = 'bookings/ADD_BOOKING';
const ADD_BOOKINGS = 'bookings/ADD_BOOKINGS';
const REMOVE_BOOKING = 'bookings/REMOVE_BOOKINGS';

const addBooking = booking => ({
    type: ADD_BOOKING,
    payload: booking
});

export const addBookings = bookings => ({
    type: ADD_BOOKINGS,
    payload: bookings
});
  
const removeBooking = bookingId => ({
    type: REMOVE_BOOKING,
    payload: bookingId
});



export const getBooking = bookingId => state => {
    if(!state) {
        return null;
    } else if (!state.bookings) {
        return null;
    } else {
        return state.bookings[bookingId]
    }
}


export const createBooking = (booking) => async dispatch => {
    // debugger
    const res = await csrfFetch('/api/bookings', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(booking)
    });
    const data = await res.json();
    dispatch(addBooking(data.booking));
   
    return res;
};

export const updateBooking = (booking) => async dispatch => {
    const res = await csrfFetch(`/api/bookings/${booking.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(booking)
    });
    const data = await res.json();
    dispatch(addBooking(data.booking));
    
    return res;
}

export const deleteBooking = (bookingId) => async dispatch => {
    const res = await csrfFetch(`/api/bookings/${bookingId}`, {
        method: 'DELETE',
    });
    const data = await res.json();
    dispatch(removeBooking(data.booking));
    return res;
}

const bookingsReducer = (state = {}, action) => {
    Object.freeze(state)
    const newState = { ...state }
    switch(action.type) {
        case ADD_BOOKING:
            const booking = action.payload;
            newState[booking.id] = booking;
            return newState;
        case ADD_BOOKINGS:
            const bookings = action.payload;
            return { ...newState, ...bookings };
        case REMOVE_BOOKING:
            const bookingId = action.payload;
            delete newState[bookingId.id];
            return newState;
        default:
            return state;
    }
}


export default bookingsReducer;