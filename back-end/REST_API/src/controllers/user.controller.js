const UserModel = require('../models/user.model');
const sha512crypt = require("sha512crypt-node").sha512crypt;
var crypto = require('crypto')

// get all user list
exports.getUserList = (req, res)=> {  //exports.nameOfTheMethod
  UserModel.getAllUser((err, user) =>{
        console.log('We are here');
        if(err)
        res.send(err);
        console.log('User', user);
        res.send(user)
    })

}

// get user by username
exports.getOwnerByUsername = (req, res)=>{
    UserModel.getOwnerByUsername(req.params.username, (err, user)=>{
        if(err)
          res.send(err);
        if (user.length>0) {
          console.log('single user data',user);
          res.send(user);
        }
        else { //the user isnt a car user
          UserModel.getManufacturerByUsername(req.params.username, (err, manufacturer)=>{
            if(err)
              res.send(err);
            if (manufacturer.length>0) {
              console.log('single manufacturer data',manufacturer);
              res.send(manufacturer);
            }
              else { //the user isnt a car manufacturer
                UserModel.getEnergySupplierByUsername(req.params.username, (err, supplier)=>{
                  if(err)
                    res.send(err);
                  if (supplier.length>0) {
                    console.log('single supplier data',supplier);
                    res.send(supplier);
                    }
                  else {
                    res.statusMessage = "No data";
                    res.status(402).send("There is no user in this database with username: " + req.params.username);
                  }
                })
              }
          })
        }
    })
}


exports.createOrUpdateUser = (req,res) => {
  const userReqData = new UserModel(req.body);
  userReqData.username = req.params.username;
  userReqData.password = req.params.password;
  var ran =crypto.randomBytes(16).toString('base64');
  const salt = '$6$rounds=1000$'+ ran;
  var fin_pas = sha512crypt(userReqData.password, salt);
  UserModel.updateUser(req.params.username, fin_pas,userReqData, (err, user)=>{
       if(err)
       {
         res.send(err);
       }
       if(user.length>0)
       {
         res.send("User with username : " + req.params.username + " has new password : " + req.params.password  ); //password changed
       }
       else {
         console.log('userReqData',userReqData);
         {
               UserModel.createUser(req.params.username,fin_pas, userReqData, (err, user)=>{
                   if(err)
                   {
                     res.send(err);
                   }
                   else res.send("User with username : " + req.params.username + " and password : " + req.params.password + " has been created or has changed password" );
               })
           }
       }
   })
}


exports.UpdatePoints = (req, res) => {
  let username = req.params.username;
  let price = parseFloat(req.params.price);
  let points = parseInt(req.params.points);

  UserModel.ChangePoints(username, price, points, (err, data)=>{
      if (err) {
        res.send(err);
        return;
      }
      else if (data != null) {
        res.send(data)
        return;
      }
      else {
        res.status(402).send('Bad request.');
        return;
      }
  });

}
