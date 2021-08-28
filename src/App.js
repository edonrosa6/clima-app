import React, { useState } from 'react';

const api = {
  key: 'f3df9bfd3c982070732c59aae4ce5113',
  base: 'https://api.openweathermap.org/data/2.5/'
}

function App() {

  const [query, setQuery] = useState('');
  const [clima, setClima] = useState({});

  const buscar = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setClima(result);
          setQuery('');
          console.log(clima)
        }
        );
    }
  }


  const dateBuilder = (d) => {
    let months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
    let days = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} de ${month} ${year}`
  }

  return (
    <div className={(typeof clima.main != "undefined")
      ? ((clima.main.temp > 16)
        ? 'app warm'
        : 'app')
      : 'normal'}>
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Buscar ciudad"
            onChange={text => setQuery(text.target.value)}
            value={query}
            onKeyPress={buscar}
          />

        </div>
        {(typeof clima.main != "undefined") ? (
          <>
            <div className="location-box">
              <div className="location">
                {clima.name}, {clima.sys.country}
              </div>
              <div className="date">
                {dateBuilder(new Date())}
              </div>
            </div>
            <div className="weather-box">
              <div className="temp">
                {Math.round(clima.main.temp)}°C
              </div>
              <div className="weather">
                {clima.weather[0].main}
              </div>
            </div>
          </>
        ) : (
          <div className="text-title">
            Busca una ciudad
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
