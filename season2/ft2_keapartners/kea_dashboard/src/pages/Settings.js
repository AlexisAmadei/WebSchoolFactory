import React from "react";
import { Link } from "react-router-dom";

import Switch from '@mui/material/Switch';

import './Settings.css';

export default function Settings() {
    return (
        <div className="settings-container">
            <div>
                <h1>Paramètres</h1>
            </div>
            <div className="switch-container">
                <div className="switch-item">
                    <p>Changer le thème</p>
                    <Switch />
                </div>
                <div className="switch-item">
                    <p>Autoriser les notifications</p>
                    <Switch />
                </div>
                <div className="switch-item">
                    <p>Sauvegarder automatiquement les modifications</p>
                    <Switch />
                </div>
                <div className="switch-item">
                    <p>Mode avion</p>
                    <Switch />
                </div>
                <div className="switch-item">
                    <p>Activer la localisation</p>
                    <Switch />
                </div>
            </div>
            <div className="back-home">
                <Link to='/'>Retour à l'accueil</Link>
            </div>
        </div>
    )
}