// src/components/CountrySearch.jsx
import React, { useState, useRef, useEffect } from 'react';

const CountrySearch = ({ countries, onSelectCountry, disabled }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  // Filter countries based on search term
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredCountries([]);
      return;
    }

    const filtered = countries
      .filter(country => 
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .slice(0, 10); // Limit to 10 results for performance
    
    setFilteredCountries(filtered);
  }, [searchTerm, countries]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle country selection
  const handleSelectCountry = (country) => {
    onSelectCountry(country);
    setSearchTerm('');
    setIsDropdownOpen(false);
    inputRef.current.focus();
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (filteredCountries.length > 0) {
      handleSelectCountry(filteredCountries[0]);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Make a Guess</h2>
      <form onSubmit={handleSubmit} className="relative" ref={dropdownRef}>
        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsDropdownOpen(true);
          }}
          onClick={() => setIsDropdownOpen(true)}
          placeholder="Search for a country..."
          className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
          disabled={disabled}
        />
        
        {isDropdownOpen && filteredCountries.length > 0 && (
          <ul className="absolute z-10 w-full bg-white mt-1 border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
            {filteredCountries.map((country) => (
              <li 
                key={country.name.common}
                className="p-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100"
                onClick={() => handleSelectCountry(country)}
              >
                {country.name.common}
              </li>
            ))}
          </ul>
        )}
        
        <button 
          type="submit"
          className="mt-4 px-4 py-2 bg-gray-800 text-white hover:bg-gray-700 rounded w-full"
          disabled={disabled || filteredCountries.length === 0}
        >
          Make Guess
        </button>
      </form>
    </div>
  );
};

export default CountrySearch;