
import { useState, useEffect } from 'react'
import axios from 'axios'
import WeatherAPI from './components/WeatherAPI';
import Filter from './components/Filter';

const Country = (props) => {

  return (
    props.len > 1  ?
    <div>
      <h4>{props.country.name.common}<button onClick={props.clickAction}>show</button></h4>
      
    </div>
    :
    <div>
      <h1>{props.country.name.common}</h1>
      <p>capital {props.country.capital}</p>
      <p>area {props.country.area}</p>
      <h3>Languages:</h3>
      <div>
        <ul>
            {Object.values(props.country.languages).map((lang, index) => <li key={index}>{lang}</li>)}

        </ul>
      </div>
      <img  src={Object.values(props.country.flags)[0]} alt={props.country.name.common}/>
      <WeatherAPI capital={props.country.capital[0]}/>
    </div>
    

  )

}

const Countries = ({countries = [], setFilter}) => {

  console.log(countries)

  const clickAction = (index) => {
    setFilter(countries[index].name.common)
  }

  if(countries.length > 10){

    return(
      <div>
        <p>Too many matches, specify another filter</p>
      </div>
    )
    
  }
  else {
    return(
        <div>
            {countries.map((country ,index) => <Country key={index} country={country} len={countries.length} clickAction={() => clickAction(index)}/>)}
        </div>
    )
  }

  
}


function App() {

  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  
  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const filterCountries = (event) => {
    
    setFilter(event.target.value);

  }

  

  const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div className="App">
      <Filter filter={filter} handleFilterChange={filterCountries}/>
      
      <Countries countries={filteredCountries} setFilter={setFilter}/>
    </div>
  );
}

export default App;
