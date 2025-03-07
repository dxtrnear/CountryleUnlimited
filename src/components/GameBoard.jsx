// src/components/GameBoard.jsx
import React, { useState, useEffect } from 'react';
import CountrySearch from './CountrySearch';
import HintDisplay from './HintDisplay';
import GuessHistory from './GuessHistory';
import GameMap from './GameMap';
import { getRandomCountry, getAllCountries } from '../services/countryService';
import { generateHints } from '../utils/gameUtils';

const GameBoard = () => {
  const [countries, setCountries] = useState([]);
  const [targetCountry, setTargetCountry] = useState(null);
  const [guesses, setGuesses] = useState([]);
  const [currentHints, setCurrentHints] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(false);
  const [error, setError] = useState(null);
  const maxGuesses = 10;

  // Initialize game
  useEffect(() => {
    const initGame = async () => {
      try {
        setIsLoading(true);
        const allCountries = await getAllCountries();
        setCountries(allCountries);
        const newTarget = await getRandomCountry();
        setTargetCountry(newTarget);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to load countries. Please refresh the page.");
        setIsLoading(false);
      }
    };

    initGame();
  }, []);

  // Start a new game
  const startNewGame = async () => {
    try {
      setIsLoading(true);
      setGuesses([]);
      setCurrentHints(null);
      setGameOver(false);
      setWinner(false);
      const newTarget = await getRandomCountry();
      setTargetCountry(newTarget);
      setIsLoading(false);
    } catch (err) {
      setError("Failed to start a new game. Please refresh the page.");
      setIsLoading(false);
    }
  };

  // Make a guess
  const makeGuess = (selectedCountry) => {
    // Check if game is already over
    if (gameOver) return;

    // Check if country was already guessed
    if (guesses.some(g => g.country.name.common === selectedCountry.name.common)) {
      return;
    }

    // Generate hints
    const hints = generateHints(targetCountry, selectedCountry);
    
    // Create new guess object
    const newGuess = {
      country: selectedCountry,
      hints,
      timestamp: new Date()
    };

    // Add to guesses
    setGuesses(prevGuesses => [newGuess, ...prevGuesses]);
    setCurrentHints(hints);

    // Check if guess is correct
    if (selectedCountry.name.common === targetCountry.name.common) {
      setGameOver(true);
      setWinner(true);
      return;
    }

    // Check if max guesses reached
    if (guesses.length + 1 >= maxGuesses) {
      setGameOver(true);
    }
  };

  // Give up
  const giveUp = () => {
    setGameOver(true);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-xl text-gray-700">Loading game data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-gray-800 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">CountryLE</h1>
          <div>
            <button 
              onClick={startNewGame}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded mr-2"
            >
              New Game
            </button>
            {!gameOver && (
              <button 
                onClick={giveUp}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded"
              >
                Give Up
              </button>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto py-6 px-4">
        {/* 
       { TESTING MODE - Target Country 
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-2 mb-4 rounded">
          <p className="font-bold">TESTING MODE</p>
          <p>Target Country: {targetCountry ? targetCountry.name.common : 'Loading...'}</p>
          <p>Continent: {targetCountry ? targetCountry.continents.join(', ') : 'Loading...'}</p>
          <p>Hemisphere: {targetCountry ? targetCountry.hemisphere : 'Loading...'}</p>
          <p>Population: {targetCountry ? targetCountry.population.toLocaleString() : 'Loading...'}</p>
        </div>
        */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Map & Search */}
          <div className="lg:col-span-2 space-y-6">
            <GameMap 
              guesses={guesses} 
              gameOver={gameOver} 
              targetCountry={gameOver ? targetCountry : null} 
            />
            
            {!gameOver ? (
              <CountrySearch 
                countries={countries}
                onSelectCountry={makeGuess}
                disabled={gameOver}
              />
            ) : (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-4">
                  {winner 
                    ? "🎉 Congratulations! You found the country!" 
                    : "Game Over!"}
                </h2>
                <p className="mb-4">
                  {winner 
                    ? `You guessed it in ${guesses.length} ${guesses.length === 1 ? 'try' : 'tries'}!` 
                    : `The country was ${targetCountry.name.common}.`}
                </p>
                <button 
                  onClick={startNewGame}
                  className="px-4 py-2 bg-gray-800 text-white hover:bg-gray-700 rounded"
                >
                  Play Again
                </button>
              </div>
            )}
          </div>
          
          {/* Right Column - Hints & History */}
          <div className="space-y-6">
            <HintDisplay hints={currentHints} />
            <GuessHistory guesses={guesses} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default GameBoard;