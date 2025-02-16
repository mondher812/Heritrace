import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default function WorldMap() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) return;
    const map = L.map(mapRef.current).setView([20, 10], 2);

    // Use Stamen Watercolor tiles to change the water and overall map style.
    L.tileLayer('https://stamen-tiles.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg', {
    
    }).addTo(map);

    // Define styles
    const defaultStyle = {
      fillColor: '#808080', // A light blueish overlay for countries
      weight: 1,
      color: 'white',
      fillOpacity: 0.9,
    };

    const selectedStyle = {
      fillColor: '#2E6F40', // A vibrant orange for selected countries
      fillOpacity: 0.7,
    };

    // Mapping from country name to continent.
    // Extend this mapping with a complete list as needed.
    const countryToContinent: { [countryName: string]: string } = {
     "United States of America": "North America",
  "Canada": "North America",
  "Mexico": "North America",
  "Guatemala": "North America",
  "Belize": "North America",
  "Honduras": "North America",
  "El Salvador": "North America",
  "Nicaragua": "North America",
  "Costa Rica": "North America",
  "Panama": "North America",
  "Haiti": "North America",
  "Dominican Republic": "North America",
  "Cuba": "North America",
  "Jamaica": "North America",
  "Trinidad and Tobago": "North America",
  "Barbados": "North America",
  "Saint Lucia": "North America",
  "Saint Vincent and the Grenadines": "North America",
  "Grenada": "North America",
  "Saint Kitts and Nevis": "North America",
  "Antigua and Barbuda": "North America",
  "Dominica": "North America",
  "Saint Pierre and Miquelon": "North America",
  "Bermuda": "North America",
  "Greenland": "North America",
  "Cayman Islands": "North America",
  "Saint Barthelemy": "North America",
  "Sint Eustatius": "North America",
  "Aruba": "North America",
  "Curacao": "North America",
  "Bonaire": "North America",
  "Saba": "North America",
  "Anguila": "North America",
  "British Virgin Islands": "North America",

  // South America
  "Brazil": "South America",
  "Argentina": "South America",
  "Chile": "South America",
  "Peru": "South America",
  "Colombia": "South America",
  "Ecuador": "South America",
  "Venezuela": "South America",
  "Bolivia": "South America",
  "Paraguay": "South America",
  "Uruguay": "South America",
  "Guyana": "South America",
  "Suriname": "South America",
  "French Guiana": "South America",

  // Europe
  "France": "Europe",
  "Germany": "Europe",
  "Spain": "Europe",
  "Italy": "Europe",
  "United Kingdom": "Europe",
  "Russia": "Europe",
  "Poland": "Europe",
  "Netherlands": "Europe",
  "Belgium": "Europe",
  "Greece": "Europe",
  "Portugal": "Europe",
  "Sweden": "Europe",
  "Norway": "Europe",
  "Finland": "Europe",
  "Denmark": "Europe",
  "Ireland": "Europe",
  "Switzerland": "Europe",
  "Austria": "Europe",
  "Czech Republic": "Europe",
  "Slovakia": "Europe",
  "Hungary": "Europe",
  "Romania": "Europe",
  "Bulgaria": "Europe",
  "Croatia": "Europe",
  "Serbia": "Europe",
  "Bosnia and Herzegovina": "Europe",
  "Slovenia": "Europe",
  "North Macedonia": "Europe",
  "Albania": "Europe",
  "Kosovo": "Europe",
  "Montenegro": "Europe",
  "Moldova": "Europe",
  "Belarus": "Europe",
  "Ukraine": "Europe",
  "Estonia": "Europe",
  "Latvia": "Europe",
  "Lithuania": "Europe",
  "Luxembourg": "Europe",
  "Malta": "Europe",
  "Andorra": "Europe",
  "Monaco": "Europe",
  "Liechtenstein": "Europe",
  "San Marino": "Europe",
  "Vatican City": "Europe",

  // Asia
  "China": "Asia",
  "Japan": "Asia",
  "India": "Asia",
  "South Korea": "Asia",
  "Thailand": "Asia",
  "Vietnam": "Asia",
  "Indonesia": "Asia",
  "Malaysia": "Asia",
  "Philippines": "Asia",
  "Saudi Arabia": "Asia",
  "Turkey": "Asia",
  "Iran": "Asia",
  "Iraq": "Asia",
  "Pakistan": "Asia",
  "Bangladesh": "Asia",
  "Sri Lanka": "Asia",
  "Nepal": "Asia",
  "Afghanistan": "Asia",
  "Israel": "Asia",
  "Jordan": "Asia",
  "Syria": "Asia",
  "Lebanon": "Asia",
  "Kuwait": "Asia",
  "Oman": "Asia",
  "Qatar": "Asia",
  "Bahrain": "Asia",
  "United Arab Emirates": "Asia",
  "Yemen": "Asia",
  "Kyrgyzstan": "Asia",
  "Uzbekistan": "Asia",
  "Turkmenistan": "Asia",
  "Kazakhstan": "Asia",
  "Tajikistan": "Asia",
  "Armenia": "Asia",
  "Georgia": "Asia",
  "Cyprus": "Asia",
  "Mongolia": "Asia",
  "Laos": "Asia",
  "Cambodia": "Asia",
  "Bhutan": "Asia",
  "Maldives": "Asia",
  "Timor-Leste": "Asia",

  // Oceania
  "Australia": "Oceania",
  "New Zealand": "Oceania",
  "Fiji": "Oceania",
  "Papua New Guinea": "Oceania",
  "Solomon Islands": "Oceania",
  "Vanuatu": "Oceania",
  "Samoa": "Oceania",
  "Tonga": "Oceania",
  "Nauru": "Oceania",
  "Tuvalu": "Oceania",
  "Kiribati": "Oceania",
  "Marshall Islands": "Oceania",
  "Palau": "Oceania",
  "Micronesia": "Oceania",

  // Africa
  "Sudan": "Africa",
  "Ethiopia": "Africa",

  "Egypt": "Africa",
  "South Africa": "Africa",
  "Algeria": "Africa",
  "Kenya": "Africa",
  "Nigeria": "Africa",
  "Morocco": "Africa",
  "Tunisia": "Africa",
  "Seychelles": "Africa",
  "Mauritius": "Africa",
  "Madagascar": "Africa",
  "Mozambique": "Africa",
  "Zambia": "Africa",
  "Angola": "Africa",
  "Congo (Republic of the Congo)": "Africa",
  "Congo (Democratic Republic of the Congo)": "Africa",
  "Gabon": "Africa",
  "Equatorial Guinea": "Africa",
  "São Tomé and Príncipe": "Africa",
  "Comoros": "Africa",
  "Lesotho": "Africa",
  "Swaziland (Eswatini)": "Africa",
  "Malawi": "Africa",
  "Tanzania": "Africa",
  "Uganda": "Africa",
  "Rwanda": "Africa",
  "Burundi": "Africa",
  "South Sudan": "Africa",
  "Eritrea": "Africa",
  "Djibouti": "Africa",
  "Somalia": "Africa",
  "Gambia": "Africa",
  "Liberia": "Africa",
  "Sierra Leone": "Africa",
  "Guinea": "Africa",
  "Guinea-Bissau": "Africa",
  "Mauritania": "Africa",
  "Mali": "Africa",
  "Senegal": "Africa",
  "Cote d'Ivoire": "Africa",
  "Burkina Faso": "Africa",
  "Niger": "Africa",
  "Togo": "Africa",
  "Benin": "Africa",
  "Ghana": "Africa",
  "Chad": "Africa",
  "Cameroon": "Africa",
  "Central African Republic": "Africa",
    "Zimbabwe": "Africa",
    "Libya": "Africa",
    "Democratic Republic of the Congo": "Africa",
    "Namibia": "Africa",
    "Botswana": "Africa",
    "United Republic of Tanzania": "Africa",
    "Ivory Coast": "Africa",
    "Somaliland": "Africa",
    "Western Sahara": "Africa",
    "Republic of Congo": "Africa",
    "Iceland": "Europe",
  
};
    
  
    // Object to store each country's layer (keyed by its ADMIN property)
    const countryLayers: { [country: string]: L.Layer } = {};

    // Fetch GeoJSON for world countries
    fetch('https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson')
      .then((response) => response.json())
      .then((geojsonData) => {
        L.geoJSON(geojsonData, {
          style: defaultStyle,
          onEachFeature: (feature, layer) => {
            const countryName = feature.properties?.ADMIN;
            if (countryName) {
              countryLayers[countryName] = layer;
            }

            layer.on('click', () => {
              const clickedCountry = feature.properties?.ADMIN;
              if (!clickedCountry) return;

              const continent = countryToContinent[clickedCountry];

              if (continent) {
                // Loop over all country layers and update their style based on their continent.
                Object.keys(countryLayers).forEach((name) => {
                  if (countryToContinent[name] === continent) {
                    (countryLayers[name] as L.Path).setStyle(selectedStyle);
                  } else {
                    (countryLayers[name] as L.Path).setStyle(defaultStyle);
                  }
                });
                console.log("Selected continent:", continent);
              } else {
                // Fallback: if no continent mapping is found, just highlight that country.
                (layer as L.Path).setStyle(selectedStyle);
                console.log("No continent mapping for:", clickedCountry);
              }
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

  return (
    <div
      ref={mapRef}
      style={{
        height: '400px',
        width: '100%',
        backgroundColor: '#ffffff',
      }}
    />
  );
} 
