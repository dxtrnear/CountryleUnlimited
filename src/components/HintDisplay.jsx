// src/components/HintDisplay.jsx
import React from 'react';

const HintDisplay = ({ hints }) => {
  if (!hints) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Hints</h2>
        <p className="text-gray-500 italic">Make your first guess to see hints!</p>
      </div>
    );
  }

  // Helper function to determine the color class for hint messages
  const getHintColor = (isCorrect) => {
    return isCorrect ? 'text-green-600' : 'text-red-600';
  };

  // Helper function to get directional arrow
  const getDirectionArrow = (direction) => {
    const arrows = {
      N: '↑',
      NE: '↗',
      E: '→',
      SE: '↘',
      S: '↓',
      SW: '↙',
      W: '←',
      NW: '↖',
      'same area': '◉'
    };
    return arrows[direction] || '?';
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Hints</h2>
      
      <div className="space-y-4">
        {/* Hemisphere Hint */}
        <div className="flex items-start">
          <div className="w-8 flex-shrink-0 text-gray-700 text-2xl">🌍</div>
          <div className="ml-2">
            <h3 className="font-medium text-gray-800">Hemisphere</h3>
            <p className={getHintColor(hints.hemisphere.isCorrect)}>
              {hints.hemisphere.message}
            </p>
          </div>
        </div>
        
        {/* Continent Hint */}
        <div className="flex items-start">
          <div className="w-8 flex-shrink-0 text-gray-700 text-2xl">🗺️</div>
          <div className="ml-2">
            <h3 className="font-medium text-gray-800">Continent</h3>
            <p className={getHintColor(hints.continent.isCorrect)}>
              {hints.continent.message}
            </p>
          </div>
        </div>
        
        {/* Population Hint */}
        <div className="flex items-start">
          <div className="w-8 flex-shrink-0 text-gray-700 text-2xl">👥</div>
          <div className="ml-2">
            <h3 className="font-medium text-gray-800">Population</h3>
            <p className={hints.population.isCorrect ? 'text-green-600' : 'text-amber-600'}>
              {hints.population.message}
              {!hints.population.isCorrect && hints.population.difference && (
                <span className="ml-1 text-sm">
                  ({hints.population.difference > 0 ? '+' : ''}{hints.population.difference}%)
                </span>
              )}
            </p>
          </div>
        </div>
        
        {/* Temperature Hint */}
        <div className="flex items-start">
          <div className="w-8 flex-shrink-0 text-gray-700 text-2xl">
            {hints.temperature.difference > 0 ? '🔥' : 
             hints.temperature.difference < 0 ? '❄️' : '🌡️'}
          </div>
          <div className="ml-2">
            <h3 className="font-medium text-gray-800">Climate</h3>
            <p className={hints.temperature.isCorrect ? 'text-green-600' : 'text-amber-600'}>
              {hints.temperature.message}
              {!hints.temperature.isCorrect && hints.temperature.difference && (
                <span className="ml-1 text-sm">
                  ({hints.temperature.difference > 0 ? '+' : ''}{hints.temperature.difference}°C)
                </span>
              )}
            </p>
          </div>
        </div>
        
        {/* Direction Hint */}
        <div className="flex items-start">
          <div className="w-8 flex-shrink-0 text-gray-700 text-2xl">
            {getDirectionArrow(hints.direction.direction)}
          </div>
          <div className="ml-2">
            <h3 className="font-medium text-gray-800">Direction</h3>
            <p className="text-blue-600">
              {hints.direction.message}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HintDisplay;