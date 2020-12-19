import React from 'react';
import {Link} from 'react-router-dom';

const Jumbo = ({title, message}) => {
    return (
        <div className="jumbotron">
            <div className="jumbotron__back-icon">
                    <Link to='/' className="jumbotron__back-icon__link">&#8678; Go Back</Link> 
                </div>
            <h2 className="heading-secondary">{title}</h2>
            <p className="jumbotron__message">{message}</p>
        </div>
    )
}

export default Jumbo
