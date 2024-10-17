import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL, COUNTRIES_URL } from '../../constants.ts';
import CountryList from '../../components/CountryList/CountryList';
import CountryDetails from '../../components/CountryDetails/CountryDetails.tsx';
import './CountryContainer.css';

interface Country {
  name: string;
  alpha3Code: string;
}

const CountryContainer: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get<Country[]>(`${BASE_URL}${COUNTRIES_URL}`);
        setCountries(response.data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    void fetchCountries();
  }, []);

  return (
    <div className="container mt-5">
      <div className="country-container">
        <div className="country-list">
          <CountryList
            onSelectCountry={setSelectedCountry}
            countries={countries}
            selectedCountry={selectedCountry}
          />
        </div>
        <div className="country-details">
          {selectedCountry ? (
            <CountryDetails alpha3Code={selectedCountry}/>
          ) : (
            <p className="select-country-prompt">Выберите страну</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CountryContainer;
