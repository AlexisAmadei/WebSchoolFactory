import React from 'react';

import LineChart from '../components/graph/LineChart';
import Compteurs from '../components/graph/Compteurs';
import ProgressBar from '../components/graph/progressBar';
import FootAccordion from '../components/FootAccordion';

import Treemap from '../assets/graph/treemap.svg';
import data from '../data/linechart.json'
import './accueil.css';

export default function Accueil() {
    return (
        <div className='main-graph'>
            <div className='graph'>
                <div className='left-graph'>
                    <div className='break-line'>
                        <h2>KEA Positive Impact</h2>
                    </div>
                    <div className='treemap'>
                        <p>Pourcentages des cases majeures KPIC mobilisées</p>
                        <img src={Treemap} alt='treemap' />
                    </div>
                    <div className='progressBar'>
                        <ProgressBar />
                    </div>
                </div>
                <div className='right-graph'>
                    <div className='break-line'></div>
                    <p>Moyennes générales de progression - <span className='span-bold'>en général</span></p>
                    <div className='compteurs'>
                        <Compteurs />
                    </div>
                    {!!data &&
                        <div className='containerLine-chart'>
                            <div className="line-chart">
                                <LineChart data={data} />
                            </div>
                        </div>
                    }
                </div>
            </div>
            <div className='foot-accordion'>
                <FootAccordion
                    spname='BACULARD'
                    spsurname='Herve'
                    type='3'
                    client='CFAO'
                    projname='P-CFAO-Aftermarket...'
                    secteur='Distribution'
                    tribu='M&E'
                />
                <FootAccordion
                    spname='TABORIN'
                    spsurname='Bruno'
                    type='3'
                    client='Absolutely'
                    projname='P-ALDI-...'
                    secteur='Distribution'
                    tribu='Inno'
                />
            </div>
        </div>
    )
}
