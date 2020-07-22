import React,{createContext, useReducer} from 'react';
import userReducer from '../reducers/userReducer';

import {types} from '../types'


const {AUTHENTICATE_USER,UNAUTHENTICATE_USER} = types;

export const UserContext = createContext({});

const UserContextProvider = ({children}) => {

    const initialState = {
        isAuthenticated: false,
        userLoggedIn: {}
    }

    const [state,dispatch] = useReducer(userReducer,initialState, () => {
        let localStorageData = {
            isAuthenticated: JSON.parse(localStorage.getItem('isAuthenticated'))
        }
        return localStorageData.isAuthenticated ? {...initialState, isAuthenticated: localStorageData.isAuthenticated} : initialState
    });
    const {isAuthenticated, userLoggedIn} = state;


    const loginUser = async(userAccount) => {
        try {
            const response = await fetch('http://localhost:5000/auth/login', {
                method: 'POST',
                headers:{
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userAccount)
            })

            const result = await response.json();
            const {Message, User, token} = result;
            if(token){
                dispatch({type: AUTHENTICATE_USER, payload: {User, token}})
                localStorage.setItem('isAuthenticated', 'true')
                localStorage.setItem('user', JSON.stringify({fname: User.fname}))
                return token
            }
        } catch (error) {
            console.log('Failed to login user', error);
        }
    }

    const logoutUser = () => {
        dispatch({type: UNAUTHENTICATE_USER, payload: {}})
        localStorage.setItem('isAuthenticated', 'false');
        localStorage.setItem('user', JSON.stringify({}))
    }

    return <UserContext.Provider value={{isAuthenticated,userLoggedIn, loginUser, logoutUser}}>{children}</UserContext.Provider>
}
 
export default UserContextProvider;