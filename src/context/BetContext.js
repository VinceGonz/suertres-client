import React,{createContext, useReducer} from 'react';
import moment from "moment";


// ! Reducers
import betReducer from '../reducers/betReducer'


import {types} from '../types'




export const BetContext = createContext({});


const BetContextProvider = ({children}) => {
    const initialState = {
        betList: [],
        suertresData: {},
        flashMsg: {msgType: 'success', msgText: ''},
        selectedDrawTime: "11",
        selectedDate: new Date()
    }
    
    const {ADD_BET, SET_FLASH_MSG, SET_SELECTED_DRAW_TIME, SET_SELECTED_DATE} = types;

    const [state,dispatch] = useReducer(betReducer, initialState);

    const {betList, suertresData, flashMsg, selectedDrawTime, selectedDate} = state;



    const addNewBet = (newBetData) => {
        dispatch({type: ADD_BET, payload: newBetData});

    }

    const setFlashMsg = (msgData) => {
        dispatch({type: SET_FLASH_MSG, payload: msgData});
    }

    const setSelectedDrawTime = (drawTime) => {
        dispatch({type: SET_SELECTED_DRAW_TIME, payload: selectedDrawTime});
    }

    const setSelectedDate = (selectedDate) => {
        dispatch({type: SET_SELECTED_DATE, payload: selectedDate})
    }

    return <BetContext.Provider value={{ addNewBet, betList, flashMsg, setFlashMsg, selectedDrawTime, selectedDate, setSelectedDrawTime, setSelectedDate}}>
        {children}
    </BetContext.Provider>
}
 
export default BetContextProvider;