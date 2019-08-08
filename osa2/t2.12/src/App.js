import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

const Weather = ({ country }) => {
  const [weather, setWeather] = useState({});

  useEffect(() => {
    axios
      .get(
        'https://api.apixu.com/v1/current.json?key=65c831706d3348c4958224626190708&q=' +
          country.capital
      )
      .then(res => {
        setWeather(res.data.current);
        console.log(weather);
      });
  });
  if (weather.condition == null) {
    return <div />;
  } else {
    return (
      <div>
        <h2>Weather in {country.capital}</h2>
        <p>temperature: {weather.temp_c} &deg;C</p>
        <img
          className="m-1"
          src={weather.condition.icon}
          alt={weather.condition.text}
          width="50px"
        />
        <p>
          wind: {weather.wind_kph} kph direction {weather.wind_dir}
        </p>
      </div>
    );
  }
};

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
  }, []);

  const searchCountries = event => {
    event.preventDefault();
    setSearch(event.target.value);
  };

  const showCountry = event => {
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
          <img className="m-3" src={t[0].flag} alt={t[0].name} width="100px" />
          <Weather country={t[0]} />
        </div>
      );
    } else if (t.length > 10) {
      return <div>too many matches, specify another filter</div>;
    } else if (t.length <= 10) {
      return (
        <ul>
          {t.map(country => (
            <li className="m-2" key={country.name}>
              {country.name}{' '}
              <button
                className="btn btn-primary btn-sm"
                value={country.name}
                onClick={showCountry}
              >
                Show
              </button>
            </li>
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
