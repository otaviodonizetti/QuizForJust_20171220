import React from 'react';

/**
 * Conditional Render
 * test: boolean value to render the childrens or not
 */

export default props => {
    if (props.test) {
        return props.children;
    } else {
        return false;
    };
};