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
User.updateUser = (username, password, result)=>{
    dbConn.query("UPDATE Car_Owner SET password = ? WHERE username = ?", [password, username], (err, res)=>{
        if(err){
            console.log('Error while updating the user');
            result(null, err);
        }else {
            console.log("User updated successfully");
            result(null, res);
        }
    });
}
/*
//create user
User.crateUser = (username, password, userReqData, result)=>{
    dbConn.query("INSERT INTO Car_Owner SET username = ?, password = ?, email = ?, phone_number = ?, price_to_pay = ?, points = ?", [username, password, userReqData.email, userReqData.phone_number, userReqData.price_to_pay, userReqData.points ], (err, res)=>{
        if(err){
            console.log('Error while creating the user');
            result(null, err);
        }else {
            console.log("User created successfully");
            result(null, res);
        }
    });
}*/


module.exports = User;
