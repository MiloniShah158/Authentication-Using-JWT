import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({component:Component,...rest}) => {
    return( 
    <Route 
    {...rest}
    rednder={(props)=>{
        localStorage.getItem("authToken")?(
            <Component {...props}/>
        ):(
            <Redirect to="/login"/>
        );
    }}/>
    );

};

export default PrivateRoute;