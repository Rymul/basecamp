const ADD_USER = 'users/ADD_USER';
const ADD_USERS = 'users/ADD_USERS';

export const addUser = (user) => ({
    type: ADD_USER,
    payload: user
});

export const addUsers = (users) => ({
    type: ADD_USERS,
    payload: users
});

function usersReducer(state = {}, action) {
    Object.freeze(state);
    switch (action.type) {
        case ADD_USER:
            const user = action.payload;
            return { ...state, [user.id]: user };
        case ADD_USERS:
            const users = action.payload;
            return { ...state, ...users };
        default:
            return state;
  }
}

export default usersReducer;
