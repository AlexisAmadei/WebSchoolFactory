import { React, useState} from 'react';

import PlusIcon from '../assets/Plus.svg';
import "./Dropdown.css";

const options = [
  { value: 'Ajouter la vue entière', label: 'Option 1' },
  { value: 'Ajouter un graphique', label: 'Option 2' },
];

export default function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [active, setActive] = useState(false);
  const rotate = () => {
    setRotation(rotation + 45);
  }
  const activeDropdown = () => {
    setActive(!active);
  };
  const handleOnClick = () => {
    rotate();
    activeDropdown();
    setIsOpen(!isOpen);
  }

  return (
    <div className="dropdown" >
      <button className={active ? "dropdown__button active" : "dropdown__button"}
        onClick={() => handleOnClick()} >
        <img className='svg_rotate' src={PlusIcon} alt=""
          style={{ transform: `rotate(${rotation}deg)` }}>
        </img>
      </button>
      {isOpen && (
        <div className="dropdown__content">
          {options.map((option) => (
            <div className="dropdown__option">
              {option.value}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}