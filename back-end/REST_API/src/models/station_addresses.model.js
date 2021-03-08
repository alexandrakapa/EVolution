const dbConn  = require('../../config/db.config');

var Stations = function (){};


Stations.getStationAddresses = async (req, result) => {
	
	//console.log(parsedate());
	dbConn.query(`SELECT ID as StationID, address_info as Address 
				  FROM Station` , (err, res) =>
	
	{

	 if (err) {
	    console.log("error: ", err);
	    result(err, null);
	    return;
	    }

	 if (res.length) {
	    console.log("Found Stations.");

	    result(null, res);
	    return;
	
	    }

	    // not found 
	    console.log('No Stations found.')

	    result(null, res);
	    return;
	


	});
}

module.exports = Stations;