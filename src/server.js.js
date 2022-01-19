const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// require('./database')
const { port } = require('./config/config');
const {logError, errorHandler, boomErrorHandler} = require('./middlewares/error.handler');

const app = express();

//cors configuration 
const whiteList = ['http://localhost:4000/']
const corsOptions ={
  origin: function(origin, callback) {
    if(whiteList.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allwed by cors'));
    }
  }
}

app.use(express.json());
app.use(cors(corsOptions));
app.use(morgan('dev'))

app.get('/', function (req, res) {
  res.send('Hello World!');
})

app.use(logError);
app.use(errorHandler);
app.use(boomErrorHandler);

app.listen(port, function () {
  console.log(`app running at http://localhost:${port}/`);
})