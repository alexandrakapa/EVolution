const express = require('express');   //to import express
const bodyParser = require('body-parser');

// create express app
const app = express();

// setup the server port
const port = process.env.PORT || 8765;

// parse request data content type application/x-www-form-rulencoded
app.use(bodyParser.urlencoded({extended: false}));

// parse request data content type application/json
app.use(bodyParser.json());

// define root route
app.get('/', (req, res)=>{
    res.send('Hello World');
});

// import owner routes
//const ownerRoutes = require('./src/routes/owner.route');
const userRoutes = require('./src/routes/user.route');

// create owner routes
app.use('/evcharge/api/admin', userRoutes);

const sessions_per_point_Routes= require('./src/routes/sessions_per_point.route');

app.use('/evcharge/api/SessionsPerPoint', sessions_per_point_Routes);

const sessions_per_Provider_Routes= require('./src/routes/sessions_per_provider.route');

app.use('/evcharge/api/SessionsPerProvider', sessions_per_Provider_Routes);

const resetSessions = require('./src/routes/resetsessions.route');

app.use('/evcharge/api/admin', resetSessions);

// listen to the port
app.listen(port, ()=>{
    console.log(`Express Server is running at port ${port}`);
});
