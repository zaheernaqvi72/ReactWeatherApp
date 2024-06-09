import { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';
import { Alert, AlertTitle } from '@mui/material';
import './Search.css';

const Search = ({ addLocation, locations }) => {
  const [query, setQuery] = useState('');
  const [alert, setAlert] = useState({ message: '', type: '' });

  // Function to handle search action
  const handleSearch = async (event) => {
    event.preventDefault(); // Prevent form submission

    if (query) {
      // Check if the location already exists
      if (locations.some(location => location.name.toLowerCase() === query.toLowerCase())) {
        showAlert('Location already exists.', 'warning'); // Show warning if location exists
        return;
      }

      const API_KEY = '35a5226c1533aa055c188aba06d6d9e1';
      try {
        // Fetch weather data from API
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}`);
        addLocation(response.data); // Add location to the list
        setQuery(''); // Clear search input
      } catch (error) {
        // Show error if city or zip code is not found
        showAlert('City or Zip Code not found.', 'error');
      }
    }
  };

  // Function to show alert messages
  const showAlert = (message, type) => {
    setAlert({ message, type }); // Set alert message and type
    setTimeout(() => setAlert({ message: '', type: '' }), 2000); // Clear alert after 2 seconds
  };

  return (
    <div>
      <div className="search">
        <form onSubmit={handleSearch} className="search-bar">
          <input
            className="search_input"
            required
            type="text"
            name="query"
            autoComplete="off"
            placeholder="Search City or Zip Code..."
            value={query}
            onChange={(e) => setQuery(e.target.value)} // Update query state on input change
          />
          <button type="submit" className="search_icon">
            <SearchIcon style={{ fontSize: '2rem' }} />
          </button>
        </form>
      </div>
      {alert.message && (
        <Alert severity={alert.type} style={{ marginTop: '10px' }}>
          <AlertTitle>{alert.type === 'warning' ? 'Warning' : 'Error'}</AlertTitle>
          {alert.message}
        </Alert>
      )}
    </div>
  );
};

Search.propTypes = {
  addLocation: PropTypes.func.isRequired,
  locations: PropTypes.array.isRequired,
};

export default Search;
