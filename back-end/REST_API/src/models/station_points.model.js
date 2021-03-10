const dbConn  = require('../../config/db.config');

var point = function (){};


point.getStationPoints = async (req, result) => {
	
	
	let StationID=(req.params.stationID);

	dbConn.query(`SELECT name as Name, active as Active, taken as Taken
					FROM Space
					WHERE StationID="${StationID}"` , (err, res) =>
	
	{

	 
	 if (err) {
	    console.log("error: ", err);
	    result(err, null);
	    return;
	    }

	 if (res.length) {
	 	//arr.push({NumberOfCars: Object.keys(res).length});
	    console.log("Found charging points.");
	    result(null, res);

	    return;
	
	    }

	    // not found 
	    console.log('No charging points found.')

	    result(null, res);
	    return;
	


	});
}

module.exports=point;