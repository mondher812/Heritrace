import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default function WorldMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  const selectedLayerRef = useRef<L.Layer | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize the map
    const map = L.map(mapRef.current).setView([20, 0], 2);

    // Use Stamen Watercolor tiles to change the water and overall map style.
    L.tileLayer('https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg', {
      attribution:
        'Map tiles by Stamen Design, CC BY 3.0 — Map data © OpenStreetMap contributors'
    }).addTo(map);

    // Define default and selected styles for the countries (these overlay on top of the base map)
    const defaultStyle = {
      fillColor: '#808080', // Light blue for the default country fill
      weight: 1,
      color: 'white',
      fillOpacity: 0.7
    };

    const selectedStyle = {
      fillColor: '#2E6F40', // Coral for the selected country
      fillOpacity: 0.5
    };

    // Fetch GeoJSON for world countries
    fetch('https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson')
      .then((response) => response.json())
      .then((geojsonData) => {
        L.geoJSON(geojsonData, {
          style: defaultStyle,
          onEachFeature: (feature, layer) => {
            layer.on('click', () => {
              // Reset the previously selected country's style
              if (selectedLayerRef.current && selectedLayerRef.current !== layer) {
                (selectedLayerRef.current as L.Path).setStyle(defaultStyle);
              }
              // Set the clicked country as selected and change its style
              selectedLayerRef.current = layer;
              (layer as L.Path).setStyle(selectedStyle);
              // Log only the country's name using the ADMIN property
              console.log('Selected country:', feature.properties?.ADMIN);
            });
          }
        }).addTo(map);
      })
      .catch((error) => console.error('Error loading GeoJSON:', error));

    // Clean up on unmount
    return () => {
      map.remove();
    };
  }, []);

  return (
    <div
      ref={mapRef}
      style={{ height: '400px', width: '100%', backgroundColor: '#ffffff' }}
    />
  );
} 
