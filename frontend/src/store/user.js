

export const ADD_USER = 'users/ADD_USER';
export const ADD_USERS = 'users/ADD_USERS';

export const addUser = (user) => ({
    type: ADD_USER,
    payload: user
});

export const addUsers = (users) => ({
    type: ADD_USERS,
    payload: users
});

export const getUser = (userId) => state => {
    if(!state) {
        return null;
    } else if (!state.users) {
        return null;
    } else {
        return state.users[userId];
    }
}

export const fetchUser = (userId) => async dispatch => {
    const res = await fetch(`/api/users/${userId}`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    });
    if (res.ok) {
        const user = await res.json();
        dispatch(addUser(user));
        
    }
}

function usersReducer(state = {}, action) {
    Object.freeze(state);
    switch (action.type) {
        case ADD_USER:
            const user = action.payload.user;
            return { ...state, [user.id]: user };
        case ADD_USERS:
            const users = action.payload;
            return { ...state, ...users };
        default:
            return state;
  }
}

export default usersReducer;
