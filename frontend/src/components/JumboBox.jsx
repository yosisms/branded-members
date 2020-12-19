import React from 'react';
import {Link} from 'react-router-dom';

const JumboBox = ({header, message, link}) => {
    return (
        <div className="jumbobox">
            <header className="jumbobox__header">
                <h3 className="heading-tertiary">{header}</h3>
            </header>
            <main className="jumbobox__main">
                <p className="jumbobox__message">{message}</p>
            </main>
            <footer className="jumbobox__footer">
                <Link to={link.path} className="jumbobox__footer--link">{link.name} &#10174;</Link>
            </footer>
        </div>
    )
}

export default JumboBox
