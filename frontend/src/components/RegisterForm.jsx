import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import {useForm} from 'react-hook-form';

const RegisterForm = ({callUsersApi}) => {
    const history = useHistory();

    const {register, handleSubmit, errors} = useForm();
    const [isUsernameTaken, setIsUsernameTaken] = useState(null);

    const getDate = (dd, mm, yyyy) => {
        const date = new Date();
        const wantedDate = new Date(date.getFullYear() + yyyy, date.getMonth() + mm, date.getDate() + dd);
        return wantedDate;
    } 

    const onSubmit = (data, e) => {
        e.preventDefault();
        axios({
            method: 'POST',
            url: '/api/users/register',
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(data)
        }).then((respond) => {
            if(respond.data.isValid === false){
                // alert(respond.data.message);
                setIsUsernameTaken(respond.data.message);
            } else {
                callUsersApi();
                history.push('/login');
            }
        });
    }

    return (
        <div className="formContainer">
            <form onSubmit={handleSubmit(onSubmit)} className="form">
                <div className="form__group">
                    <input type="text" ref={register({ required: true })} className={`form__input ${errors.firstName && 'form__input--error'}`} name="firstName" placeholder="First nane" id="firstName" autoComplete="off" />
                    <label htmlFor="firstName" className="form__label">first name:</label>
                </div>
                <div className="form__group">
                    <input type="text" ref={register({ required: true })} className={`form__input ${errors.lastName && 'form__input--error'}`} name="lastName" placeholder="Last name" id="lastName" autoComplete="off" />
                    <label htmlFor="lastName" className="form__label">last name:</label>
                </div>
                <div className="form__group">
                    {isUsernameTaken && <p className="form__error--register">{isUsernameTaken}</p>}
                    <input type="text" ref={register({ required: true })} className={`form__input ${(errors.username || isUsernameTaken) && 'form__input--error'} `} name="username" placeholder="Username" id="username" autoComplete="off" />
                    <label htmlFor="username" className={`form__label ${(errors.username || isUsernameTaken) && 'form__label--error'} `}>username:</label>
                </div>
                <div className="form__group">
                    <input type="email" ref={register({ required: true })} className={`form__input ${errors.email && 'form__input--error'}`} name="email" placeholder="Email" id="email" autoComplete="off" />
                    <label htmlFor="email" className="form__label">email:</label>
                </div>
                <div className="form__group">
                    <input type="Password" ref={register({ required: true })} className={`form__input ${errors.password && 'form__input--error'}`}  name="password" placeholder="password" id="password" autoComplete="off" />
                    <label htmlFor="password" className="form__label">password:</label>
                </div>
                <div className="form__group">
                    <input type="date" ref={register({ required: true })} max={getDate(0, 0, -18).toLocaleDateString('fr-CA')} min={getDate(0, 0, -120).toLocaleDateString('fr-CA')} className={`form__input ${errors.dateOfBirth && 'form__input--error'}`} name="dateOfBirth" id="dateOfBirth" autoComplete="off" />
                    <label htmlFor="dateOfBirth" className="form__label">date of birth:</label>
                </div>
                <button type="submit" className="btn btn-lg btn-green">Register</button>
            </form>
        </div>
    )
}

export default RegisterForm
