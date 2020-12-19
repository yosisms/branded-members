import React from 'react';
import UserActionJumbo from '../UserActionJumbo';

const Home = ({loggedUser}) => {
    return (
        <div>
            <UserActionJumbo loggedUser={loggedUser} />
        </div>
    )
}

export default Home
