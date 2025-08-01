import React from 'react';

import './ButtonHeader.css'

function ButtonHeader(props) {
    return (
        <div className="button-header">
            <button className="button-header__button">
                <img src={props.src} alt="error"></img>{props.title}
            </button>
        </div>
    );
}
export default ButtonHeader;