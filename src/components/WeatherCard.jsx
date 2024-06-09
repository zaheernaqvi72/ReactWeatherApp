import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Typography, Grid } from '@material-ui/core';
import { WbSunny, InvertColors, FilterDrama } from '@material-ui/icons';
import WindPowerIcon from '@mui/icons-material/WindPower';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EventIcon from '@mui/icons-material/Event';
import './WeatherCard.css';

const WeatherCard = ({ location }) => {
  const { name, main, weather, wind } = location;

  // State to store the current time
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  // Effect to update the current time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().totoLocaleTimeStrin());
    }, 1000);

    // Cleanup the timer when the component is unmounted
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {/* Display the location name with an icon */}
      <Typography variant="h4" className="weather-location">
        <LocationOnIcon style={{ color: 'red', fontSize: '2.3rem', marginRight: '0.3rem' }} />
        {name}
      </Typography>

      {/* Display the current date and time */}
      <Grid container justifyContent="space-between" className="date-time-container">
        <Grid item>
          <Typography variant='subtitle1' className="date-time">
            <EventIcon /> {new Date().toLocaleDateString()}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant='subtitle1' className="date-time">
            <AccessTimeIcon /> {currentTime}
          </Typography>
        </Grid>
      </Grid>

      {/* Display weather details such as temperature, humidity, wind speed, and description */}
      <Grid container spacing={2} className="weather-details">
        <Grid item xs={6}>
          <Typography variant="h6" className="weather-detail">
            <WbSunny style={{ color: '#FDB813' }} /> {Math.round(main.temp - 273.15)}°C
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6" className="weather-detail">
            <InvertColors style={{ color: 'blue' }} /> {main.humidity}%
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6" className="weather-detail">
            <WindPowerIcon style={{ color: 'green' }} /> {wind.speed} m/s
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6" className="weather-detail">
            <FilterDrama style={{ color: '#FDB813' }} /> {weather[0].description}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

// PropTypes validation to ensure correct prop types are passed
WeatherCard.propTypes = {
  location: PropTypes.object.isRequired,
};

export default WeatherCard;
