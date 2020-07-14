import {types} from '../types'


const {AUTHENTICATE_USER, UNAUTHENTICATE_USER} = types;


const userReducer = (state, {type, payload}) => {
    switch(type){
        case AUTHENTICATE_USER:
            return {
                ...state,
                isAuthenticated: true,
                userLoggedIn: {...state.userLoggedIn, ...payload.User}
            }
            break;
        
        case UNAUTHENTICATE_USER:
            return {
                ...state,
                isAuthenticated: false,
                userLoggedIn: {}
            }

        default:
            return {...state}
    }
}

export default userReducer;