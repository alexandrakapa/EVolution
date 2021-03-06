var dbConn = require('../../config/db.config');
const converter = require('json-2-csv');

var Station = function(station) {
	this.ID = station.ID
	this.operator = station.operator
	this.euro_per_kWh = station.euro_per_kWh
	this.payment_types = station.payment_types
	this.is_active = station.is_active
	this.address_info = station.address_info
	this.postalcode = station.postalcode
	this.country = station.country
}

Station.getAllStations = async (format,result) => {

	dbConn.query(`SELECT Station.operator AS Operator,Station.ID as Sid,
Station.euro_per_kWh AS Price_per_kWh,
Station.payment_types AS Payment_methods_available,Station.is_active AS is_act,Station.longitude as longitude, Station.latitude as latitude,
Station.address_info AS Address,CAST(SUM(evaluates.evaluation)/COUNT(evaluates.StationID) AS UNSIGNED) AS Evaluation
FROM evaluates
LEFT JOIN Station
ON evaluates.StationID = Station.ID
GROUP BY StationID` ,  (err,res) =>
	{
		if(err) {
			console.log('Error when fetchinf station info', err);
			result(null,err);
		}
		else
		{
			if (res.length) {

	    console.log("Found models.");
		 
		 if (format=='csv'){
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
				return;
			}
		}
		}
	});
}


Station.getStationInfo = (stationID,format,result) => {

	dbConn.query(`SELECT Station.*, E.evaluation
FROM Station
LEFT JOIN
(SELECT ((SUM(evaluation))/(COUNT(StationID))) AS evaluation, StationID FROM evaluates WHERE StationID='${stationID}') AS E
ON E.StationID = Station.ID
WHERE ID='${stationID}'` ,  (err,res) =>
	{
		if(err) {
			console.log('Error when fetchinf station info', err);
			result(null,err);
		}
		else
		{
			if (res.length) {

	    console.log("Found models.");
		 
		 if (format=='csv'){
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
		}
	});
}

Station.getStationReview = (stationID,format,result) => {

	dbConn.query(`SELECT ((SUM(evaluation))/(COUNT(StationID))) AS Evaluation FROM evaluates WHERE StationID = ?`, stationID, (err,res) =>
	{
		if(err) {
			console.log('Error when fetching review', err);
			result(null,err);
		}
		else
		{
			if (res.length) {

	    console.log("Found models.");
		 
		 if (format=='csv'){
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
		}
	});
	
}

module.exports = Station;



