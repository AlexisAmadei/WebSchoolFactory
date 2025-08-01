import React from 'react'

import './Card.css'

export default function CompteursCard(props) {
    return (
        <div className='card'>
            <div className="card-title">
                <span>{props.title}</span>
            </div>
            <div className='card-body'>
                <span className="value">{props.value}</span>
                <span className="variation"><img src="/assets/arrow-up.svg" alt="variation"/> </span>
            </div>
        </div>
    )
}