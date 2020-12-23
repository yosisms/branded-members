import React from 'react';
import Jumbo from '../Jumbo';
import UsersTable from '../UsersTable';

const Members = ({loggedUser}) => {
    const jumboMessage = loggedUser ? 'Here you can see all of the members in Branded Members:' : 'You need to sign in be able to see this page content.'

    if(loggedUser) {
        return (
            <div>
                <Jumbo title='Branded Members' message={jumboMessage} />
                <UsersTable />
            </div>
        )
    } else {
        return (
            <Jumbo title='Ops!' message={jumboMessage} />
        )
    }
}

export default Members
