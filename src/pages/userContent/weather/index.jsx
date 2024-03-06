import React, { useState, useEffect, useContext} from 'react';
import { GlobalContext } from '../../../context/GlobalContext';
import { ContentHeader } from '../../../components/Shared/ContentHeader';
import { SearchComponent } from '../../../components/Shared/SearchComponent';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import './index.css';
const MySwal = withReactContent(Swal);

function WeatherPage() {
  const { setActiveBlur } = useContext(GlobalContext);
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState({});
  const [search, setSearch] = useState("");

  const searcher = (e) => {
    setSearch(e.target.value)   
  }

  const searchSpecificData = async (e) => {
    const API_BASE_URL = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=${process.env.REACT_APP_OPENWEATHERAPI_KEY}`;
    try {
        const response = await fetch(API_BASE_URL).then(response => {
          return response;
        });
        if (!response.ok) {
            throw new Error('Error en la solicitud');
        }
        let data = await response.json();
        setResponse({
          temperature: data.main.temp,
          condition: data.weather[0].main,
          description: data.weather[0].description,
          location: data.name+', '+data.sys.country,
          icon: data.weather[0].icon,
          feel: data.main.feels_like,
          humidity: data.main.humidity,
          pressure: data.main.pressure,
          temp_max: data.main.temp_max,
          temp_min: data.main.temp_min,
          wind_speed: data.wind.speed,
          wind_degree_direction: data.wind.deg,
          wind_gust: data.wind.gust,
          visibility: data.visibility
        });
    } catch (error) {
        console.error(error);
        setActiveBlur(true);
        MySwal.fire({
            icon: 'error',
            title: 'Oops ...',
            text: 'There was an error searching the location, please check the location name and try again.',
            showConfirmButton: false,
            timer: 1700,
            backdrop: true,
            customClass: {
                popup: 'popup-sweet',
                title: 'title-sweet',
                htmlContainer: 'text-sweet',
                confirmButton: 'confirm-button-sweet',
                denyButton: 'deny-button-sweet',
            }
        }).finally(() => {setActiveBlur(false)});
    }
  }

  const fetchDataInitial = async (lat, lon) => {
    const API_BASE_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.REACT_APP_OPENWEATHERAPI_KEY}`;
    try {
        const response = await fetch(API_BASE_URL).then(response => {
          return response;
        });
        if (!response.ok) {
            throw new Error('Error en la solicitud');
        }
        let data = await response.json();
        setResponse({
          temperature: data.main.temp,
          condition: data.weather[0].main,
          description: data.weather[0].description,
          location: data.name+', '+data.sys.country,
          icon: data.weather[0].icon,
          feel: data.main.feels_like,
          humidity: data.main.humidity,
          pressure: data.main.pressure,
          temp_max: data.main.temp_max,
          temp_min: data.main.temp_min,
          wind_speed: data.wind.speed,
          wind_degree_direction: data.wind.deg,
          wind_gust: data.wind.gust,
          visibility: data.visibility
        });
    } catch (error) {
        console.error(error);
        setActiveBlur(true);
        MySwal.fire({
            icon: 'error',
            title: 'Oops ...',
            text: 'There was an error searching the location, please check the location name and try again.',
            showConfirmButton: false,
            timer: 1700,
            backdrop: true,
            customClass: {
                popup: 'popup-sweet',
                title: 'title-sweet',
                htmlContainer: 'text-sweet',
                confirmButton: 'confirm-button-sweet',
                denyButton: 'deny-button-sweet',
            }
        }).finally(() => {setActiveBlur(false)});
    }
  }

  var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  function success(pos) {
    var crd = pos.coords;
    fetchDataInitial(crd.latitude, crd.longitude);
    setLoading(false);
  }

  function errors(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          if (result.state === "granted") {
            navigator.geolocation.getCurrentPosition(success, errors, options);
          } else if (result.state === "prompt") {
            navigator.geolocation.getCurrentPosition(success, errors, options);
          } else if (result.state === "denied") {
            setActiveBlur(true);
            MySwal.fire({
                icon: 'warning',
                title: 'Oops ...',
                text: 'Geolocation not allowed, this component may not function.',
                showConfirmButton: true,
                backdrop: true,
                customClass: {
                    popup: 'popup-sweet',
                    title: 'title-sweet',
                    htmlContainer: 'text-sweet',
                    confirmButton: 'confirm-button-sweet',
                    denyButton: 'deny-button-sweet',
                }
            }).finally(() => {setActiveBlur(false)});
          }
        });
    } else {
      setActiveBlur(true);
      MySwal.fire({
          icon: 'warning',
          title: 'Oops ...',
          text: 'Geolocation is not supported by this browser.',
          showConfirmButton: false,
          timer: 1700,
          backdrop: true,
          customClass: {
              popup: 'popup-sweet',
              title: 'title-sweet',
              htmlContainer: 'text-sweet',
              confirmButton: 'confirm-button-sweet',
              denyButton: 'deny-button-sweet',
          }
      }).finally(() => {setActiveBlur(false)});
    }
  }, []);

    return (
      <React.Fragment>
        <div className="weather-header" style={{display:'flex',flexDirection:'row',alignItems:'center',padding:'20px',gap:'10px',flex:'none',order:'0', alignSelf:'stretch',flexGrow:'0'}}>
          <ContentHeader text="Real-Time Weather" />
        </div>
        { loading ? (
          <><p>Loading... (You must accept the location permission in your browser)</p></>  
          ) : (
            <>
              <div className="weather-container">
                <div className="weather-box">
                  <div className="principal-column">
                    <p className="secondary-text">{response.location}</p>
                    <h2 className="temperature">{response.temperature ? response.temperature+'°' : '0°'}</h2>
                    <p className="icon-text">
                      <img className="img-icon" src={`http://openweathermap.org/img/w/${response.icon ? response.icon : '03d'}.png`} alt="Weather icon"/>
                      <span className="secondary-text">{response.condition}</span>
                    </p>
                  </div>
                  <div className="details-column-a">
                    <p className="details-text"><b>Temp feel:</b> {response.feel ? response.feel+'°' : '0°'}</p>
                    <p className="details-text"><b>Temp Max:</b> {response.temp_max ? response.temp_max+'°' : '0°'}</p>
                    <p className="details-text"><b>Temp Min:</b> {response.temp_min ? response.temp_min+'°' : '0°'}</p>
                    <p className="details-text"><b>Visibility:</b> {response.visibility} m</p>
                  </div>
                  <div className="details-column-b">
                    <p className="details-text"><b>Humidity:</b> {response.humidity}%</p>
                    <p className="details-text"><b>Pressure:</b> {response.pressure} hPa</p>
                    <p className="details-text"><b>Wind Speed:</b> {response.wind_speed} m/s</p>
                    <p className="details-text"><b>Wind Direction (Degree):</b> {response.wind_degree_direction? response.wind_degree_direction+'°' : '0°'}</p>
                  </div>
                </div>
              </div>
              <div className="search-container">
                <div className="text-search-container">
                  <span>Search specific locations:</span>
                </div>
                <SearchComponent search={search} searcher={searcher} placeholder={"Location name"} onclick={searchSpecificData}/>
              </div>
            </>
          )}
      </React.Fragment>
    );
}

export { WeatherPage };
