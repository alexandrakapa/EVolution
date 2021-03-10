var dbConn  = require('../../config/db.config');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const salt=10;//hash parameter
const dotenv = require("dotenv");
const sha512crypt = require("sha512crypt-node").sha512crypt;
const jwt_decode =require("jwt-decode");
dotenv.config();

var Consumer = function(user){
    this.id = user.id;
    this.username     =   user.username;
    this.token = user.token;
    this.category ="";
    this.sessionID =user.sessionID;

}
  Consumer.fetchStats = async(req,res) =>{
    qur = "SELECT SUM(Charging.charging_price), Car.model FROM Charging RIGHT OUTER JOIN (Car RIGHT OUTER JOIN Car_Manufacturer ON Car.Car_ManufacturerID=Car_Manufacturer.ID ) ON Charging.CarID=Car.ID WHERE (Car_Manufacturer.company_name='"+req.body.manufacturer+"' AND (DATE(STR_TO_DATE(Charging.the_date, '%d/%m/%Y %h:%i %p'))>= STR_TO_DATE('"+req.body.start_date+"','%Y%m%d') AND DATE(STR_TO_DATE(Charging.the_date, '%d/%m/%Y %h:%i %p'))<= STR_TO_DATE('"+req.body.end_date+"','%Y%m%d')  ))GROUP BY Car.model";
    dbConn.query(qur, (err, result)=>{
        if(err){
            console.log('Error while fetching user by username', err);
            res(err, null);
            return;
        }else{
            res(null, result);
            return;
        }
    })
}
module.exports = Consumer;