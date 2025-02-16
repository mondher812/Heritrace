import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default function WorldMap() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize the map
    const map = L.map(mapRef.current).setView([20, 0], 2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Fetch GeoJSON for world countries
    fetch('https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson')
      .then((response) => response.json())
      .then((geojsonData) => {
        L.geoJSON(geojsonData, {
          // Default style for regions
          style: {
            fillColor: '#ccc',
            weight: 1,
            color: 'white',
            fillOpacity: 0.7
          },
          // Add click event to each feature
          onEachFeature: (feature, layer) => {
            layer.on('click', () => {
              (layer as L.Path).setStyle({
                fillColor: 'blue',
                fillOpacity: 0.5
              });
              console.log('Selected region:', feature.properties);
            });
          }
        }).addTo(map);
      })
      .catch((error) => console.error('Error loading GeoJSON:', error));

    // Clean up on component unmount
    return () => {
      map.remove();
    };
  }, []);

  return <div ref={mapRef} style={{ height: '400px', width: '100%', backgroundColor: '#ffffff' }} />;
} 
