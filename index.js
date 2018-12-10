const express = require('express')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const path = require('path')
const mongoose = require('mongoose')

//connects to db
mongoose.connect('mongodb://127.0.0.1:27017/COFFEE_ORDERS', { useNewUrlParser: true } );

//tests connection
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('connected')
});

//defines a coffe order
var CoffeOrderSchema = new mongoose.Schema({
  name: String,
  coffeeType: String
}, 
{
  timestamps: true
});

// creates a mongoose model from the schema we defined
var CoffeeOrder = mongoose.model('CoffeeOrder', CoffeOrderSchema);


// const mustacheExpress = require('mustache-express') // example for using server side views

var movies = [
  {title: 'whatever', date: '00009'}, 
  {title: 'whatever 2', date: 'ojlkn'}, 
  {title: 'whoever 2', date: 'sdfsfd'}
]
// I mentioned this bit of code already, just make sure that it's in the server once at the top of the file
if (process.env.NODE_ENV == 'development') {
  require('dotenv').config()
}

const app = express()

// this is so that express can parse the incoming `req.body` into json, somewhere at the top of the server file:
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// if the app is using server side templating like mustache:
// make sure to create a views folder
// app.engine('mustache', mustacheExpress())
// app.set('views', './views')
// app.set('view engine', 'mustache')

// set usefull headers:
app.all('*', function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,HEAD,OPTIONS,POST,PUT,DELETE'
  )
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization'
  )
  next()
})

// to prevent security threats, Helmet will set headers to sensible defaults, and allows tweaking them as needed:
app.use(helmet())

// ROUTES GO HERE
app.get('/api/orders', function (req, res, next) {

  CoffeeOrder.find(function(err, theOrders){
    if (err) return console.error(err);
    res.json({orders: theOrders})
  })
  
})

app.post('/api/create/order', function(req, res, next){

  const orderName = req.body.name
  const orderType = req.body.type

  var NewCoffeeOrder = new CoffeeOrder({ name: orderName, coffeeType: orderType });

  NewCoffeeOrder.save(function (err, newOrder) {
    if (err) return console.error(err);
    console.log('created', newOrder)
    res.json({created: newOrder})
  });


})


// below all of the routes:
if (process.env.NODE_ENV === 'production') {
  // if the client is a create-react-app, go to the .gitignore in the client folder, and take out
  // the word 'build' so that it isn't hidden from git and heroku

  // serves up the static files
  app.use(express.static('public'))
  // if the app is a single page app, like a react app that uses react router for example
  app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
  )
}

// at the bottom of the server file, set the port like this, so that heroku can set the port when the server is being hosted there
const PORT = process.env.PORT || 5000
app.listen(PORT, function () {
  console.log('\n\n===== listening for requests on port ' + PORT + ' =====\n\n')
})
