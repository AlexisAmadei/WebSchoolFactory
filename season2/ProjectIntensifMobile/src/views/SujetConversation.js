import * as React from 'react';

import { Link } from 'react-router-dom';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import "../css/HomePage.css"

export default function SujetConversation() {
  return (
    <div className="globalThemeContainer">
      <div className='dropdownthemeContainer'>
        <p>De quoi voulez-vous parler ?</p>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Sujet de conversation</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="sujet de conversation"
            >
              <MenuItem value="sport">sport</MenuItem>
            </Select>
          </FormControl>
      </div>
      <div className='validateButtonContainer'>
        <button>
          <Link id='linkrouter' to='/home'>Valider</Link>
        </button>
      </div>
    </div>
  );
}
