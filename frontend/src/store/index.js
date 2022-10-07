import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import bookingsReducer from './booking';
import campsitesReducer from './campsite';
import filterReducer from './filters';
import reviewsReducer from './review';
import sessionReducer from './session';
import uiReducer from './ui';
import usersReducer from './user';



const rootReducer = combineReducers({
    session: sessionReducer,
    campsites: campsitesReducer,
    reviews: reviewsReducer,
    users: usersReducer,
    bookings: bookingsReducer,
    ui: uiReducer,
    filters: filterReducer
})

let enhancer;

if (process.env.NODE_ENV === 'production') {
    enhancer = applyMiddleware(thunk);
} else {
    const logger = require('redux-logger').default;
    const composeEnhancers =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState = {}) => {
    return createStore(rootReducer, preloadedState, enhancer);
}

export default configureStore;