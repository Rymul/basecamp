
const RECEIVE_CAMPSITE = 'campsites/RECEIVE_CAMPSITE';
const RECEIVE_CAMPSITES = 'campsites/RECEIVE_CAMPSITES';

const receiveCampsite = (campsite) => ({
    type: RECEIVE_CAMPSITE,
    payload: campsite
});

const receiveCampsites = (campsites) => ({
    type: RECEIVE_CAMPSITES,
    payload: campsites
});


export const getCampsite = campsiteId => state => {
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


export const fetchCampsites = () => async dispatch => {
    const res = await fetch(`api/campsites`,{
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });
    if (res.ok) {
        const campsites = await res.json();
        // debugger
        dispatch(receiveCampsites(campsites));
    }
}

export const fetchCampsite = (campsiteId) => async dispatch => {
    const res = await fetch(`api/campsites/${campsiteId}`, {
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
            newState[action.campsite.id] = action.payload;
            return newState;
        case RECEIVE_CAMPSITES:
            newState[action.payload.id] = action.payload
            return newState;
        default:
            return state;
    }
}

export default campsitesReducer;