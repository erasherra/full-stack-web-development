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

  export default PersonForm;