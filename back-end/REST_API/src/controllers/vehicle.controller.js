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
