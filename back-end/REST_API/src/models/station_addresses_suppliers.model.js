const dbConn  = require('../../config/db.config');
const converter = require('json-2-csv');

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
	 			    },{emptyFieldValue  : ''})
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
