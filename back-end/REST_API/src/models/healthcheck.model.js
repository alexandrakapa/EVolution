const dbConn  = require('../../config/db.config');



const healthchecker = function (){
};




healthchecker.checkDB = async (result) => {
	
	//dbConn.end()
	dbConn.query(`SELECT 1` , (err, res) =>
	{
		if (err) {
		    console.log("error: ", err);
		    //result(null, {"Status": "failed"});
		    result({"Status": "failed"}, err)
		   // return;
		    }
		else
			console.log("no error");
			result(null,{"Status": "OK"});
			//return;

	});
}

module.exports=healthchecker;