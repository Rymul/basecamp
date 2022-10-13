import csrfFetch from "./csrf";
import { SET_CURRENT_USER } from "./session";
import { ADD_USER } from "./user";


export const ADD_BOOKING = 'bookings/ADD_BOOKING';
export const ADD_BOOKINGS = 'bookings/ADD_BOOKINGS';
export const REMOVE_BOOKING = 'bookings/REMOVE_BOOKINGS';
export const CLEAR_BOOKINGS = 'bookings/CLEAR_BOOKINGS'

const addBooking = booking => {
return { type: ADD_BOOKING,
    payload: booking }
};

export const addBookings = bookings => {
    // debugger
    return {
    type: ADD_BOOKINGS,
    payload: bookings }
    };
  
const removeBooking = bookingId => ({
    type: REMOVE_BOOKING,
    payload: bookingId
});

export const clearBookings = () => ({
    type: CLEAR_BOOKINGS,
    payload: {}
})


export const getBooking = bookingId => state => {
    if(!state) {
        return null;
    } else if (!state.bookings) {
        return null;
    } else {
        return state.bookings[bookingId]
    }
}

export const getBookings = state => {
    if(!state) {
        return [];
    } else if (!state.bookings) {
        return [];
    } else {
        return Object.values(state.bookings);
    }
}

export const fetchBooking = (bookingId) => async dispatch => {
    const res = await fetch(`/api/bookings/${bookingId}`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });
    if (res.ok) {
        const booking = await res.json();
        // dispatch(clearBookings());
        dispatch(addBooking(booking));
        
    }
}

export const fetchBookings = () => async dispatch => {
    const res = await fetch(`/api/bookings`,{
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });
    if (res.ok) {
        const bookings = await res.json();
        dispatch(addBookings(bookings));
    }
}

export const createBooking = (booking) => async dispatch => {
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
            if(action.payload.booking){
                const booking = action.payload.booking;
                newState[booking.id] = booking;
                return newState;

            }
            newState[action.payload.id] = action.payload
            return newState
            // const booking = action.payload.booking;
        case ADD_BOOKINGS:
            const bookings = action.payload.bookings;
            
            return { ...newState, ...bookings };
        case REMOVE_BOOKING:
            const bookingId = action.payload;
            delete newState[bookingId.id];
            return newState;
        // case SET_CURRENT_USER:
        //     return { ... action.payload.bookings}
        case CLEAR_BOOKINGS:
            return {};
        case ADD_USER:
            return { ... action.payload.bookings}
        default:
            return state;
    }
}


export default bookingsReducer;