import {types} from '../types'


const {ADD_BET, SET_FLASH_MSG} = types;

const betReducer = (state, {type, payload}) => {
    switch(type){ 

        case ADD_BET:
            return {
                ...state,
                betList: [...state.betList, payload]
            }
            break;
        
        case SET_FLASH_MSG:
            return {
                ...state,
                flashMsg: payload
            }
            break;
        
        default:
            return {...state}
    }
}

export default betReducer;