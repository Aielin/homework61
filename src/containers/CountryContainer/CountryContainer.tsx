import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL, COUNTRIES_URL } from '../../constants.ts';
import CountryList from '../../components/CountryList/CountryList';

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
      <CountryList onSelectCountry={setSelectedCountry} countries={countries} />
      <div>
        {selectedCountry ? (
          <p>Вы выбрали: {selectedCountry}</p>
        ) : (
          <p>Выберите страну</p>
        )}
      </div>
    </div>
  );
};

export default CountryContainer;
