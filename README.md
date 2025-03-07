# CountryLE

CountryLE is a geography guessing game where players try to identify a randomly selected country from around the world. Similar to Wordle, but for geography enthusiasts!

NB: Inspired by https://www.countryle.com/

## Installation

To get a local copy up and running, follow these steps:

### Prerequisites

- Node.js (v16.0.0 or higher)
- npm (v8.0.0 or higher)

You can check your versions with:
```bash
node --version
npm --version
```

### Setup

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/countryle.git
   cd countryle
   ```

2. Install dependencies
   ```bash
   npm install
   ```

   This will install all required packages including:
   - React
   - React DOM
   - React Scripts
   - Leaflet and React Leaflet
   - Axios
   - Tailwind CSS and its dependencies

3. Create required configuration files (if not already present)

   If Tailwind CSS configuration is missing, create these files:

   **tailwind.config.js**
   ```bash
   echo "module.exports = {
     content: [
       './src/**/*.{js,jsx,ts,tsx}',
     ],
     theme: {
       extend: {},
     },
     plugins: [],
   }" > tailwind.config.js
   ```

   **postcss.config.js**
   ```bash
   echo "module.exports = {
     plugins: {
       tailwindcss: {},
       autoprefixer: {},
     },
   }" > postcss.config.js
   ```

## Usage

### Development Server

Start the development server:
```bash
npm start
```

This will run the app in development mode. Open [http://localhost:3000](http://localhost:3000) in your browser to view it.

The page will reload if you make edits. You will also see any lint errors in the console.

### Building for Production

To build the app for production:
```bash
npm run build
```

This builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

### Testing

```bash
npm test
```

Launches the test runner in the interactive watch mode.

## Dependencies

Main dependencies:
- React & React DOM
- React Scripts
- Leaflet & React Leaflet for maps
- Axios for API requests
- Tailwind CSS for styling

Dev dependencies:
- Autoprefixer
- PostCSS
- Tailwind CSS

## Project Structure

```
countryle/
├── public/                  # Static files
│   ├── index.html          # HTML entry point
│   └── manifest.json       # Web app manifest
├── src/                     # Source code
│   ├── components/         # React components
│   │   ├── GameBoard.jsx
│   │   ├── CountrySearch.jsx
│   │   ├── GameMap.jsx
│   │   ├── HintDisplay.jsx
│   │   └── GuessHistory.jsx
│   ├── services/           # API services
│   │   └── countryService.js
│   ├── utils/              # Utility functions
│   │   └── gameUtils.js
│   ├── App.js              # Main App component
│   ├── index.js            # JavaScript entry point
│   └── index.css           # Global styles
├── tailwind.config.js       # Tailwind configuration
├── postcss.config.js        # PostCSS configuration
├── package.json             # Dependencies and scripts
└── README.md                # This file
```

## API Information

The game uses the [REST Countries API](https://restcountries.com/) to fetch country data. No API key is required for this public API.

