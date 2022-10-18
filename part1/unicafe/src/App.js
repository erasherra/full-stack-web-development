import { useState } from 'react'

const Button = (props) =>{

  return (
    <button onClick={props.action}>
      {props.name}
    </button>
  );
}

const FeedBack = (props) =>{

  return (
    <div>
      <Button name="good" action={props.setGoodState}/>
      <Button name="neutral" action={props.setNeutralState}/>
      <Button name="bad" action={props.setBadState}/>
    </div>
  );
}

const StatisticLine = (props) =>{
  return(
    <p>{props.name} {props.value}</p>
    )
}

const Statistics = (props) =>{
  let all = props.bad + props.neutral + props.good;
  let avrg = (-1 * props.bad  + props.good) / all ;
  let pos = props.good / all * 100
  return (
    
    
      all ? <div>
      <StatisticLine name="good" value={props.good} />
      <StatisticLine name="neutral" value={props.neutral} />
      <StatisticLine name="bad" value={props.bad} />
      <StatisticLine name="all" value={all} />
      <StatisticLine name="average" value={Number(avrg).toFixed(1)} />
      <StatisticLine name="positive" value={Number(pos).toFixed(1) + "%"} />
    </div> : <p>No feedback given</p>
  
  );
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <FeedBack 
      setGoodState={() => setGood(good + 1)}
      setNeutralState={() => setNeutral(neutral + 1)}
      setBadState={() => setBad(bad + 1)}
      />
      <h1>statistics</h1>
      <Statistics 
      good={good}
      neutral={neutral}
      bad={bad}
      />
    </div>
  )
}

export default App
