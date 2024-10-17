import React from 'react';

interface Country {
  name: string;
  alpha3Code: string;
}

interface CountryListProps {
  countries: Country[];
  onSelectCountry: (code: string) => void;
  selectedCountry: string | null;
}

const CountryList: React.FC<CountryListProps> = ({ countries, onSelectCountry, selectedCountry }) => {
  return (
    <ul>
      {countries.map((country) => (
        <li
          key={country.alpha3Code}
          onClick={() => onSelectCountry(country.alpha3Code)}
          style={{
            cursor: 'pointer',
            padding: '8px',
            backgroundColor: selectedCountry === country.alpha3Code ? '#d3d3f3' : 'transparent',
            fontWeight: selectedCountry === country.alpha3Code ? 'bold' : 'normal',
          }}>
          {country.name}
        </li>
      ))}
    </ul>
  );
};

export default CountryList;
