import React from 'react';

import './Button.css';

/**
 * Button component:
 * type: The button type
 * disabled: To disable the button
 * text: The button's text
 * onClick: Handle the click action
 */

export default props => {
    // Add the class to the button
    const button_class = props.type ? `button--${props.type}` : '';

    return (
        <button disabled={props.disabled} className={`button ${button_class}`} onClick={props.onClick}>
            {props.text}
        </button>
    )
}