import React, { useEffect } from 'react';
import {useHistory} from 'react-router-dom';
import Jumbo from '../Jumbo';
import LoginForm from '../LoginForm';

const Login = ({logUser, loggedUser}) => {
    const history = useHistory();

    useEffect(()=> {
        if(loggedUser) {
            history.push('/');
        }
    })

    const jumboMessage = 'Hello user! Please login to continue.'

    return (
        <div>
            <Jumbo title="Login" message={jumboMessage} />
            <LoginForm logUser={logUser} />
        </div>
    )
}

export default Login
    