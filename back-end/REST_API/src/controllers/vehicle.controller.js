const CarModel = require('../models/vehicle.model');

// get vehicle by id

exports.getvehiclebyid = (req, res)=>{
    CarModel.getVehicleByID(req.params.vehicleID,(err, vehicle)=>{
        if(err)
        res.send(err);
        console.log('single vehicle data',vehicle);
        res.send(vehicle);
        return;
    });
}


exports.getCarList = (req, res)=> {  //exports.nameOfTheMethod
    CarModel.getAllCars((err, car) =>{
        console.log('We are here');
        if(err)
        res.send(err);
        console.log('User', car);
        res.send(car)
    })
}

//get vehicle by owner
exports.getvehiclebyowner = (req,res) => {
    CarModel.getVehicleByOwner(req.params.username,(err, vehicle)=>{
        if(err)
        res.send(err);
        console.log('Vehicle data about owner',vehicle);
        res.send(vehicle);
        return;
    });
}
