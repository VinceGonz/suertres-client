import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import {Route, Redirect} from 'react-router-dom'



const PublicRoute = ({component: Component, ...rest}) => {
    const {isAuthenticated} = useContext(UserContext)
    return <Route {...rest} component={props => isAuthenticated ? <Redirect to="/dashboard" /> : <Component {...props}/>}/>
}
 
export default PublicRoute;