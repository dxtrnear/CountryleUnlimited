// src/components/GuessHistory.jsx
import React from 'react';

const GuessHistory = ({ guesses }) => {
  if (guesses.length === 0) {
    return null;
  }

  // Helper function to create hint indicators
  const createHintIndicator = (hint, type) => {
    let indicatorClass = 'w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold ';
    
    if (type === 'hemisphere' || type === 'continent') {
      // For boolean hints (hemisphere, continent)
      indicatorClass += hint.isCorrect 
        ? 'bg-green-100 text-green-800 border border-green-300' 
        : 'bg-red-100 text-red-800 border border-red-300';
      return (
        <div className={indicatorClass}>
          {hint.isCorrect ? '✓' : '✗'}
        </div>
      );
    } else if (type === 'population' || type === 'temperature') {
      // For comparison hints (population, temperature)
      if (hint.isCorrect) {
        indicatorClass += 'bg-green-100 text-green-800 border border-green-300';
        return <div className={indicatorClass}>≈</div>;
      } else {
        const isHigher = hint.difference > 0;
        indicatorClass += 'bg-amber-100 text-amber-800 border border-amber-300';
        return <div className={indicatorClass}>{isHigher ? '↑' : '↓'}</div>;
      }
    } else if (type === 'direction') {
      // For direction hint
      indicatorClass += 'bg-blue-100 text-blue-800 border border-blue-300';
      // Direction arrows
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
      return <div className={indicatorClass}>{arrows[hint.direction] || '?'}</div>;
    }
    
    return null;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Guess History</h2>
      
      <div className="space-y-2">
        {guesses.map((guess, index) => (
          <div 
            key={`${guess.country.name.common}-${index}`}
            className="border border-gray-200 rounded p-3 hover:bg-gray-50"
          >
            <div className="flex justify-between items-center">
              <div className="font-medium">{guess.country.name.common}</div>
              <div className="flex space-x-2">
                {createHintIndicator(guess.hints.hemisphere, 'hemisphere')}
                {createHintIndicator(guess.hints.continent, 'continent')}
                {createHintIndicator(guess.hints.population, 'population')}
                {createHintIndicator(guess.hints.temperature, 'temperature')}
                {createHintIndicator(guess.hints.direction, 'direction')}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GuessHistory;