const express = require('express');
const bodyParser = require('body-parser');
const path =require('path')
const cors = require('cors');
const passport =require('passport');
//const {mongoose} = require('./db.js');
const mongoose = require('mongoose');

const config =require('./config/database.js');

var employeeController = require('./controllers/employeeController.js');
var usersController = require('./controllers/usersController.js');
var app = express();

//database connection
mongoose.connect(config.database,(err)=>{
    if(!err)
      console.log('Mongodb connection suceeded..');
    else
      console.log('Error in DB connection :'+ JSON.stringify(err,undefined,2));
});


app.use(bodyParser.json());
app.use(cors({origin:'http://localhost:4200'}));

app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, () =>{ console.log('Server started at port 3000')});

//passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/employees',employeeController);
app.use('/users',usersController);

app.get('/',(req,res)=>{
    res.send('Invalid Endpoint');
});