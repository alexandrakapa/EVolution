const dbConn  = require('../../config/db.config');
const converter = require('json-2-csv');

var Stations = function (){};


Stations.getStationAddresses = async (req, result) => {

	//console.log(parsedate());
	dbConn.query(`SELECT ID as StationID, address_info as Address, postalcode as PostalCode, country as Country,operator as Operator,payment_types as Payment_Types,is_active as Is_Active,euro_per_kWh as epk,longitude as Longi,latitude as Lat,country as Country FROM Station
		` , (err, res) =>

	{

	 if (err) {
	    console.log("error: ", err);
	    result(err, null);
	    return;
	    }

	 if (res.length) {
	    console.log("Found Stations.");


	     if (req.query.format=='csv'){
				console.log("found it")
				var tocsv=res
								
			    converter.json2csv(tocsv, (err, csv) =>{
			    	if (err) {
			    		result(err,null)
			    	}

			    	else {
			    		//result.attachment('results.csv').send(csv)
			    		result(null,csv)
			    	}
			    })
		}
		else {
				result(null,res)
			}
	

	    }
	    else{

	    // not found
	    console.log('No Stations found.')

	    result(null, res);
	    return;
	}


	});
}

module.exports = Stations;
