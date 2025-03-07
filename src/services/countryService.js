// src/services/countryService.js
import axios from 'axios';

const BASE_URL = 'https://restcountries.com/v3.1';

// Cache countries to avoid repeated API calls
let countriesCache = null;

// Get all countries with required data
export const getAllCountries = async () => {
  if (countriesCache) {
    return countriesCache;
  }

  try {
    // Fields we need for the game
    const fields = [
      'name',
      'latlng',
      'population',
      'continents',
      'area',
      'flags'
    ].join(',');

    const response = await axios.get(`${BASE_URL}/all?fields=${fields}`);
    
    // Process countries to add required game properties
    const processedCountries = response.data.map(country => ({
      ...country,
      // Add derived properties
      hemisphere: getHemisphere(country.latlng),
      // Note: REST Countries API doesn't provide temperature data
      // We'll need to either add mock data or integrate with a weather API
      avgTemperature: getMockTemperature(country.latlng[0]), // Mock function based on latitude
    }));
    
    countriesCache = processedCountries;
    return processedCountries;
  } catch (error) {
    console.error('Error fetching country data:', error);
    throw error;
  }
};

// Select a random country for the game
export const getRandomCountry = async () => {
  const countries = await getAllCountries();
  const randomIndex = Math.floor(Math.random() * countries.length);
  return countries[randomIndex];
};

// Get hemisphere based on latitude
const getHemisphere = (latlng) => {
  if (!latlng || latlng.length < 2) return 'Unknown';
  return latlng[0] >= 0 ? 'Northern' : 'Southern';
};

// Mock function to generate average temperature based on latitude
// In a production app, you would integrate with a climate/weather API
const getMockTemperature = (latitude) => {
  // Simple algorithm: closer to equator = hotter
  // This is a simplification for game purposes
  const absLatitude = Math.abs(latitude || 0);
  // Scale: equator ~30°C, poles ~-30°C
  return Math.round(30 - (absLatitude * 60 / 90));
};