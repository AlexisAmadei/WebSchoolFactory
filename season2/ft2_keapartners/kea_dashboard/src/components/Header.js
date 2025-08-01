import * as React from 'react';
import { Link } from 'react-router-dom';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';

import starButton from '../assets/Button-1.svg';
import dashButton from '../assets/Button.svg';
import bellButton from '../assets/Bell.svg';
import Plus from '../assets/Plus.svg';
import Export from '../assets/Export.svg';
import ButtonHeader from './ButtonHeader';
import "./Header.css"

const AppStyle = {
  backgroundColor: '#FFFFFF',
  boxShadow: 'none',
}

const pages = ['Dashboard', '/', 'Engagement'];

export default function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  return (
    <AppBar style={AppStyle} position="static">
      <Container maxWidth="xl" className='h-container'>
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <img className="icon-head" src={dashButton} alt='button'></img>
          <img className="icon-head" src={starButton} alt='button'></img>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Link to='/' className='nav-item'>Dashboard</Link>
            {/* <p className='nav-item' style={{opacity:"20%"}}>/</p> */}
            <Link to='/engagements' className='nav-item'>Engagement</Link>
          </Box>
          <img className='icon-head' src={bellButton} alt='bell button'></img>
          <ButtonHeader
            title="Nouvelle vue"
            src={Plus}
          />
          <ButtonHeader
            title="Exporter"
            src={Export}
          />
        </Toolbar>
      </Container>
    </AppBar>
  );
}