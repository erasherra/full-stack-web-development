import { useState, useEffect } from 'react'
import axios from 'axios'
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import Filter from './components/Filter';
import personService from './services/persons'; 


const App = () => {

  //const [newID, setID] = useState(1)

  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const runDummy = false;

  useEffect(() => {
    
    runDummy ? axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log(response)
        setPersons(response.data)
      })
      :
      personService.getAll().then(persons => setPersons(persons))
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
    
    if(runDummy){
      setPersons(persons.concat(personObject))
    }else{
      personService.create(personObject).then(persons => setPersons(persons))
    }
    
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
