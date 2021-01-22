const UserModel = require('../models/user.model');

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
                  else res.send("There is no user in this database with username: " + req.params.username);
                })
              }
          })
        }
    })
}


// update password of a user
exports.updateUser = (req, res)=>{
       UserModel.updateUser(req.params.username, req.params.password, (err, user)=>{
            if(err)
            {
              res.send(err);
            }
            else res.send("User with username : " + req.params.username + " has new password : " + req.params.password  ); //password changed
        })
}
