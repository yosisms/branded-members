import React, {useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import Jumbo from '../Jumbo';
import RegisterForm from '../RegisterForm';

const Register = ({callUsersApi, loggedUser}) => {
    const history = useHistory();

    useEffect(()=> {
        if(loggedUser !== null) {
            history.push('/');
        }
    })

    const jumboMessage = 'Welcome! We are so glad that you chose to join our team in Branded Members! \n Please fill the form below:'

    return (
        <div>
            <Jumbo title="Register" message={jumboMessage} />
            <RegisterForm callUsersApi={callUsersApi} /> 
        </div>
    )
}

export default Register
