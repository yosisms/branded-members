import React, { useEffect } from 'react';
import {useHistory} from 'react-router-dom';
import Jumbo from '../Jumbo';
import LoginForm from '../LoginForm';

const Login = ({setLoggedUser, loggedUser}) => {
    const history = useHistory();

    useEffect(()=> {
        if(loggedUser !== null) {
            history.push('/');
        }
    })

    const jumboMessage = 'Hello user! Please login to continue.'

    return (
        <div>
            <Jumbo title="Login" message={jumboMessage} />
            <LoginForm setLoggedUser={setLoggedUser} />
        </div>
    )
}

export default Login
    