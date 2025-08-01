import React from "react";

import ProgressBar from "@ramonak/react-progress-bar";

import "./progressBar.css";

const ProgressLeft = () => {
    return (
        <div className="main-progress">
            <div className="progress-title">
                <h2 style={{ fontSize: '16px' }}>Classement des secteurs en fonction du nombre de cases activée - 377 au total</h2>
            </div>
            <div className="progress-chart">
                <div className="progress-item">
                    <div className="progress-label">
                        <p>Distribution</p>
                        <p>126 activées</p>
                    </div>
                    <ProgressBar
                        completed={47}
                        bgColor="#AF0929"
                        baseBgColor="#e8e8e8"
                        isLabelVisible={false}
                        height="13px"
                    />
                </div>
                <div className="progress-item">
                    <div className="progress-label">
                        <p>Grande conso industrielle</p>
                        <p>93</p>
                    </div>
                    <ProgressBar
                        completed={40}
                        bgColor="#AF0929"
                        baseBgColor="#e8e8e8"
                        isLabelVisible={false}
                        height="13px"
                        margin="0 0 0 0"
                    />
                </div>
                <div className="progress-item">
                    <div className="progress-label">
                        <p>Autres</p>
                        <p>53</p>
                    </div>
                    <ProgressBar
                        completed={30}
                        bgColor="#AF0929"
                        baseBgColor="#e8e8e8"
                        isLabelVisible={false}
                        height="13px"
                        margin="0 0 0 0"
                    />
                </div>
                <div className="progress-item">
                    <div className="progress-label">
                        <p>Industrie</p>
                        <p>46</p>
                    </div>
                    <ProgressBar
                        completed={20}
                        bgColor="#AF0929"
                        baseBgColor="#e8e8e8"
                        isLabelVisible={false}
                        height="13px"
                        margin="0 0 0 0"
                    />
                </div>
                <div className="progress-item">
                    <div className="progress-label">
                        <p>Banque</p>
                        <p>30</p>
                    </div>
                    <ProgressBar
                        completed={15}
                        bgColor="#AF0929"
                        baseBgColor="#e8e8e8"
                        isLabelVisible={false}
                        height="13px"
                        margin="0 0 0 0"
                    />
                </div>
                <div className="progress-item">
                    <div className="progress-label">
                        <p>Telecom media</p>
                        <p>13</p>
                    </div>
                    <ProgressBar
                        completed={10}
                        bgColor="#AF0929"
                        baseBgColor="#e8e8e8"
                        isLabelVisible={false}
                        height="13px"
                        margin="0 0 0 0"
                    />
                </div>
                <div className="progress-item">
                    <div className="progress-label">
                        <p>Energie Construction Environnement</p>
                        <p></p>
                    </div>
                    <ProgressBar
                        completed={3}
                        bgColor="#AF0929"
                        baseBgColor="#e8e8e8"
                        isLabelVisible={false}
                        height="13px"
                        margin="0 0 0 0"
                    />
                </div>
            </div>
        </div>
    );
};
export default ProgressLeft;