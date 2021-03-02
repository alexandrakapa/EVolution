const healthcheckModel = require('../models/healthcheck.model');
/*
const healthCheckMiddlewareGenerator = require('express-healthcheck-middleware');

const extraTestFunction = function() {
  return new Promise((resolve, reject) => {
    healthcheckModel.checkDB()
      .then(data => {
        if (data.connection === true) {
          resolve({ status: Ok});
        } else {
        	/*
          let error = new Error("Database is not connected")
          error.data = { status: not ok }
          error.statusCode = 501;
          error.status = 'warning';
          reject(error);
          
          reject({status: Failed});
        }
      })
  })
}



exports.check = healthCheckMiddlewareGenerator({ testFunction: extraTestFunction });
*/


exports.check=(req, res) => {
  	
	 	healthcheckModel.checkDB((err, data) => {
	 		if (err) {
	 			res.send(err);
	 			return;
	 		}
	 		else {
	 			res.send(data);
	 			return;
	 		}
	 	
	 		
	 	});

 };

//app.use('/health', healthCheckMiddleware);

//module.exports=check;

/*





// get all user list
exports.ckeck = (req, res)=> {  //exports.nameOfTheMethod
    healthcheckModel.check_connection((err, user) =>{
        //console.log('We are here');
        if(err)
        res.send(err);
        console.log('User', user);
        res.send(user)
    })
}

*/