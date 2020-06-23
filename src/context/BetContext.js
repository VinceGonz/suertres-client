import React,{createContext, useReducer} from 'react';

import betReducer from '../reducers/betReducer'

import {types} from '../types'


export const BetContext = createContext({});

const BetContextProvider = ({children}) => {
    const initialState = {
        betList: [],
        suertresData: {},
        flashMsg: {msgType: 'success', msgText: ''},
    }
    
    const {ADD_BET, SET_FLASH_MSG} = types;

    const [state,dispatch] = useReducer(betReducer, initialState);

    const {betList, suertresData, flashMsg} = state;



    const addNewBet = (newBetData) => {
        dispatch({type: ADD_BET, payload: newBetData});

    }

    const setFlashMsg = (msgData) => {
        dispatch({type: SET_FLASH_MSG, payload: msgData});
    }

    return <BetContext.Provider value={{ addNewBet, betList, flashMsg, setFlashMsg}}>
        {children}
    </BetContext.Provider>
}
 
export default BetContextProvider;