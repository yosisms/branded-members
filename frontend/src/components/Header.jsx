import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import axios from 'axios';

const Header = ({loggedUser, setLoggedUser}) => {

    const history = useHistory();

    const logout= () => {
        axios.get('/api/logout')
            .then((res, err) => {
                err && console.log(err);
            });
            setLoggedUser(false);
            history.push('/');
    }

    return (
        <header className="header">
            <div className="header__logo-box">
                <Link to='/'><h1 className="heading-primary">Branded Members</h1></Link>
            </div>
            {loggedUser ? (
                <div className="header__user-box">
                    <h4 className="heading-quaternary">Hello {loggedUser.firstName}!</h4>
                    <div>To log out:<button onClick={logout} className="btn-reset header__user-box--link">Log out</button></div>
                    {/* <div>To log out:<Link to='/' className="header__user-box--link" onClick={logout}>Log out</Link></div> */}
                </div>
                ) : (
                    <div className="header__user-box">
                        <h4 className="heading-quaternary">hello user</h4>
                        <div>
                            Please <Link to='/login' className="header__user-box--link">Log in</Link> or  <Link to='/register' className="header__user-box--link">Register</Link>
                        </div>
                    </div>
                )}
        </header>
    )
}

export default Header
