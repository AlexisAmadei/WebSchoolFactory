import React from "react";

import todolist from "../assets/graph/todolist.svg"
import ranked from "../assets/graph/ranked.svg"

import './Engagements.css'

export default function Engagements() {
    return (
        <div className="container-engagement">
            <h1>Mes Fiches impacts</h1>
            <img className="img" src={todolist} alt="dataviz"></img>
            <img className="img" src={ranked} alt="dataviz"></img>
        </div>
    );
}