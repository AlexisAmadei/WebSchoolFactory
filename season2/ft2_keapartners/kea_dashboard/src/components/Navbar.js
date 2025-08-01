import React from 'react';
import { Link } from 'react-router-dom';

import "./Navbar.scss"

export default function Navbar() {
    return (
        <div className="nav-slider">
            <nav>
                <ol>
                    <li><Link to={'/'}>Mon Entreprise</Link></li>
                    <li><Link to={'/objectifs'}>Kea Objectifs</Link></li>
                    <li><Link to={'/engagements'}>Engagement</Link></li>
                </ol>
                <span className="slider"></span>
            </nav>
        </div>
    );
}
