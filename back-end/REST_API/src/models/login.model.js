var dbConn  = require('../../config/db.config');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const salt=10;//hash parameter
const dotenv = require("dotenv");
const sha512crypt = require("sha512crypt-node").sha512crypt;
const jwt_decode =require("jwt-decode");
dotenv.config();

var Login = function(login){
    this.id = login.id;
    this.username     =   login.username;
    this.password      =   login.password;
    this.email          =   login.email;
    this.company_name ="";
    this.token = login.token;
    this.is_user = 0;
    this.category ="";
    this.sessionID =login.sessionID;

}

Login.findByAdmin = async(username, result)=>{
    quer = "SELECT * FROM Admin WHERE username= '"+ username.username+"'";
    console.log(quer);
    dbConn.query(quer, (err, res)=>{
        if(err){
            console.log('Error while fetching user by username', err);
            result(err, null);
            return;
        }else{
            if(res[0] !=undefined){
            console.log("found admin");
            Login.username = res[0].username;
            Login.password = res[0].password;
            Login.category = "Admin";
            Login.sessionID= res[0].sessionID;
            result(null, res[0]);
            return;
            }else{
                result(null, null);
                return;
            }
        }
    })
}
Login.findByManufacturerUsername = async(username, result)=>{

    dbConn.query("SELECT * FROM Car_Manufacturer WHERE username= '"+ username.username+"'", (err, res)=>{
        if(err){
            console.log('Error while fetching user by username', err);
            result(err, null);
            return;
        }else{
            if(res[0] !=undefined){
            console.log("found man");
            Login.id = res[0].ID;
            Login.username = res[0].username;
            Login.password = res[0].password;
            Login.category = "Car_Manufacturer";
            Login.company_name = res[0].company_name;
            Login.sessionID= res[0].sessionID;
            Login.is_user = res[0].is_user;
            console.log("id "+Login.id+" username: "+Login.username+" password: "+Login.password+" category: "+Login.category)
            result(null, res[0]);
            return;
            }else{
                result(null, null);
                return;
            }
        }
    })
}

Login.findBySupplierUsername = (username, result)=>{

    dbConn.query("SELECT * FROM Energy_Supplier WHERE username= '"+ username.username+"'", (err, res)=>{
        if(err){
            console.log('Error while fetching user by username', err);
            result(err, null);
            return;
        }else{
            console.log("found supplier");
            if(res[0] != undefined){
            Login.id = res[0].ID;
            Login.username = res[0].username;
            Login.password = res[0].password;
            Login.category = "Energy_Supplier";
            Login.company_name = res[0].company_name;
            Login.sessionID= res[0].sessionID;
            Login.is_user = res[0].is_user;
            console.log("id "+Login.id+" username: "+Login.username+" password: "+Login.password+" category: "+Login.category)
            result(null, res[0]);
            return;
            }else{
                result(null, null);
                return;
            }
        }
    })
}

Login.findByOwnerUsername = (username, result)=>{
    console.log("found owner");
    dbConn.query("SELECT * FROM Car_Owner WHERE username= '"+ username.username+"'", (err, res)=>{
        if(err){
            console.log('Error while fetching user by username', err);
            result(err, null);
            return;
        }else{
            if(res[0] !=undefined){

            Login.username = res[0].username;
            Login.password = res[0].password;
            Login.category = "Car_Owner";
            Login.sessionID= res[0].sessionID;
            console.log("id "+Login.id+" username: "+Login.username+" password: "+Login.password+" category: "+Login.category)
            result(null, res[0]);
            return;
            }else{
                result(null, null);
                return;
            }
        }
    })
}
// get all users
Login.comparePassword = function(password,resp){
var start=Date.now();
var origHash = this.password,
    parts = origHash.split('$'),
    rounds = parts[2],
    salt = '$' + parts[1] + '$' + rounds + '$' + parts[3];
var hash = sha512crypt(password, salt);
console.log("verified", hash === origHash);
var fin= Date.now();
var inbetween=(fin-start)/1000+"secs";
console.log("here: "+inbetween);
if((Login.category =="Car_Owner"&&hash === origHash)||(Login.category =="Energy_Supplier" &&Login.is_user==1 &&hash === origHash)||(Login.category =="Car_Manufacturer" &&Login.is_user==1 &&hash === origHash)||(Login.category =="Admin"&&hash === origHash)) return(resp(null,true));
else return(resp(null,false));
}


