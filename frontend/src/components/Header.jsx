import React from 'react';
import {Link} from 'react-router-dom';

const Header = ({loggedUser, setLoggedUser}) => {
    return (
        <header className="header">
            <div className="header__logo-box">
                <Link to='/'><h1 className="heading-primary">Branded Members</h1></Link>
            </div>
            {loggedUser ? (
                <div className="header__user-box">
                    <h4 className="heading-quaternary">Hello {loggedUser.firstName}!</h4>
                            <div>To log out: <Link to='/' onClick={()=>setLoggedUser(null)} className="header__user-box--link">Log out</Link></div>
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
