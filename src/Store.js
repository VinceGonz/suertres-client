import React from 'react';

import BetContextProvider from './context/BetContext'



const Store = ({children}) => {
    return <BetContextProvider>
        {children}
    </BetContextProvider>
}
 
export default Store;