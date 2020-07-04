import {types} from '../types'


const {ADD_BET, SET_BET_LIST, SET_FLASH_MSG, SET_SELECTED_DRAW_TIME, SET_SELECTED_DATE, SET_WINNING_INFO, DELETE_BET_NUMBER} = types;

// const initialState = {
//     betList: [],
//     suertresData: {},
//     flashMsg: {msgType: 'success', msgText: ''},
//     selectedDrawTime: "4",
//     selectedDate: new Date(),
//     winningInfo: {number: null, draw: '11', date: moment(new Date()).format("MM-DD-YYYY")}
// }

const betReducer = (state, {type, payload}) => {
    switch(type){ 

        case ADD_BET:
            return {
                ...state,
                betList: [...state.betList, payload]
            }
            break;

        case SET_BET_LIST:{
            return {
                ...state,
                betList: payload

            }
        }
        
        case SET_FLASH_MSG:
            return {
                ...state,
                flashMsg: payload
            }
            break;
        
        case SET_SELECTED_DRAW_TIME:
            console.log('test',payload)
            return {
                ...state,
                selectedDrawTime: payload
            }
            break;

        case SET_SELECTED_DATE:
            return {
                ...state,
                selectedDate: payload
            }
            break;

        case SET_WINNING_INFO:
            return {
                ...state,
                winningInfo: {...state.winningInfo, payload}
            }
            break;
        
        case DELETE_BET_NUMBER:
            return {
                ...state,
                betList: state.betList.filter(bet => bet.list_id !== payload)
            }
            break;
        
        default:
            return {...state}
    }
}

export default betReducer;