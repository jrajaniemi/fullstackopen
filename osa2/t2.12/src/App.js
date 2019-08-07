import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

const Results = ({ rows }) => {
  return <div>{rows}</div>;
};

function App() {
  const [search, setSearch] = useState('');
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then(res => {
      setCountries(res.data);
    });
  });

  const searchCountries = event => {
    event.preventDefault();
    setSearch(event.target.value);
  };

  const rows = () => {
    const t = countries.filter(x => new RegExp(search, 'i').test(x.name));
    if (search === '') {
      return <div />;
    } else if (t.length === 1) {
      return (
        <div>
          <h1>{t[0].name}</h1>
          <p>
            capital {t[0].capital}
            <br />
            population {t[0].population}
          </p>
          <h2>languages</h2>
          <ul>
            {t[0].languages.map(c => (
              <li key={c.name}>{c.name}</li>
            ))}
          </ul>
          <img src={t[0].flag} alt={t[0].name} width="100px" />
        </div>
      );
    } else if (t.length > 10) {
      return <div>too many matches, specify another filter</div>;
    } else if (t.length <= 10) {
      return (
        <ul>
          {t.map(country => (
            <li key={country.name}>{country.name}</li>
          ))}
        </ul>
      );
    }
    //
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-12">
          <p>
            Find countries
            <br />
            <input value={search} onChange={searchCountries} />
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <Results rows={rows()} />
        </div>
      </div>
    </div>
  );
}

export default App;
