import React from 'react';
import PropTypes from 'prop-types';
import WeatherCard from './WeatherCard';
import Forecast from './Forecast';
import { Box, Card, CardContent, IconButton } from '@material-ui/core';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import axios from 'axios';
import './styles.css';

const WeatherInfo = ({ location, onDelete }) => {
  const [forecast, setForecast] = React.useState([]);

  // Fetch forecast data whenever the location changes
  React.useEffect(() => {
    const fetchForecast = async () => {
      const API_KEY = '35a5226c1533aa055c188aba06d6d9e1';
      try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${location.name}&appid=${API_KEY}`);
        setForecast(response.data.list.slice());
      } catch (error) {
        console.error("Error fetching forecast data:", error);
      }
    };
    fetchForecast();
  }, [location]);

  return (
    // Container box with shadow and border radius
    <Box className="weather-info-box" boxShadow={3} borderRadius={5} padding={2} marginBottom={2}>
      <Card>
        <CardContent>
          {/* Delete button to remove the location from the list */}
          <IconButton onClick={onDelete} className="delete-button">
            <HighlightOffIcon style={{fontSize: '2rem', marginBottom: '5px', color: 'rgb(187, 54, 54)'}} />
          </IconButton>
          {/* Display weather card for the location */}
          <WeatherCard location={location} />
          <hr />
          {/* Display forecast information */}
          <Forecast forecast={forecast} />
        </CardContent>
      </Card>
    </Box>
  );
};

WeatherInfo.propTypes = {
  // location object containing weather data
  location: PropTypes.object.isRequired,
  // onDelete function to handle deletion of location
  onDelete: PropTypes.func.isRequired,
};

export default WeatherInfo;
