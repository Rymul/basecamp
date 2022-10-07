import { AiFillExclamationCircle } from "react-icons/ai";
import { ADD_BOOKING, ADD_BOOKINGS } from "./booking";


export const RECEIVE_CAMPSITE = 'campsites/RECEIVE_CAMPSITE';
const RECEIVE_CAMPSITES = 'campsites/RECEIVE_CAMPSITES';

export const receiveCampsite = (campsite) => {
    // debugger
    return {type: RECEIVE_CAMPSITE,
    payload: campsite}
};

const receiveCampsites = (campsites) => {
    return {
    type: RECEIVE_CAMPSITES,
    payload: campsites
    }
};


export const getCampsite = campsiteId => state => {
    if (!campsiteId) return state.campsites
    if(!state) {
        return null;
    } else if (!state.campsites) {
        return null;
    } else {
        return state.campsites[campsiteId];
    }
}

export const getCampsites = state => {
    if(!state) {
        return [];
    } else if (!state.campsites) {
        return [];
    } else {
        return Object.values(state.campsites);
    }
}

export const getCampsites2 = state => {
    if(!state) {
        return null;
    } else if (!state.campsites) {
        return null;
    } else {
        return state.campsites;
    }
}

export const getSearchedCampsites = (query) => async dispatch => {
    const res = await fetch(`api/campsites/search/${query}`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });
    if (res.ok) {
        const campsites = await res.json();
        dispatch(receiveCampsites(campsites))
    }
}


export const fetchCampsites = () => async dispatch => {
    const res = await fetch(`api/campsites`,{
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });
    if (res.ok) {
        const campsites = await res.json();
        dispatch(receiveCampsites(campsites));
    }
}

export const fetchCampsite = (campsiteId) => async dispatch => {
    const res = await fetch(`/api/campsites/${campsiteId}`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });
    if (res.ok) {
        const campsite = await res.json();
        dispatch(receiveCampsite(campsite));
        
    }
}


const campsitesReducer = (state = {}, action) => {
    // debugger
    Object.freeze(state)
    const newState = { ...state }
    switch (action.type) {
        case RECEIVE_CAMPSITE:
            newState[action.payload.campsite.id] = action.payload.campsite;
            return newState;
        case RECEIVE_CAMPSITES:
            return { ...newState, ...action.payload}
        case ADD_BOOKING:
            if (action.payload.booking){

                const campsite = action.payload.campsite;
                // const campsite = action.payload;
                // debugger
                newState[campsite.id] = campsite;
                return newState;
            }
            // const booking = action.payload;
            // debugger
            // newState[booking.id] = booking;
        case ADD_BOOKINGS:
            const campsites = action.payload.campsites;
            return { ...newState, ...campsites };
        default:
            return state;
    }
}

export default campsitesReducer;