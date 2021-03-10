const Logout = require('../models/logout.model.js');
//console.time("dbsave");
var begin=Date.now();
exports.logout = (req, res)=> {  
  
   
   
    Logout.logMeOut(req,(err,data) =>{
        if(err){
            res.status(200).json({
                message:"error occured"
            });
        }
        if(data == "ok"){
            res.status(200).send();
        }
    });
    
    }


