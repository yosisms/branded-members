import React from 'react';
import Jumbo from '../Jumbo';

const About = () => {

    const jumboMessage = 'Branded Members is a project for a job interview.';

    return (
        <div>
            <Jumbo title="About Branded Message" message={jumboMessage} />
        </div>
    )
}

export default About
