const Course = ({course}) => {

    const initialValue = 0
    const total = course.parts.reduce((sum, part) => {
      return sum + part.exercises;
    }, initialValue)
  
    return(
      <div>
  
        <h2>
          {course.name}
        </h2>
        
        {course.parts.map(part =>  <p key={part.id}>{part.name + " " + part.exercises}</p>)}
  
        <b>{total}</b>
      </div>
    )
  
}

export default Course;