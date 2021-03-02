var dbConn  = require('../../config/db.config');

var Car = function(car) {
  this.ID = car.ID;
  this.plates = car.plates;
  this.model = car.model;
  this.usable_battery_size = car.usable_battery_size;
  this.Car_Ownerusername = car.Car_Ownerusername;
  this.Car_ManufacturerID = car.Car_ManufacturerID;
}

Car.getAllCars = (result) =>{
  dbConn.query('SELECT * FROM Car', (err, res)=>{
        if(err){
            console.log('Error while fetching employess', err);
            result(null,err);

        }else{
            console.log('Employees fetched successfully');
            result(null,res);

        }
    })
}



Car.getVehicleByID = (vehicleID,result) => {
  dbConn.query('SELECT * FROM Car WHERE ID = ?' , vehicleID, (err, res)=>{
      if(err){
          console.log('Error while fetching vehicle by ID', err);
          result(null,err);
      }else{
          result(null,res);
      }
  });
}

module.exports = Car;
