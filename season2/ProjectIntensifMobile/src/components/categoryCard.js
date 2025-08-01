import React from "react";
import "../css/CategoryCard.css";

const CategoryCard = (props) => {

  return (
    <div className="categoryCard" onClick={props.onClick}>
      <div className="imageWrapper">
        <img src={props.image} alt={props.category} />
      </div>
      <p>{props.category}</p>
    </div>
  );
};

export default CategoryCard;
