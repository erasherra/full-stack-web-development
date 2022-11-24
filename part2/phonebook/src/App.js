import { useState, useEffect } from 'react'
import axios from 'axios'


const Person = (props) => {

  return (<p>{props.person.name} {props.person.number}</p>)
}

const Persons = (props) => {

  return(
    <div>
    {props.personsToShow.map(person => 
      <Person key={person.name} person={person} />
    )}
  </div>
  )
}

const Filter = (props) => {

  return (
    <div>
          filter shown with: <input 
          value={props.filter}
          onChange={props.handleFilterChange}
          />
        </div>
  )
}

const PersonForm = (props) => {

  return (
    <div>
          <form onSubmit={props.addPerson}>
        <div>
          <div>
          name: <input 
          value={props.newName}
          onChange={props.handleNoteChange}
          />
        </div>
        <div>
          number: <input 
          value={props.newNumber}
          onChange={props.handleNumberChange}
          />
        </div>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}


const App = () => {

  //const [newID, setID] = useState(1)

  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])

  const validate = () => {
    let nameAlreadyExists = persons.some(person => person.name === newName)
    if(nameAlreadyExists){
      alert(`${newName} is already added to phonebook`)
      return false;
    }
    return true;
  }

  const addPerson = (event) => {
    event.preventDefault()

    if(!validate()){
      return;
    }
    //setID(newID + 1)
    const personObject = {
      //id: newID,
      name: newName,
      number: newNumber
    }
  
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  const handleNoteChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
        <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      <h2>add a new</h2>
      <PersonForm 
      addPerson={addPerson}
      newName={newName}
      handleNoteChange={handleNoteChange}
      newNumber={newNumber}
      handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <ul>
      <Persons personsToShow={personsToShow} />
        
      </ul>
    </div>
  )
}

export default App
