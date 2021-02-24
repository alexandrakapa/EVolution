const express = require('express');   //to import express
const bodyParser = require('body-parser');
const cookieParser=require('cookie-parser');
const cors = require('cors');

// create express app
const app = express();

// setup the server port
const port = process.env.PORT || 8765;

// parse request data content type application/x-www-form-rulencoded
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors({origin: 'http://localhost:3000'}));

// parse request data content type application/json
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true })); // parse requests of content-type - application/x-www-form-urlencoded

// define root route
app.get('/', (req, res)=>{
    res.send('Hello World');
});


// import user routes
const loginRoutes = require('./src/routes/login.route.js');


app.use('/login', loginRoutes);


// listen to the port
app.listen(port, ()=>{
    console.log(`Express Server is running at port ${port}`);
});