Login.generateToken = function(resp){
    var category = Login.category;
    console.log(category);
    if(category == "Car_Manufacturer"){
        console.log("man");
        var elems = {username:Login.username,id:Login.id,company_name:Login.company_name,category: Login.category,sessionID:Login.sessionID}
        Login.token = jwt.sign(elems,process.env.TOKEN_SECRET, { expiresIn: '2 days' });
    }else if(category == "Car_Owner"){
        console.log("owner");
        var elems = {username:Login.username, category: Login.category,sessionID:Login.sessionID}
        Login.token = jwt.sign(elems,process.env.TOKEN_SECRET, { expiresIn: '2 days' });
    }else if(category=="Energy_Supplier"){
        console.log("supplier");
        var elems = {username:Login.username,id:Login.id,company_name:Login.company_name,category: Login.category,sessionID:Login.sessionID}
        Login.token = jwt.sign(elems,process.env.TOKEN_SECRET, { expiresIn: '2 days' });

    }else if(category=="Admin"){
        console.log("admin");
        var elems = {username:Login.username,category: Login.category,sessionID:Login.sessionID}
        Login.token = jwt.sign(elems,process.env.TOKEN_SECRET, { expiresIn: '2 days' });

    }

    resp(null,Login);
    return;
}
Login.checkToken = async(tokid,tuname, cat,result) =>{
    qur = "SELECT * FROM "+cat+" WHERE username= '"+ tuname+"'";
    console.log(qur);
    dbConn.query(qur, (err, res)=>{
        if(err){
            console.log('Error while fetching user by username', err);
            result(err, null);
            return;
        }else{
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
Login.findByToken = async (tok, result) => {

    if (!tok) {
        result(null,"fail");
        return;
    }else{
        jwt.verify(tok,  process.env.TOKEN_SECRET, (err, decoded) => {
        if (err) {
            console.log("stranger");
            result(null,"fail");
            return;
        }else{
        console.log("dec:"+Object.getOwnPropertyNames(jwt_decode(tok)));
        var csid = jwt_decode(tok).sessionID;
        var csum = jwt_decode(tok).username;
        var csct = jwt_decode(tok).category;
        Login.checkToken(csid,csum,csct,(err,res)=>{
            if(err){
                console.log(err);
            }
            if(res == "ok"){
                console.log("No no here we are");
                console.log(csum);
                result(null,csum);
                return;
            }else{
                result(null,"fail");
                return;
            }
        });

        }
        });
    }
    console.log("result: "+result);
  };

  Login.verifyToken = function(tok,req, result,next) {

    if (!tok) {

      return result.status(403).send({
        message: "No token provided!"
      });
    }

    jwt.verify(tok, config.secret, (err, decoded) => {
      if (err) {
        return result.status(401).send({
          message: "Unauthorized!"
        });
      }
      this.id = decoded.id;

    });
  };

// User.deleteToken = function(token, resp){
//     dbConn.query('UPDATE ? SET token=NULL', user.category, (err, res)=>{
//         if(err){
//             console.log('Error while fetching user by username', err);
//             result(null, err);
//         }else{
//             result(null, res);
//         }
//     })
//     this.token =-1;

// }

Login.test = async (test_pam,err,result)=>{
    if(err){
        result(err, null);
        return;
    }
    result(null,res);
    return;
}
module.exports = Login;
