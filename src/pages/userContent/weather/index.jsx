import React, { useState, useEffect, useContext} from 'react';
import { GlobalContext } from '../../../context/GlobalContext';
import { ContentHeader } from '../../../components/Shared/ContentHeader';
import { SearchComponent } from '../../../components/Shared/SearchComponent';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import './index.css';
const MySwal = withReactContent(Swal);

function WeatherPage() {
  // const history = useHistory();
  const { setActiveBlur } = useContext(GlobalContext);
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState({});
  const [search, setSearch] = useState("")
  const bgColors = ['#EBBE46','#B57FFF','#4285FF','#DC7E80'];

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
        console.log(data);
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
        console.log(data);
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
        // Manejar el error
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
            //If granted then you can directly call your function here
            navigator.geolocation.getCurrentPosition(success, errors, options);
          } else if (result.state === "prompt") {
            //If prompt then the user will be asked to give permission
            navigator.geolocation.getCurrentPosition(success, errors, options);
          } else if (result.state === "denied") {
            //If denied then you have to show instructions to enable location
          }
        });
    } else {
      console.log("Geolocation is not supported by this browser.");
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
                      <img className="img-icon" src={`http://openweathermap.org/img/w/${response.icon}.png`} alt="Weather icon"/>
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
              <SearchComponent search={search} searcher={searcher} placeholder={"Search a specific location"} onclick={searchSpecificData}/>
            </>
          )}
      </React.Fragment>
    );
}

export { WeatherPage };
