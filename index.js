const express = require('express')
const app = express()
const logger = require('./loggerMiddleware')
const cors = require('cors')

// Midlewares
app.use(express.json())
app.use(logger)
app.use(cors())

let notes = [
  {
    id: 1,
    name: 'Karen',
    title: 'Amorcito',
    important: true
  },
  {
    id: 2,
    name: 'Michel',
    title: 'Negro Garka',
    important: false
  },
  {
    id: 3,
    name: 'Miguel',
    title: 'Gordo Forro',
    important: false
  }
]

app.get('/', (req, res) => {
  res.send('<h1>Hello World</h1>')
})

app.get('/api/notes', (req, res) => {
  res.json(notes)
})

app.get('/api/notes/:id', (req, res) => {
  const id = req.params.id
  const note = notes.find(item => item.id === Number(id))
  if (note) {
    res.json(note)
  } else {
    res.status(404).end()
  }
})

app.delete('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  notes = notes.filter(item => item.id !== id)
  res.status(204).end()
})

app.post('/api/notes', (req, res) => {
  const note = req.body

  if (!note || !note.content) {
    return res.status(400).json({
      error: 'note.content is missing'
    })
  }

  const ids = notes.map(note => note.id)
  const mxId = Math.max(...ids)

  const newNote = {
    id: mxId + 1,
    content: note.content,
    important: typeof note.important !== 'undefined' ? note.important : false,
    date: new Date().toISOString()
  }
  notes = [...notes, newNote]

  res.status(201).json(newNote).end()
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
