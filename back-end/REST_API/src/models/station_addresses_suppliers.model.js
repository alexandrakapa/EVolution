const dbConn  = require('../../config/db.config');

var Stations = function (){};


Stations.getStationAddresses = async (req, result) => {
	let providerid=(req.params.supplierID).substring(0,2);

	//console.log(parsedate());
	dbConn.query(`SELECT ID as StationID, address_info as Address, postalcode as PostalCode, country as Country
				  FROM Station,Space
					where Space.Energy_SupplierID='${providerid}' and Space.StationID=Station.ID
					` , (err, res) =>

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
