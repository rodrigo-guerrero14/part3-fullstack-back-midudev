const mongoose = require('mongoose')
const password = require('./password')

const conectionString = `mongodb+srv://elrodra:${password}@cluster0.firky.mongodb.net/app?retryWrites=true&w=majority`

// conexion a mongodb
mongoose.connect(conectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})
  .then(() => { console.log('database is connected') })
  .catch(err => { console.error(err) })
