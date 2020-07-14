import React,{useContext} from 'react';
import { UserContext } from '../../context/UserContext';

import {Route, Redirect} from 'react-router-dom'


const PrivateRoute = ({component: Component, ...rest}) => {
    const {isAuthenticated} = useContext(UserContext)
return <Route {...rest} component={props => isAuthenticated ? <Component {...props}/> : <Redirect to="/"/> }/>
}
 
export default PrivateRoute;