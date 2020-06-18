import React,{createContext} from 'react';


export const BetContext = createContext({});

const BetContextProvider = ({children}) => {
    return <BetContext.Provider value={{test: 'jim'}}>
        {children}
    </BetContext.Provider>
}
 
export default BetContextProvider;