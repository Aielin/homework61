import React from 'react';

interface Country {
  name: string;
  alpha3Code: string;
}

interface CountryListProps {
  countries: Country[];
  onSelectCountry: (code: string) => void;
}

const CountryList: React.FC<CountryListProps> = ({ countries, onSelectCountry }) => {
  return (
    <ul>
      {countries.map((country) => (
        <li key={country.alpha3Code} onClick={() => onSelectCountry(country.alpha3Code)}>
          {country.name}
        </li>
      ))}
    </ul>
  );
};

export default CountryList;
