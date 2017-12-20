import React from 'react';

import If from '../If/If';

import './ShareWhatsApp.css';

/**
 * Display the user's score
 * score: The user's score
 * testMobile: Check if userAgent is mobile
 */

export default props => {
    const text = `My current score on Marvel Quiz is: ${props.score}`;

    return (
        <If test={props.testMobile}>
            <a className="sharewhatsapp" href={`whatsapp://send?text=${text}`}
            data-action="share/whatsapp/share">{props.text}</a>
        </If>
    );
};