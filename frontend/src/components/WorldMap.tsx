import React, { useState } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';

// Define the keys for the regions
type RegionKey = "Africa" | "Asia" | "Europe" | "NorthAmerica" | "SouthAmerica" | "Oceania";

// Define a type for the regions using Record
type Regions = Record<RegionKey, string[]>;

// Define regions (continents) and their corresponding countries
const regions: Regions = {
  Africa: [
    "Algeria" ,"Sudan", "South Sudan","Angola", "Benin", "Botswana", "Burkina Faso", "Burundi", "Cabo Verde", "Cameroon", "Central African Republic", "Chad", "Comoros", "Democratic Republic of the Congo", "Djibouti", "Egypt", "Equatorial Guinea", "Eritrea", "Eswatini", "Ethiopia", "Gabon", "Gambia", "Ghana", "Guinea", "Guinea-Bissau", "Ivory Coast", "Kenya", "Lesotho", "Liberia", "Libya", "Madagascar", "Malawi", "Mali", "Mauritania", "Mauritius", "Morocco", "Mozambique", "Namibia", "Niger", "Nigeria", "Republic of the Congo", "Rwanda", "Sao Tome and Principe", "Senegal", "Seychelles", "Sierra Leone", "Somalia", "South Africa", "South Sudan", "Sudan", "Tanzania", "Togo", "Tunisia", "Uganda", "Zambia", "Zimbabwe"
  ],
  Asia: [
    "Afghanistan", "Armenia", "Azerbaijan", "Bahrain", "Bangladesh", "Bhutan", "Brunei", "Cambodia", "China", "Cyprus", "Georgia", "India", "Indonesia", "Iran", "Iraq", "Israel", "Japan", "Jordan", "Kazakhstan", "Kuwait", "Kyrgyzstan", "Laos", "Lebanon", "Malaysia", "Maldives", "Mongolia", "Myanmar", "Nepal", "North Korea", "Oman", "Pakistan", "Palestine", "Philippines", "Qatar", "Saudi Arabia", "Singapore", "South Korea", "Sri Lanka", "Syria", "Tajikistan", "Thailand", "Timor-Leste", "Turkey", "Turkmenistan", "United Arab Emirates", "Uzbekistan", "Vietnam", "Yemen"
  ],
  Europe: [
    "Albania", "Andorra", "Austria", "Belarus","Republic of Serbia", "Belgium","Czech Republic", "Bosnia and Herzegovina", "Bulgaria", "Croatia", "Cyprus", "Czechia", "Denmark", "Estonia", "Finland", "France", "Germany", "Greece", "Hungary", "Iceland", "Ireland", "Italy", "Kosovo", "Latvia", "Liechtenstein", "Lithuania", "Luxembourg", "Malta", "Moldova", "Monaco", "Montenegro", "Netherlands", "Macedonia", "Norway", "Poland", "Portugal", "Romania", "Russia", "San Marino", "Serbia", "Slovakia", "Slovenia", "Spain", "Sweden", "Switzerland", "Ukraine", "United Kingdom", "Vatican City","England","Scotland","Ireland","Wales"
  ],
  NorthAmerica: [
    "Antigua and Barbuda","Greenland", "Bahamas", "Barbados", "Belize", "Canada", "Costa Rica", "Cuba", "Dominica", "Dominican Republic", "El Salvador", "Grenada", "Guatemala", "Haiti", "Honduras", "Jamaica", "Mexico", "Nicaragua", "Panama", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Trinidad and Tobago", "USA"
  ],
  SouthAmerica: [
    "Argentina", "Bolivia", "Brazil", "Chile", "Colombia", "Ecuador", "Guyana", "Paraguay", "Peru", "Suriname", "Uruguay", "Venezuela"
  ],
  Oceania: [
    "Australia", "Fiji", "Kiribati", "Marshall Islands", "Micronesia", "Nauru", "New Zealand", "Palau", "Papua New Guinea", "Samoa", "Solomon Islands", "Tonga", "Tuvalu", "Vanuatu"
  ]
};

interface WorldMapProps {
  onContinentSelect: (continent: string | null) => void;
}

const WorldMap: React.FC<WorldMapProps> = ({ onContinentSelect }) => {
  const [selectedRegion, setSelectedRegion] = useState<RegionKey | null>(null);

  const handleRegionClick = (region: RegionKey) => {
    const newRegion = region === selectedRegion ? null : region;
    setSelectedRegion(newRegion);
    onContinentSelect(newRegion); // Send selected continent to NewPage.tsx
  };

  return (
    <div className="world-map">
      <ComposableMap>
        <Geographies geography="https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson">
          {({ geographies }) =>
            geographies.map((geo) => {
              const countryName = geo.properties.name;
              const isSelected = selectedRegion ? regions[selectedRegion].includes(countryName) : false;

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={isSelected ? "#006400" : "#D6D6DA"}
                  stroke="#FFFFFF"
                  style={{
                    default: { outline: "none" },
                    hover: { fill: isSelected ? "#006400" : "#CCCCCC", outline: "none" },
                    pressed: { outline: "none" },
                  }}
                  onClick={() => {
                    const continent = (Object.keys(regions) as RegionKey[]).find(key =>
                      regions[key].includes(countryName)
                    );
                    if (continent) {
                      handleRegionClick(continent);
                    }
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>

      {selectedRegion && <div>Selected Region: {selectedRegion}</div>}
    </div>
  );
};

export default WorldMap;
