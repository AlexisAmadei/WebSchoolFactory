import React from "react";

import "./FootAccordion.css"
import AccorGreen from "../assets/accor-green.svg";
import ChevronDown from "../assets/chevron-down.svg";

export default function FootAccordion(props) {
    return (
        <div className="accordion-item">
            <div className="accordion-visible">
                <img src={AccorGreen} alt="accor-green" />
                <div className="accor-content">
                    <span id="sp-name">{props.spname}</span>
                    <span id="sp-surname">{props.spsurname}</span>
                    <span id="type">{props.type}</span>
                    <span id="client">{props.client}</span>
                    <span id="proj-name">{props.projname}</span>
                    <span id="secteur">{props.secteur}</span>
                    <span id="tribu">{props.tribu}</span>
                    <img id="clickArrow" src={ChevronDown} alt="chevron-down" />
                </div>
            </div>
        </div>
    );
}