const express = require('express');   //to import express
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser=require('cookie-parser');
const https = require('https')
const fs = require('fs')
const path = require('path')

// create express app
const app = express();

// setup the server port
const port = process.env.PORT || 8765;

// parse request data content type application/x-www-form-rulencoded
app.use(bodyParser.urlencoded({extended: false}));
app.use(cors({origin: 'https://localhost:3000'}));

// parse request data content type application/json
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true })); // parse requests of content-type - application/x-www-form-urlencoded


// define root route
app.get('/', (req, res)=>{
    res.send('Hello World');
});


//alexandra
const userRoutes = require('./src/routes/user.route');
app.use('/evcharge/api/admin', userRoutes);

const vehicleRoutes = require('./src/routes/vehicle.route');
app.use('/evcharge/api/vehicle', vehicleRoutes);

const chargingDataRoutes = require('./src/routes/chargingData.route');
app.use('/evcharge/api/charging', chargingDataRoutes);


//polyanna
const sessions_per_point_Routes= require('./src/routes/sessions_per_point.route');
app.use('/evcharge/api/SessionsPerPoint', sessions_per_point_Routes);

const  healthcheck_Routes=require('./src/routes/healthcheck.route');
app.use('/evcharge/api/admin', healthcheck_Routes);

const sessions_per_manufacturer_Routes=require('./src/routes/sessions_per_manufacturer.route');
app.use('/evcharge/api/SessionsPerManufacturer', sessions_per_manufacturer_Routes);

const energy_cost_Routes=require('./src/routes/energy_cost.route');
app.use('/evcharge/api/EnergyCost', energy_cost_Routes);

const station_addresses_Routes=require('./src/routes/station_addresses.route');
app.use('/evcharge/api/StationAddresses', station_addresses_Routes);

const station_points_Routes=require('./src/routes/station_points.route');
app.use('/evcharge/api/StationPoints', station_points_Routes);

//stamatis
const sessions_per_Provider_Routes= require('./src/routes/sessions_per_provider.route');
app.use('/evcharge/api/SessionsPerProvider', sessions_per_Provider_Routes);

const resetSessions = require('./src/routes/resetsessions.route');
app.use('/evcharge/api/admin', resetSessions);

const station_addresses_suppliers_Routes=require('./src/routes/station_addresses_suppliers.route');
app.use('/evcharge/api/StationAddressesPerSupplier', station_addresses_suppliers_Routes);


const sessions_per_Provider_District= require('./src/routes/sessions_per_provider_per_district.route');
app.use('/evcharge/api/SessionsPerProvider/PerDistrict', sessions_per_Provider_District);

const sessions_per_Provider_Station= require('./src/routes/sessions_per_provider_per_station.route');
app.use('/evcharge/api/SessionsPerProvider/PerStation', sessions_per_Provider_Station);

const energy_Demand_Forecast= require('./src/routes/energy_demand_forecast.route');
app.use('/evcharge/api/EnergyDemandForecast', energy_Demand_Forecast);

const charging_statistics_money= require('./src/routes/charging_statistics_money.route');
app.use('/evcharge/api/ChargingStatisticsMoney', charging_statistics_money);

const charging_statistics_km= require('./src/routes/charging_statistics_km.route');
app.use('/evcharge/api/ChargingStatisticsKm', charging_statistics_km);


//stela
const stationinfoRoutes = require('./src/routes/stationInfo.router');
app.use('/evcharge/api/stationInfo',stationinfoRoutes);

const sessions_per_EV_Routes= require('./src/routes/sessions_per_EV.route');
app.use('/evcharge/api/SessionsPerEV', sessions_per_EV_Routes);

const closestStationsRoutes = require('./src/routes/closestStation.route');
app.use('/evcharge/api/ClosestStations', closestStationsRoutes);

//nikos

const loginRoutes = require('./src/routes/login.route.js');
app.use('/evcharge/api/login', loginRoutes);

const logoutRoutes = require('./src/routes/logout.route.js');
app.use('/evcharge/api/logout', logoutRoutes);

const consumptionRoutes = require('./src/routes/consumption_route.js');
app.use('/evcharge/api/report_consumption', consumptionRoutes);

// const uploadRoutes = require('./src/routes/upload_route.js');
// app.use('/evcharge/api/uploadcsv', uploadRoutes);

//katerina
const PaymentFirstPage_OwedInfo_Route = require('./src/routes/PaymentFirstPage_OwedInfo.route');
app.use('/evcharge/api/PaymentPage', PaymentFirstPage_OwedInfo_Route);

const CreatePayment_Route = require('./src/routes/CreatePayment.route');
app.use('/evcharge/api/CreatePayment', CreatePayment_Route);

const SessionsPerStation_Route = require('./src/routes/SessionsPerStation.route');
app.use('/evcharge/api/SessionsPerStation', SessionsPerStation_Route);


// const SessionsPerStation_Route = require('./src/routes/SessionsPerStation.route');
// app.use('/evcharge/api/SessionsPerStation', SessionsPerStation_Route);




// listen to the port
// app.listen(port, ()=>{
//     console.log(`Express Server is running at port ${port}`);
// });

const sslServer =https.createServer(
  {
  key: fs.readFileSync(path.join(__dirname, '.cert', 'key.pem')),
  cert : fs.readFileSync(path.join(__dirname, '.cert', 'cert.pem')),
}, app)

sslServer.listen(8765, () => console.log('secure server on port 8765'))
