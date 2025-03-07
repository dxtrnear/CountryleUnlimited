// src/utils/gameUtils.js

// Compare two countries and generate hints

export const generateHints = (targetCountry, guessedCountry) => {
  if (!targetCountry || !guessedCountry) {
    return null;
  }
  console.log(targetCountry)
  return {
    hemisphere: compareHemisphere(targetCountry, guessedCountry),
    continent: compareContinent(targetCountry, guessedCountry),
    population: comparePopulation(targetCountry, guessedCountry),
    temperature: compareTemperature(targetCountry, guessedCountry),
    direction: getDirectionHint(targetCountry, guessedCountry)
  };
};

// Compare hemispheres
const compareHemisphere = (target, guess) => {
  const isCorrect = target.hemisphere === guess.hemisphere;
  return {
    isCorrect,
    message: isCorrect 
      ? `Correct! Both countries are in the ${target.hemisphere} hemisphere.` 
      : `Incorrect. The countries are in different hemispheres.`
  };
};

// Compare continents
const compareContinent = (target, guess) => {
  // Some countries span multiple continents, check for any overlap
  const targetContinents = target.continents || [];
  const guessContinents = guess.continents || [];
  
  const commonContinents = targetContinents.filter(c => 
    guessContinents.includes(c)
  );
  
  const isCorrect = commonContinents.length > 0;
  
  return {
    isCorrect,
    message: isCorrect 
      ? `Correct! Both countries are in ${commonContinents.join(', ')}.` 
      : `Incorrect. The continent is different.`
  };
};

// Compare population
const comparePopulation = (target, guess) => {
  const targetPop = target.population;
  const guessPop = guess.population;
  
  // Consider "correct" if within 20% of actual population
  const ratio = targetPop / guessPop;
  const isCloseEnough = ratio > 0.8 && ratio < 1.2;
  
  let hint;
  if (isCloseEnough) {
    hint = 'similar population';
  } else if (targetPop > guessPop) {
    hint = 'larger population';
  } else {
    hint = 'smaller population';
  }
  
  // Calculate percentage difference
  const percentDiff = Math.round((targetPop / guessPop - 1) * 100);
  
  return {
    isCorrect: isCloseEnough,
    message: `The target country has a ${hint} than ${guess.name.common}.`,
    difference: percentDiff,
    targetPopulation: targetPop // Include the actual target population
  };
};

// Compare temperature
const compareTemperature = (target, guess) => {
  const targetTemp = target.avgTemperature;
  const guessTemp = guess.avgTemperature;
  
  // Consider "correct" if within 5°C
  const diff = targetTemp - guessTemp;
  const isCloseEnough = Math.abs(diff) <= 5;
  
  let hint;
  if (isCloseEnough) {
    hint = 'similar temperature';
  } else if (targetTemp > guessTemp) {
    hint = 'hotter climate';
  } else {
    hint = 'colder climate';
  }
  
  return {
    isCorrect: isCloseEnough,
    message: `The target country has a ${hint} than ${guess.name.common}.`,
    difference: Math.round(diff)
  };
};

// Get directional hint (NE, SW, etc.)
const getDirectionHint = (target, guess) => {
  if (!target.latlng || !guess.latlng) {
    return { 
      direction: 'unknown',
      message: 'Direction information unavailable' 
    };
  }
  
  const [targetLat, targetLng] = target.latlng;
  const [guessLat, guessLng] = guess.latlng;
  
  let ns = '';
  let ew = '';
  
  // North-South component
  if (targetLat > guessLat + 1) { // Add small threshold to avoid micro-differences
    ns = 'N';
  } else if (targetLat < guessLat - 1) {
    ns = 'S';
  }
  
  // East-West component
  if (targetLng > guessLng + 1) {
    ew = 'E';
  } else if (targetLng < guessLng - 1) {
    ew = 'W';
  }
  
  // If they're very close, no direction needed
  const direction = ns + ew || 'same area';
  
  return {
    direction,
    message: direction === 'same area' 
      ? 'Your guess is very close to the target country!' 
      : `The target country is to the ${direction} of your guess.`
  };
};