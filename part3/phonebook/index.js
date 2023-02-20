const PORT = process.env.PORT || 3001

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

morgan.token('POST', function (req, res) { return JSON.stringify(req.body) })

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(morgan('combined'))
app.use(cors())

let notes = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
  response.json(notes)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const note = notes.find(note => note.id === id)
    if (note) {
        response.json(note)
      } else {
        response.status(404).end()
      }
  })

  app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    var removeIndex = notes.map(item => item.id).indexOf(id);

    ~removeIndex && notes.splice(removeIndex, 1);
    response.json(notes)
  })

  app.post('/api/persons', (request, response) => {

    const body = request.body;
    
  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  const nameAlreadyExists = notes.find(note => note.name === body.name)
  if (nameAlreadyExists) {
    return response.status(400).json({ 
      error: 'name must be unique' 
    })
  }

  const id = Math.floor(Math.random() * 100000000);

  const note = {
    id: id,
    name: body.name,
    number: body.number
    
  }
  

  notes = notes.concat(note)

  response.json(notes) //response.json(note) 
  })

app.get('/info', (request, response) => {
    const date = new Date().toString()
    response.send(
    '<p>Phonebook has info for '
     + notes.length + 
     ' people</p>' +
     '<p>' + date + '</p>'
     )
  })


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})