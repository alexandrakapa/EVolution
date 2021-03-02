var dbConn  = require('../../config/db.config');

var User = function(user){
    this.username     =   user.username;
    this.password      =   user.password;
    this.email          =   user.email;
    this.phone_number          =   user.phone_number;
    this.points   =   user.points;
    this.price_to_pay   =   user.price_to_pay;
    this.ID = user.ID;
    this.company_name = user.company_name;
    this.username = user.username;
    this.is_user = user.is_user;
    this.phone          =   user.phone;
    this.whatamI = user.whatamI;
}



// get all users
User.getAllUser = (result) =>{
    dbConn.query('SELECT * FROM Car_Owner', (err, res)=>{
        if(err){
            console.log('Error while fetching users', err);
            result(null,err);
        }else{
            console.log('Users fetched successfully');
            result(null,res);
        }
    })
}


// get user by username from DB
User.getOwnerByUsername = (username, result)=>{
    dbConn.query('SELECT * FROM Car_Owner WHERE username=?', username, (err, res)=>{
        if(err){
            console.log('Error while fetching user by username', err);
            result(null, err);
        }else{
            result(null, res);
        }
    })
}

User.getManufacturerByUsername = (username, result)=>{
    dbConn.query('SELECT * FROM Car_Manufacturer WHERE username=? AND is_user=1', username, (err, res)=>{
        if(err){
            console.log('Error while fetching user by username', err);
            result(null, err);
        }else{
            result(null, res);
        }
    })
}

User.getEnergySupplierByUsername = (username, result)=>{
    dbConn.query('SELECT * FROM Energy_Supplier WHERE username=? AND is_user=1', username, (err, res)=>{
        if(err){
            console.log('Error while fetching user by username', err);
            result(null, err);
        }else{
            result(null, res);
        }
    })
}

// update user
User.updateUser = (username, password, userReqData, result)=>{
  if (userReqData.whatamI==0) //Car_Manufacturer
  {
    dbConn.query("UPDATE Car_Manufacturer SET password = ? WHERE username = ?", [password, username], (err, res)=>{
        if(err){
            console.log('Error while updating the user');
            result(null, err);
        }else {
            console.log("Car manufacturer updated successfully");
            result(null, res);
        }
    });
  }
  else if (userReqData.whatamI==1) //Energy_Supplier
  {
    dbConn.query("UPDATE Energy_Supplier SET password = ? WHERE username = ?", [password, username], (err, res)=>{
        if(err){
            console.log('Error while updating the user');
            result(null, err);
        }else {
            console.log("Energy supplier updated successfully");
            result(null, res);
        }
    });
  }
  else {
    dbConn.query("UPDATE Car_Owner SET password = ? WHERE username = ?", [password, username], (err, res)=>{
        if(err){
            console.log('Error while updating the user');
            result(null, err);
        }else {
            console.log("Car owner updated successfully");
            result(null, res);
        }
    });
  }
}

//create user
User.createUser = (username, password, userReqData, result)=>{
  if (userReqData.whatamI==0) //Car_Manufacturer
  {
    dbConn.query("INSERT INTO Car_Manufacturer SET username = ?, password = ?,company_name=?,is_user=?, email = ?, phone = ?,whatamI=0", [username, password,userReqData.company_name,userReqData.is_user, userReqData.email, userReqData.phone], (err, res)=>{
        if(err){
          //  console.log('Error:Please fill all the forms!');
            result(null, err);
        }else {
            console.log("Car manufacturer created successfully");
            result(null, res);
        }
    });
  }
  else if (userReqData.whatamI==1) //Energy_Supplier
  {
    dbConn.query("INSERT INTO Energy_Supplier SET username = ?, password = ?,company_name=?,is_user=?, email = ?, phone = ?,whatamI=1", [username, password,userReqData.company_name,userReqData.is_user, userReqData.email, userReqData.phone], (err, res)=>{
        if(err){
          //  console.log('Error:Please fill all the forms!');
            result(null, err);
        }else {
            console.log("Energy supplier created successfully");
            result(null, res);
        }
    });
  }
  else { //Car_Owner
    dbConn.query("INSERT INTO Car_Owner SET username = ?, password = ?, email = ?, phone_number = ?, price_to_pay = ?, points = ?", [username, password, userReqData.email, userReqData.phone_number, userReqData.price_to_pay, userReqData.points ], (err, res)=>{
        if(err){
          //  console.log('Error:Please fill all the forms!');
            result(null, err);
        }else {
            console.log("Car owner created successfully" + userReqData.whatamI);
            result(null, res);
        }
    });
  }
}


module.exports = User;
