import { useState } from 'react'

const Button = (props) =>{

  return(
    <button onClick={props.action}>
      {props.name}
    </button>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
   
  let initialVotes = new Array(anecdotes.length).fill(0);

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(initialVotes)

  const randomText = () => {
    const len = anecdotes.length;
    setSelected(Math.floor(Math.random() * len));
  }

  const voteText = () => {
    let copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  const mostVotes = () => {
    const max = Math.max(...votes);
    console.log(votes.indexOf(max))
    return votes.indexOf(max);
  }

  return (
    <div>
      <div>
        <h1>Anecdote of the day</h1>
        {anecdotes[selected]} {votes[selected]} votes
        <div>
          <Button action={randomText} name="next anecdote"/>
          <Button action={voteText} name="vote"/>
        </div>
      </div>
      <div>
        <h1>Anecdote with most votes</h1>
        <p>{anecdotes[mostVotes()]}</p>
        <p>has {votes[mostVotes()]} votes</p>
      </div>
    </div>
  )
}

export default App
