import PropTypes from 'prop-types';
import { AppBar, Toolbar, Typography, useMediaQuery } from '@material-ui/core';
import MaterialUISwitch from './toggleButton/Toggle';
import './styles.css';

const Header = ({ toggleDarkMode, darkMode }) => {
  const prefersSmallScreen = useMediaQuery('(max-width:600px)'); // Check if screen width is less than 600px
  
  return (
    <AppBar position="static" className="app-bar">
      <Toolbar>
        {/* Use different variant based on screen size */}
        <Typography variant={prefersSmallScreen ? "h6" : "h4"} className="title">
          Weather App
        </Typography>
        <MaterialUISwitch
          checked={darkMode}
          onChange={toggleDarkMode}
          color="primary"
        />
      </Toolbar>
    </AppBar>
  );
};

Header.propTypes = {
  toggleDarkMode: PropTypes.func.isRequired,
  darkMode: PropTypes.bool.isRequired,
};

export default Header;
