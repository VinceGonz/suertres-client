import {types} from '../types'


const {ADD_BET, SET_FLASH_MSG, SET_SELECTED_DRAW_TIME, SET_SELECTED_DATE} = types;

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
        
        case SET_SELECTED_DRAW_TIME:
            return {
                ...state,
                selectedDrawtime: payload
            }
            break;

        case SET_SELECTED_DATE:
            return {
                ...state,
                selectedDate: payload
            }
            break;
        
        default:
            return {...state}
    }
}

export default betReducer;