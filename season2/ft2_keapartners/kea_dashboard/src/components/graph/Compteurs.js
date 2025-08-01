import React from "react";

import Card from './Card'

export default function Compteurs(props) {
    return (
        <div className='box-compteur'>
            <div className='card-container'>
                <Card title='Moy. initiale' value='1.3' />
                <Card title='Moy. ambition' value='+2.4pts' />
                <Card title='Moy. réalisation' value='+1.5pts' />
            </div>
        </div>
    )
}