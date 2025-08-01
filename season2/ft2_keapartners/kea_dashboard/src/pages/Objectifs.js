import React from "react";

import ProgressBar from "@ramonak/react-progress-bar";
import BarChart from '../components/graph/BarChart';

import data from '../data/barchart.json'
import ObjGauge from '../assets/ObjGauge.svg';
import Mood from '../assets/mood.svg';
import Fidel from '../assets/Fidel.svg';
import FootGraph from '../assets/FootGraph.svg';
import "./Objectifs.css";

export default function Objectifs() {
    return (
        <div className="main-objectifs">
            <div className="gauge-chart">
                <p>Objectifs 2022</p>
                <img src={ObjGauge} alt="objectif-gauge" />
            </div>
            <div className="obj-results">
                <div style={{ marginRight: '16px' }}>
                    <span>Résultats</span>
                    <div className="obj-barChart">
                        <BarChart data={data} />
                    </div>
                </div>
                <div className="container-pgbar">
                    <span>haha la dataviz</span>
                    <div className="container-progress-bar">
                        <h2>Fiches impact réalisées</h2>
                        <div>
                            <ProgressBar
                                completed={75}
                                bgColor="#AF0929"
                                baseBgColor="#E0E0E0"
                                labelColor="white"
                                labelAlignment="center"
                            />
                        </div>
                    </div>
                    <div className="container-mood-fidel">
                        <div className="container-mood">
                            <div className="mood-face">
                                <img src={Mood} alt="mood" />
                            </div>
                        </div>
                        <img src={Fidel}></img>
                    </div>
                </div>
            </div>
            <img id="foot-graph" src={FootGraph} alt="foot-graph" />
        </div>
    );
}