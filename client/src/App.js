import { BrowserRouter as Route, Switch, Route } from 'react-router-dom'
import { Router } from 'express';
const App = () => {
    return ( <
        div className = "App" > React App < /div> <
        Router >
        <
        div className = "app" >
        <
        Switch >
        <
        Route exact path = "/login"
        component = { LoginScreen }
        /> <
        Route exact path = "/register"
        component = { RegisterScreen }
        /> <
        Route exact path = "/forgotpassword"
        component = { ForgotPasswordScreen }
        /> <
        Route exact path = "/passwordreset/:resetToken"
        component = { ResetPasswordScreen }
        />

        <
        /Switch> <
        /div> <
        /Router>
    )

};

export default App;