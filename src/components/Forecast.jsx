import PropTypes from 'prop-types';
import { Grid, Typography, Card } from '@material-ui/core';
import { WbSunny, InvertColors } from '@material-ui/icons';
import WindPowerIcon from '@mui/icons-material/WindPower';
import './Forecast.css';

const Forecast = ({ forecast }) => {
  // Function to format the date in a more readable format
  const formatDate = (date) => {
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options);
  };

  // Function to format the time in a more readable format
  const formatTime = (date) => {
    const options = { hour: 'numeric', minute: 'numeric', hour12: true };
    return new Date(date).toLocaleTimeString('en-US', options);
  };

  // Function to get the icon color
  const getIconColor = () => {
    return '#FDB813'; // Color for weather icon
  };

  // Get the current time
  const currentTime = new Date().getTime();

  // Filter the forecast entries to only include future entries
  const nextEntries = forecast.filter(item => new Date(item.dt_txt).getTime() > currentTime);

  // Slice the next 4 entries to display
  const futureEntries = nextEntries.slice(0, 4);

  return (
    <Grid container spacing={2} className="forecast-container">
      {futureEntries.map((item, index) => (
        <Grid item xs={6} sm={3} key={index}>
          <Card className="forecast-card">
            <Typography variant="subtitle2" className="forecast-date" style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>
              {/* Display the formatted date and time */}
              {formatDate(item.dt_txt)} <br/> {formatTime(item.dt_txt)}
            </Typography>
            <hr/>
            <Typography variant="body2" className="forecast">
              {/* Display the temperature with the sunny icon */}
              <WbSunny style={{ color: getIconColor() }} /> {Math.round(item.main.temp - 273.15)}°C
            </Typography>
            <Typography variant="body2" className="forecast">
              {/* Display the humidity with the water drop icon */}
              <InvertColors style={{ color: 'blue' }} /> {item.main.humidity}%
            </Typography>
            <Typography variant="body2" className="forecast">
              {/* Display the wind speed with the wind icon */}
              <WindPowerIcon style={{ color: 'green' }} /> {item.wind.speed} m/s
            </Typography>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

Forecast.propTypes = {
  forecast: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Forecast;
