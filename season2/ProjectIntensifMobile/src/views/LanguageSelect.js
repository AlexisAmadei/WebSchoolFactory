import React from "react";
import { Link } from "react-router-dom";

import "../css/langSelect.css"

import BasicSelect from "../components/dropdown";

export default function LanguageSelect({ handleLangSelect }) {
  const [retLang, setRetLang] = React.useState("");
  const [retLearnLang, setRetLearnLang] = React.useState("");
  const handleSubmit = () => {
    handleLangSelect(retLang, retLearnLang);
  }
  return (
    <div className="globalLangContainer">
      <div className="langContainer">
        <div className="learnLangSelect">
          <p>Langue native :</p>
          <div className="knowLangContainer">
            <BasicSelect
              label="Langue native"
              getReturnValue={(retLang) => {
                setRetLang(retLang);
              }}
            />
          </div>
        </div>
        <div style={{ height: "48px" }}></div>
        <div className="learnLangSelect">
          <p id="learnLangAsk" >Langue à apprendre :</p>
          <div className="learnLangContainer">
            <BasicSelect
              label="Langue à apprendre"
              getReturnValue={(retLearnLang) => {
                setRetLearnLang(retLearnLang);
              }}
            />
          </div>
        </div>
        <div className="langFooter">
          <div className="langSelectValidate">
            <button onClick={handleSubmit}>Valider</button>
          </div>
          <p className="returnToLogin">
            Déjà un compte ?
            <Link id="linkRouter" to="/security/login"> Se Connecter</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
