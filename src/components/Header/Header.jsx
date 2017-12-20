import React from 'react';

import './Header.css';

export default props => (
    <div className="header">
        <div className="container">
            <a href="http://marvel.com/" className="header__logo">Marvel Logo</a>
            <h3 className="header__title">{props.title}</h3>
        </div>
    </div>
);