// src/components/GameMap.jsx
import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// You'll need to install leaflet: npm install leaflet

const GameMap = ({ guesses, gameOver, targetCountry }) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markersLayerRef = useRef(null);

  // Initialize map on component mount
  useEffect(() => {
    if (mapInstanceRef.current) return;

    // Create map instance
    mapInstanceRef.current = L.map(mapRef.current, {
      center: [20, 0], // Center at equator
      zoom: 2,
      minZoom: 2,
      maxBounds: [
        [-90, -180], // Southwest corner
        [90, 180]    // Northeast corner
      ],
      maxBoundsViscosity: 1.0
    });

    // Add world map tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapInstanceRef.current);

    // Create markers layer
    markersLayerRef.current = L.layerGroup().addTo(mapInstanceRef.current);

    // Cleanup on unmount
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  // Update markers when guesses change
  useEffect(() => {
    if (!mapInstanceRef.current || !markersLayerRef.current) return;

    // Clear existing markers
    markersLayerRef.current.clearLayers();

    // Add markers for all guesses
    guesses.forEach(guess => {
      const { country } = guess;
      if (country.latlng && country.latlng.length >= 2) {
        const [lat, lng] = country.latlng;
        
        // Create marker
        const marker = L.circleMarker([lat, lng], {
          radius: 5,
          color: 'black',
          fillColor: 'gray',
          fillOpacity: 0.8,
          weight: 1
        }).addTo(markersLayerRef.current);
        
        // Add popup
        marker.bindPopup(country.name.common);
      }
    });

    // Add target country marker if game is over
    if (gameOver && targetCountry && targetCountry.latlng && targetCountry.latlng.length >= 2) {
      const [lat, lng] = targetCountry.latlng;
      
      // Create highlighted marker
      const targetMarker = L.circleMarker([lat, lng], {
        radius: 8,
        color: 'black',
        fillColor: 'red',
        fillOpacity: 1,
        weight: 2
      }).addTo(markersLayerRef.current);
      
      // Add popup
      targetMarker.bindPopup(`<b>${targetCountry.name.common}</b>`).openPopup();
      
      // Pan to target country
      mapInstanceRef.current.setView([lat, lng], 4);
    }
  }, [guesses, gameOver, targetCountry]);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div 
        ref={mapRef} 
        className="w-full h-96"
        style={{ backgroundColor: '#f5f5f5' }}
      ></div>
    </div>
  );
};

export default GameMap;