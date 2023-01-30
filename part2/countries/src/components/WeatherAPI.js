import { useState, useEffect } from 'react'
import axios from 'axios'



function WeatherAPI({capital}) {
  const api_key = process.env.REACT_APP_API_KEY;
    const [weather, setWeather] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
  
    console.log(capital);

    const getWeather = () => {
      setIsLoading(true);
      axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}`).then(response => response.data).then((data) => {

            console.log("asd1")
            setWeather(data)
            console.log("asd", data)
            setIsLoading(false);
          }).catch(e => {
            console.log("dsaaa1")
            console.log("dsaaa",e)
          })
    
    }

    useEffect(() => {
      getWeather()
    }, [])

    console.log(weather)
    console.log(`http://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=${api_key}`)

    return (
      <div>
      {isLoading ? 
      <p>Loading..</p>
      :
      <div>
        <h2>Weather in {capital}</h2>
        
        <p>temperature {weather.main.temp} Celcius</p>
        <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
        <p>wind {weather.wind.speed}</p>
        
      </div>
      
      }
      </div>
    );
  };

export default WeatherAPI;