import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import useWindowWidth from '../utils/WindowWidth';
import '../css/dropdown.css'

export default function BasicSelect({ label, getReturnValue }) {
  const [nativeLang, setNativeLang] = React.useState('');
  const WindowWidth = useWindowWidth();

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setNativeLang(selectedValue);
    getReturnValue(selectedValue);
  };

  const styles = {
    minWidth: (WindowWidth * 0.8),
  }

  return (
    <Box sx={{ minWidth: styles }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={nativeLang}
          label={label}
          onChange={handleChange}
        >
          <MenuItem value="frLang">Français</MenuItem>
          <MenuItem value="enLang">Anglais</MenuItem>
          <MenuItem value="esLang">Espagnol</MenuItem>
          <MenuItem value="deLang">Allemand</MenuItem>
          <MenuItem value="itLang">Italien</MenuItem>
          <MenuItem value="ptLang">Portugais</MenuItem>
          <MenuItem value="ruLang">Russe</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
