const dbConn  = require('../../config/db.config');
const converter = require('json-2-csv');

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

	    else {

	    // not found 
	    console.log('No charging points found.')

	    result(null, res);
	    return;
	}
	


	});
}

module.exports=point;