const dbConn  = require('../../config/db.config');

var Stations = function (){};


Stations.getStationAddresses = async (req, result) => {
	
	//console.log(parsedate());
	dbConn.query(`SELECT ID as StationID, address_info as Address, postalcode as PostalCode, country as Country,operator as Operator,payment_types as Payment_Types,is_active as Is_Active,euro_per_kWh as epk,longitude as Longi,latitude as Lat,country as Country FROM Station` , (err, res) =>
	
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