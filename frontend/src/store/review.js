import { BsNutFill } from 'react-icons/bs';
import { receiveCampsite, RECEIVE_CAMPSITE } from './campsite';
import csrfFetch from './csrf'
import { addUser } from './user';


const ADD_REVIEW = 'reviews/ADD_REVIEW';
const ADD_REVIEWS = 'reviews/ADD_REVIEWS';
const REMOVE_REVIEW = 'reviews/REMOVE_REVIEWS';
export const CLEAR_REVIEWS = 'bookings/CLEAR_REVIEWS'

const addReview = review => ({
    type: ADD_REVIEW,
    payload: review
});

export const addReviews = reviews => ({
    type: ADD_REVIEWS,
    payload: reviews
});
  
const removeReview = reviewId => ({
    type: REMOVE_REVIEW,
    payload: reviewId
});

export const clearReviews = () => ({
    type: CLEAR_REVIEWS,
    payload: {}
})


  
export const getCampsiteReviews = campsiteId => state => {
    return Object.values(state.reviews)
        .filter(review => review.campsiteId === parseInt(campsiteId))
        .map(review => ({
            ...review
        }))
}


export const getReview = reviewId => state => {
    if(!state) {
        return null;
    } else if (!state.reviews) {
        return null;
    } else {
        return state.reviews[reviewId]
    }
}


export const createReview = (review) => async dispatch => {
    const res = await csrfFetch('/api/reviews', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(review)
    });
    const data = await res.json();
    dispatch(addReview(data.review));
   
    return res;
};

export const updateReview = (review) => async dispatch => {
    const res = await csrfFetch(`/api/reviews/${review.id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(review)
    });
    const data = await res.json();
    dispatch(addReview(data.review));
    
    return res;
}

export const deleteReview = (reviewId) => async dispatch => {
    const res = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE',
    });
    const data = await res.json();
    dispatch(removeReview(data.review));
    return res;
}

const reviewsReducer = (state = {}, action) => {
    Object.freeze(state)
    const newState = { ...state }
    switch (action.type) {
        case ADD_REVIEW:
            const review = action.payload;
            newState[review.id] = review;
            return newState;
        case ADD_REVIEWS:
            const reviews = action.payload;
            return { ...newState, ...reviews };
        case REMOVE_REVIEW:
            const reviewId = action.payload;
            delete newState[reviewId.id];
            return newState;
        case CLEAR_REVIEWS:
            return {};
        case RECEIVE_CAMPSITE:
            return { ...action.payload.reviews }
        default:
            return state;
    }
}

export default reviewsReducer;
