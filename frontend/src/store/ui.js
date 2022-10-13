// const TOGGLE_LOGIN_MODAL = 'ui/TOGGLE_LOGIN_MODAL'
// const TOGGLE_HAMBURGER_MENU_MODAL = 'ui/TOGGLE_HAMBURGER_MENU_MODAL'
// const TOGGLE_CAMPSITE_DATES_MODAL = 'ui/TOGGLE_CAMPSITE_DATES_MODAL'
// const TOGGLE_CAMPSITE_GUESTS_MODAL = 'ui/TOGGLE_CAMPSITE_GUESTS_MODAL'
const TOGGLE_SEARCH_DATES_MODAL = 'ui/TOGGLE_SEARCH_DATES_MODAL'
const TOGGLE_SEARCH_GUESTS_MODAL = 'ui/TOGGLE_SEARCH_GUESTS_MODAL'
// const TOGGLE_BOOKING_PAGE_MODAL = 'ui/TOGGLE_BOOKING_PAGE_MODAL'
// const HIDE_ALL_BOOKINGS_PAGE_MODALS = 'ui/HIDE_ALL_BOOKINGS_PAGE_MODALS'

// export const toggleLoginModal = (value) => ({
//     type: TOGGLE_LOGIN_MODAL, payload:value
// })

// export const toggleHamburgerMenuModal = (value) => ({
//     type: TOGGLE_HAMBURGER_MENU_MODAL, payload: value
// })

// export const toggleCampsiteDatesModal = (value) => ({
//     type: TOGGLE_CAMPSITE_DATES_MODAL, payload: value
// })

// export const toggleCampsiteGuestsModal = (value) => ({
//     type: TOGGLE_CAMPSITE_GUESTS_MODAL, payload: value
// })

export const toggleSearchGuestModal = (value) => ({
    type: TOGGLE_SEARCH_GUESTS_MODAL, payload: value
})

export const toggleSearchDateModal = (value) => ({
    type: TOGGLE_SEARCH_DATES_MODAL, payload: value
})

// export const toggleBookingPageModal = (value, bookingId) => ({
//     type: TOGGLE_BOOKING_PAGE_MODAL, payload: {value, bookingId}
// })


// export const hideAllBookingsPageModals = () => ({
//     type: HIDE_ALL_BOOKINGS_PAGE_MODALS
// })
// const uiReducer = (state = { loginModal: false, hamburgerMenuModal: false, showCampsiteDatesModal: false, showCampsiteGuestsModal: false, showSearchDateModal: false, showSearchGuestModal: false, showBookingPageModal :null} , action) => {
const uiReducer = (state = { showSearchDateModal: false, showSearchGuestModal: false} , action) => {
    Object.freeze(state);
    const nextState = {...state};
    switch (action.type) {
        // case TOGGLE_LOGIN_MODAL:
        //     nextState['loginModal'] = action.payload;
        //     return nextState;
        // case TOGGLE_HAMBURGER_MENU_MODAL:
        //     nextState['hamburgerMenuModal'] = action.payload;
        //     return nextState;
        // case TOGGLE_CAMPSITE_DATES_MODAL:
        //     nextState['showCampsiteDatesModal'] = action.payload;
        //     return nextState;
        // case TOGGLE_CAMPSITE_GUESTS_MODAL:
        //     nextState['showCampsiteGuestsModal'] = action.payload;
        //     return nextState
        case TOGGLE_SEARCH_DATES_MODAL:
            nextState['showSearchDateModal'] = action.payload;
            return nextState;
        case TOGGLE_SEARCH_GUESTS_MODAL:
            nextState['showSearchGuestModal'] = action.payload;
            return nextState;
        // case TOGGLE_BOOKING_PAGE_MODAL:
        //     nextState['showBookingPageModal'] = {...nextState['showBookingPageModal'] , [action.payload.bookingId]:action.payload.value};
        //     return nextState
        // case HIDE_ALL_BOOKINGS_PAGE_MODALS:
        //     if (nextState['showBookingPageModal']) {
        //         Object.keys(nextState['showBookingPageModal']).forEach((key) => nextState.showBookingPageModal[key]= false)
        //     }
        //     return nextState
        default: 
            return nextState
    }
}

export default uiReducer;