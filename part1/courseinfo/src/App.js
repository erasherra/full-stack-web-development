const Header = (props) => {
  return (
    <div>
      <h1>
        {props.title}
      </h1>
    </div>
  )
}

const Part = (props) => {

  return (<p>{props.partName} {props.partExercises}</p>)
}

const Content = (props) =>  {
  
  return(
    <div>
    {props.parts.map(part => { return <Part key={part.partName} partName={part.partName} partExercises={part.partExercises} />})}
  </div>
  )
  
}


const Total = (props) => {
  
  let total = 0
  
  props.parts.forEach(part => {total += part.partExercises})
  
  return (
    <div>
      {total}
    </div>
  )
}

const App = () => {
  const course = {
    courseName: 'Half Stack application development',
    parts: [
      {
        partName: 'Fundamentals of React',
        partExercises: 10
      },
      {
        partName: 'Using props to pass data',
        partExercises: 7
      },
      {
        partName: 'State of a component',
        partExercises: 14
      }
    ]
  }

  

  return (
      <div>
        <Header title={course.courseName} />
        <Content parts={course.parts} />
        <Total parts={course.parts} />
      </div>
  )
}



export default App