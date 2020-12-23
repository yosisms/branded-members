import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import {useForm} from 'react-hook-form';

const LoginForm = ({logUser}) => {
    const history = useHistory();
    const {register, handleSubmit, errors} = useForm();
    const [error, setError] = useState(null);

    const onSubmit = (data) => {
        axios({
            method: 'POST',
            url: '/api/login',
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(data)
        }).then((respond, err) => {
            err && console.log(err);
            if(respond) {
                logUser();
                history.push('/');
            } else {
                setError('username or password is incorrect');
            }
        });
    }
    return (
        <div className="formContainer">
            <form onSubmit={handleSubmit(onSubmit)} className="form">
                {error && <p className="form__error">{error}</p>}
                <div className="form__group">
                    <input type="text" ref={register({ required: true })} className={`form__input ${errors.username && 'form__input--error'}`} name="username" placeholder="Username" id="username" autoComplete="off" />
                    <label htmlFor="username" className="form__label">username:</label>
                </div>
                <div className="form__group">
                    <input type="Password" ref={register({ required: true })} className={`form__input ${errors.password && 'form__input--error'}`}  name="password" placeholder="password" id="password" autoComplete="off" />
                    <label htmlFor="password" className="form__label">password:</label>
                </div>
                <button type="submit" className="btn btn-lg btn-green">Log In</button>
            </form>
        </div>
    )
}

export default LoginForm
