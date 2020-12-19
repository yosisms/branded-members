import React from 'react';
import JumboBox from './JumboBox';

const UserActionJumbo = ({loggedUser}) => {
    if (loggedUser) {
        return (
            <div className="jumbotron">
                <h2 className="heading-secondary">Hello {loggedUser.firstName}!</h2>
                <div className="row">
                    <div className="col-1-of-3">
                        <JumboBox header="About Us" message="Want to read more about Branded Members?" link={{name: 'Read more', path: '/about'}} />
                    </div>
                    <div className="col-1-of-3">
                        <JumboBox header="Members" message="List of all of the members in Branded Members." link={{name: 'Members', path: '/members'}} />
                    </div>
                    <div className="col-1-of-3">
                    </div>
                </div>
            </div>
        ) 
    } else {
        return (
            <div className="jumbotron">
                <h2 className="heading-secondary">Welcome to Branded Members!</h2>
                <div className="row">
                    <div className="col-1-of-3">
                        <JumboBox header="About Us" message="Want to read more about Branded Members?" link={{name: 'Read more', path: '/about'}} />
                    </div>
                    <div className="col-1-of-3">
                        <JumboBox header="Log in" message="Are you a member in Branded Members? please login." link={{name: 'Log in', path: '/login'}} />
                    </div>
                    <div className="col-1-of-3">
                        <JumboBox header="Register" message="Are you not a member? No problem! sign up now for free!" link={{name: 'Register', path: '/register'}} />
                    </div>
                </div>
            </div>
        )
    }
}

export default UserActionJumbo