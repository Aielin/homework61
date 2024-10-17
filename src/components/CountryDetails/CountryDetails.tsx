import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../constants.ts';

interface CountryDetailsProps {
  alpha3Code: string;
}

interface CountryData {
  name: string;
  capital: string;
  population: number;
  borders?: string[];
  flag: string;
}

const CountryDetails: React.FC<CountryDetailsProps> = ({ alpha3Code }) => {
  const [country, setCountry] = useState<CountryData | null>(null);

  useEffect(() => {
    const fetchCountryDetails = async () => {
      try {
        const response = await axios.get<CountryData>(`${BASE_URL}v2/alpha/${alpha3Code}`);
        setCountry(response.data);
      } catch (error) {
        console.error('Error fetching country details:', error);
      }
    };

    fetchCountryDetails();
  }, [alpha3Code]);

  if (!country) {
    return <p>Loading country details...</p>;
  }

  return (
    <div>
      <h2>{country.name}</h2>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      {country.borders && country.borders.length > 0 ? (
        <div>
          <p>Borders with:</p>
          <ul>
            {country.borders.map((border) => (
              <li key={border}>{border}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No bordering countries.</p>
      )}
      <img src={country.flag} alt={`Flag of ${country.name}`} width="150" />
    </div>
  );
};

export default CountryDetails;
