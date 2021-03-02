var dbConn  = require('../../config/db.config');

var Charging = function(charging) {
  this.ID = charging.ID
  this.connection_time = charging.connection_time
  this.disconnection_time = charging.disconnection_time
  this.done_charging_time = charging.done_charging_time
  this.kWh_delivered = charging.kWh_delivered
  this.protocol = charging.protocol
  this.battery_percent_begin = this.battery_percent_begin
  this.battery_percent_end = charging.battery_percent_end
  this.the_date = charging.the_date
  this.charging_price = charging.charging_price
  tihs.still_owed = charging.still_owed
  this.km_total = charging.km_total
  this.km_between_charges = charging.km_between_charges
  this.Car_Ownerusername = charging.Car_Ownerusername
  this.CarID = charging.CarID
  this.SpaceStationID = charging.SpaceStationID
  this.Spacename = charging.Spacename
  this.supplierID = charging.supplierID
}



Charging.getChargingData = (chargingID,result) => {
  dbConn.query('SELECT * FROM Charging WHERE ID = ?' , chargingID, (err, res)=>{
      if(err){
          console.log('Error while fetching charging by ID', err);
          result(null,err);
      }else{
          result(null,res);
      }
  });
}

Charging.getChargingCost = (chargingID,result) => {
  dbConn.query('SELECT kWh_delivered*charging_price as total_cost FROM `Charging` WHERE ID = ?' , chargingID, (err, res)=>{
      if(err){
          console.log('Error while fetching charging cost by ID', err);
          result(null,err);
      }else{
          result(null,res);
      }
  });
}


module.exports = Charging;
