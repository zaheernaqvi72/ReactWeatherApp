import PropTypes from 'prop-types';
import WeatherInfo from './WeatherInfo';
import { Grid } from '@material-ui/core';
import './styles.css';

// WeatherList component to display a list of weather information
const WeatherList = ({ locations, removeLocation }) => {
  return (
    <Grid container spacing={2} className="weather-list">
      {/* Map through locations array and render WeatherInfo component for each location */}
      {locations.map((location, index) => (
        <Grid item xs={12} md={6} key={index}>
          {/* Pass location data and onDelete function to WeatherInfo component */}
          <WeatherInfo location={location} onDelete={() => removeLocation(index)} />
        </Grid>
      ))}
    </Grid>
  );
};

// Define prop types for WeatherList component
WeatherList.propTypes = {
  // Array of location objects
  locations: PropTypes.arrayOf(PropTypes.object).isRequired,
  // Function to remove a location from the list
  removeLocation: PropTypes.func.isRequired,
};

export default WeatherList;
