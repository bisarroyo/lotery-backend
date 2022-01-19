const mongoose = require('mongoose');
const {db} = require('./config/config');


// Connect to MongoDB
const URL = `mongodb+srv://${db.user}:${db.password}@cluster0.jy2cj.mongodb.net/${db.database}?retryWrites=true&w=majority`
mongoose.connect(URL).
  then(()=> console.log("Connected to mongoDB")).
  catch(err=> console.error(err))

mongoose.Promise = global.Promise;

