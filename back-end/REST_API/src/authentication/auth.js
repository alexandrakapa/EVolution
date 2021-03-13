var dbConn  = require('../../config/db.config');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const salt=10;//hash parameter
const dotenv = require("dotenv");
const sha512crypt = require("sha512crypt-node").sha512crypt;
const jwt_decode =require("jwt-decode");
dotenv.config();
var Validator = function(validator){
    this.id = validator.id;
    this.username     =   validator.username;
    this.token = validator.token;
    this.category ="";
    this.sessionID =validator.sessionID;

}
Validator.checkToken = async(tokid,tuname, cat,result) =>{
    qur = "SELECT * FROM "+cat+" WHERE username= '"+ tuname+"'";
    console.log(qur);
    dbConn.query(qur, (err, res)=>{
        if(err){
            result(err, null);
            return;
        }else{
            if(res[0].sessionID == null){
                result(err, null);
                return; 
            }
            if(res[0].sessionID ==tokid){
            result(null, "ok");
            return;
            }else{
                result(null, "no");
                return;
            }
        }
    })
};


exports.findByToken =  (req, result,next,isAdmin) => {
    var tok = req.headers["x-access-token"];
    Validator.token =tok;
    if (!tok) {
        result.status(401).send("Not authorized");


    }else{
        jwt.verify(tok,  process.env.TOKEN_SECRET, (err, decoded) => {
        if (err) {
            result.status(401).send("Not authorized");
        }else{
        var csid = jwt_decode(tok).sessionID;
        var csum = jwt_decode(tok).username;
        var csct = jwt_decode(tok).category;
        console.log(csct)
        Validator.username = csum;
        Validator.sessionID =csid;
        Validator.category = csct;
        Validator.checkToken(csid,csum,csct,(err,res)=>{
            if(err){
                result.status(401).send("Not authorized");
            }
            if((isAdmin==0 && res == "ok")||(isAdmin==1 &&csct=="Admin" && res == "ok")){
                next(req,result);
                return;

            }else{
                result.status(401).send("Not authorized");
            }
        });

        }
        });
    }
  };