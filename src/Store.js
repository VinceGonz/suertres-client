import React from 'react';

import BetContextProvider from './context/BetContext'
import UserContextProvider from './context/UserContext'



const Store = ({children}) => {
    return <BetContextProvider>
        <UserContextProvider>
            {children}
        </UserContextProvider>
    </BetContextProvider>
}
 
export default Store;