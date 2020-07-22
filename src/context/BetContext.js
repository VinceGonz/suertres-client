import React,{createContext, useReducer, useEffect} from 'react';
import moment from "moment";


// ! Reducers
import betReducer from '../reducers/betReducer'

import {types} from '../types'

export const BetContext = createContext({});

const BetContextProvider = ({children}) => {
    const initialState = {
        betList: [],
        suertresData: {},
        flashMsg: {msgType: '', msgText: ''},
        selectedDrawTime: "11",
        selectedDate: new Date(),
        winningInfo: {number: null, draw: '11', date: moment(new Date()).format("MM-DD-YYYY")},
        isLoading: false,
    }
    
    const {ADD_BET,SET_BET_LIST, SET_FLASH_MSG, SET_SELECTED_DRAW_TIME, SET_SELECTED_DATE,SET_WINNING_INFO, DELETE_BET_NUMBER, SET_IS_LOADING,UPDATE_BET, UPDATE_INDIVIDUAL_BET,DELETE_INDIVIDUAL_BET} = types;

    const [state,dispatch] = useReducer(betReducer, initialState, () => {
        const localDataStorage = {
            betList: localStorage.getItem('betList'),
        }

        return localDataStorage.betList ? {...initialState, betList: JSON.parse(localDataStorage.betList) || []} : initialState
    });

    // const [state,dispatch] = useReducer(betReducer, initialState);

    const {betList, suertresData, flashMsg, selectedDrawTime, selectedDate, winningInfo} = state;


    useEffect(() => {
        localStorage.setItem('betList', JSON.stringify(betList))
    },[betList])


    const addNewBet = async (newBetData) => {
        dispatch({type: ADD_BET, payload: newBetData});
        try{
            // ! for production endpoint
            // https://suertres-api-v2.herokuapp.com/api/betsRoute/addBet
            const response = await fetch('http://localhost:5000/api/bets/addBet', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newBetData),
            });
        const result = await response.json();
        }catch(err){
            console.log(err)
        }
    }

    const deleteBetNumber = async (id) => {
        dispatch({type: DELETE_BET_NUMBER, payload: id});
        try {
            const response = await fetch(`http://localhost:5000/api/bets/deleteNumber/${id}`,{
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const result = await response.json();
        } catch (error) {
            console.log(error)
        }
    }

    const updateBetData = async (bet) => {
        let formatedBet = {...bet, date: moment(bet.date).format("MM-DD-YYYY")}
        dispatch({type: UPDATE_BET, payload: formatedBet});
        try {
            const response = await fetch(`http://localhost:5000/api/bets/updateBet/${formatedBet.bets_id}`,{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formatedBet)
            });
            const result = await response.json();
        } catch (error) {
            console.log(error)
        }
    }

    const getAllBets = async () => {
        dispatch({type: SET_BET_LIST, payload: JSON.parse(localStorage.getItem('betList')) || []})
        try {
            // ! for production endpoint
            // https://suertres-api-v2.herokuapp.com/api/betsRoute/getAllBets   
            const response = await fetch(`http://localhost:5000/api/bets/getAllBets`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            const result = await response.json();
            dispatch({type: SET_BET_LIST, payload: result.bets})
            localStorage.setItem(
                "betList",
                JSON.stringify(result.bets)
              );
        } catch (error) {
            console.log(error)
        }
    }

    const setIsLoading = (bool) => {
        dispatch({type: SET_IS_LOADING, payload: bool})
    }

    const setFlashMsg = (msgData) => {
        dispatch({type: SET_FLASH_MSG, payload: msgData});
    }

    const setSelectedDrawTime = (drawTime) => {
        dispatch({type: SET_SELECTED_DRAW_TIME, payload: drawTime});
    }

    const setSelectedDate = (selectedDate) => {
        dispatch({type: SET_SELECTED_DATE, payload: selectedDate})
    }

    const setWinningInfo = (info) => {
        dispatch({type: SET_WINNING_INFO, payload: info})
    }

    return <BetContext.Provider value={{ addNewBet, betList, flashMsg, setFlashMsg, selectedDrawTime, selectedDate, setSelectedDrawTime, setSelectedDate, setWinningInfo,winningInfo, getAllBets, deleteBetNumber,setIsLoading,updateBetData}}>
        {children}
    </BetContext.Provider>
}
 
export default BetContextProvider;