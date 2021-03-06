const initialState = {
    user: {}
};
const UPDATE_USER_DATA = "UPDATE_USER_DATA";

export function updateUserData(user) {
    return {
        type: UPDATE_USER_DATA,
        payload: user//user obj that got sent from the server ie req.sess.user
    }
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_USER_DATA:
            return Object.assign( {}, state, {user: action.payload})
        default:
            return state;
    }

}