import React, { useState, useEffect, useCallback } from "react";

import CategoryCard from "../components/categoryCard";
import gamingIcon from "../assets/gamingIcon.svg";
import musicIcon from "../assets/musicIcon.svg";
import cinemaIcon from "../assets/cinemaIcon.svg";
import cookingIcon from "../assets/cookingIcon.svg";
import sportIcon from "../assets/sportIcon.svg";
import modeIcon from "../assets/modeIcon.svg";

import "../css/CenterSelect.css";

export default function CenterSelect({ handleCenterSelect }) {
  const [center, setCenter] = useState(null);

  const handleSubmit = useCallback(() => {
    handleCenterSelect(center);
  }, [center, handleCenterSelect]);

  useEffect(() => {
    if (center !== null) {
      handleSubmit();
    }
  }, [center, handleSubmit]);


  const handleCategorySelect = (category) => {
    setCenter(category);
  };

  return (
    <div className="globalCenterContainer">
      <div className="centerContainer">
        <div className="centerHeader">
          <h1>Partage ce que tu aimes</h1>
          <p>Selectionnes un thème qui t'interesses</p>
        </div>
        <div className="categoryContainer">
          <CategoryCard
            image={gamingIcon}
            category="Jeux-vidéos"
            onClick={() => handleCategorySelect("Jeux-vidéos")}
          />
          <CategoryCard
            image={musicIcon}
            category="Musique"
            onClick={() => handleCategorySelect("Musique")}
          />
          <CategoryCard
            image={cinemaIcon}
            category="Cinéma"
            onClick={() => handleCategorySelect("Cinéma")}
          />
          <CategoryCard
            image={cookingIcon}
            category="Cuisine"
            onClick={() => handleCategorySelect("Cuisine")}
          />
          <CategoryCard
            image={sportIcon}
            category="Sport"
            onClick={() => handleCategorySelect("Sport")}
          />
          <CategoryCard
            image={modeIcon}
            category="Mode"
            onClick={() => handleCategorySelect("Mode")}
          />
        </div>
      </div>
      <div className="centerFooter">
        <div className="centerSelectValidate">
          <button onClick={handleSubmit}>Valider</button>
        </div>
      </div>
    </div>
  );
}
