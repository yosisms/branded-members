import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import {useForm} from 'react-hook-form';

const RegisterForm = ({logUser}) => {
    const history = useHistory();

    const {register, handleSubmit} = useForm();
    const [serverErrors, setServerErrors] = useState([]);
    const [firstNameError, setFirstNameError] = useState(undefined);
    const [lastNameError, setLastNameError] = useState(undefined);
    const [usernameError, setUsernameError] = useState(undefined);
    const [emailError, setEmailError] = useState(undefined);
    const [passwordError, setPasswordError] = useState(undefined);
    const [dateOfBirthError, setDateOfBirthError] = useState(undefined);

    useEffect(() => {
            setFirstNameError(serverErrors.find(err => err.param === 'firstName'));
            setLastNameError(serverErrors.find(err => err.param === 'lastName'));
            setUsernameError(serverErrors.find(err => err.param === 'username'));
            setEmailError(serverErrors.find(err => err.param === 'email'));
            setPasswordError(serverErrors.find(err => err.param === 'password'));
            setDateOfBirthError(serverErrors.find(err => err.param === 'dateOfBirth'));
    }, [serverErrors])

    const getDate = (dd, mm, yyyy) => {
        const date = new Date();
        const wantedDate = new Date(date.getFullYear() + yyyy, date.getMonth() + mm, date.getDate() + dd);
        return wantedDate;
    } 

    const onSubmit = (data, e) => {
        axios({
            method: 'POST',
            url: '/api/users/register',
            headers: {
                'Content-Type': 'application/json'
            },
            data: JSON.stringify(data)
        }).then((respond) => {
            if(respond.data){

                    setServerErrors(respond.data);
                if(respond.data[0].isValid === false){
                    setServerErrors(respond.data);
                }
            } else {
                logUser();
                history.push('/');
            }
        });
    }

    return (
        <div className="formContainer">
            <form onSubmit={handleSubmit(onSubmit)} className="form">
                <div className="form__group">
                    {firstNameError && <p className="form__error--register">{firstNameError.msg}</p>}
                    <input type="text" ref={register} className={`form__input ${(firstNameError) && 'form__input--error'} `} name="firstName" placeholder="First nane" id="firstName" autoComplete="off" />
                    <label htmlFor="firstName" className={`form__label ${(firstNameError) && 'form__label--error'} `}>first name:</label>
                </div>
                <div className="form__group">
                {lastNameError && <p className="form__error--register">{lastNameError.msg}</p>}
                    <input type="text" ref={register} className={`form__input ${(lastNameError) && 'form__input--error'} `} name="lastName" placeholder="Last name" id="lastName" autoComplete="off" />
                    <label htmlFor="lastName" className={`form__label ${(lastNameError) && 'form__label--error'} `}>last name:</label>
                </div>
                <div className="form__group">
                    {usernameError && <p className="form__error--register">{usernameError.msg}</p>}
                    <input type="text" ref={register} className={`form__input ${(usernameError) && 'form__input--error'} `} name="username" placeholder="Username" id="username" autoComplete="off" />
                    <label htmlFor="username" className={`form__label ${(usernameError) && 'form__label--error'} `}>username:</label>
                </div>
                <div className="form__group">
                    {emailError && <p className="form__error--register">{emailError.msg}</p>}
                    <input type="email" ref={register} className={`form__input ${(emailError) && 'form__input--error'} `} name="email" placeholder="Email" id="email" autoComplete="off" />
                    <label htmlFor="email" className={`form__label ${(emailError) && 'form__label--error'} `}>email:</label>
                </div>
                <div className="form__group">
                    {passwordError && <p className="form__error--register">{passwordError.msg}</p>}
                    <input type="Password" ref={register} className={`form__input ${passwordError && 'form__input--error'}`}  name="password" placeholder="password" id="password" autoComplete="off" />
                    <label htmlFor="password" className={`form__label ${(passwordError) && 'form__label--error'} `}>password:</label>
                </div>
                <div className="form__group">
                    {dateOfBirthError && <p className="form__error--register">{dateOfBirthError.msg}</p>}
                    <input type="date" ref={register} max={getDate(0, 0, -18).toLocaleDateString('fr-CA')} min={getDate(0, 0, -120).toLocaleDateString('fr-CA')} className={`form__input ${dateOfBirthError && 'form__input--error'}`} name="dateOfBirth" id="dateOfBirth" autoComplete="off" />
                    <label htmlFor="dateOfBirth" className={`form__label ${(dateOfBirthError) && 'form__label--error'} `}>date of birth:</label>
                </div>
                <button type="submit" className="btn btn-lg btn-green">Register</button>
            </form>
        </div>
    )
}

export default RegisterForm
