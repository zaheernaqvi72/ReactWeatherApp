import { useState } from 'react';
import Header from './components/Header';
import Search from './components/Search';
import WeatherList from './components/WeatherList';
import { ThemeProvider, CssBaseline } from '@material-ui/core';
import { lightTheme, darkTheme } from './themes';
import './App.css';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [locations, setLocations] = useState([]);

  // Function to toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode); // Toggle darkMode state
  };

  // Function to add a new location
  const addLocation = (location) => {
    setLocations([location, ...locations]); // Add new location to locations array
  };

  // Function to remove a location
  const removeLocation = (index) => {
    setLocations(locations.filter((_, i) => i !== index)); // Remove location from locations array
  };

  return (
    <ThemeProvider key={darkMode ? 'dark' : 'light'} theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline /> {/* Apply global CSS baseline */}
      <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode} /> 
      <div className="content">
        <Search addLocation={addLocation} locations={locations} /> 
        <WeatherList locations={locations} removeLocation={removeLocation} />
      </div>
    </ThemeProvider>
  );
};

export default App;
