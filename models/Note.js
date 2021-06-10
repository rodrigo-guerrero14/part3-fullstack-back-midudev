const { Schema, model } = require('mongoose')

const noteSchema = new Schema({
  content: String,
  date: Date,
  important: Boolean
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Note = model('Note', noteSchema)

// const note = new Note({
//   content: 'Una nueva nota hecha con mongoose en mongodb',
//   date: new Date(),
//   important: true
// })

// note.save()
//   .then(result => {
//     console.log('Works')
//     console.log(result)
//     mongoose.connection.close()
//   })
//   .catch(err => console.log(err))

module.exports = Note
