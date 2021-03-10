var dbConn  = require('../../config/db.config');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const salt=10;//hash parameter
const dotenv = require("dotenv");
const sha512crypt = require("sha512crypt-node").sha512crypt;
const jwt_decode =require("jwt-decode");
dotenv.config();

var Logout = function(logout){
    this.id = logout.id;
    this.username     =   logout.username;
    this.token = logout.token;
    this.category ="";
    this.sessionID =logout.sessionID;

}

Logout.logMeOut = async(req,res) =>{
    var tok = req.headers["x-access-token"];
    var csid = jwt_decode(tok).sessionID;
    var csum = jwt_decode(tok).username;
    var csct = jwt_decode(tok).category;
    Logout.username = csum;
    Logout.sessionID =csid;
    Logout.category = csct;

    Logout.sessionID +=1;
    qur = "UPDATE "+Logout.category+" SET sessionID = "+Logout.sessionID+" WHERE username= '"+ Logout.username+"'";
    console.log(qur);
    dbConn.query(qur, (err, result)=>{
        if(err){
            console.log('Error while fetching user by username', err);
            res(err, null);
            return;
        }else{
            res(null, "ok");
            return;
        }
    })
}
module.exports = Logout;