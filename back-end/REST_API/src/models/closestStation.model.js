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

Station.getStationByCode = (postalcode,format,result) => {

        let postal_code = parseInt(postalcode,10);

	dbConn.query(`SELECT Station.operator AS Operator,
Station.euro_per_kWh AS Price_per_kWh,
Station.payment_types AS Payment_methods_available,
Station.address_info AS Address,
E.Evaluation AS Evaluation FROM Station LEFT JOIN (SELECT SUM(evaluates.evaluation)/COUNT(evaluates.StationID) AS Evaluation, Station.ID AS ID
FROM evaluates
LEFT JOIN Station
ON evaluates.StationID = Station.ID
WHERE is_active = 1
GROUP BY StationID) AS E ON E.ID = Station.ID WHERE postalcode BETWEEN '${postal_code-5}' AND '${postal_code+5}' ORDER BY postalcode`, (err,res)=>
	{
		if(err) {
			console.log('An error occured while searching for nearest stations', err);
			result(null,res);
		}
		else {
			
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

Station.getStationByCodePrice = (postalcode,lowerprice,higherprice,format,result) => {

	let postal_code = parseInt(postalcode,10);
	
	dbConn.query(`SELECT Station.operator AS Operator,
Station.euro_per_kWh AS Price_per_kWh,
Station.payment_types AS Payment_methods_available,
Station.address_info AS Address,
E.Evaluation AS Evaluation FROM Station LEFT JOIN (SELECT SUM(evaluates.evaluation)/COUNT(evaluates.StationID) AS Evaluation, Station.ID AS ID
FROM evaluates
LEFT JOIN Station
ON evaluates.StationID = Station.ID
WHERE is_active = 1
GROUP BY StationID) AS E ON E.ID = Station.ID WHERE postalcode BETWEEN '${postal_code-5}' AND '${postal_code+5}' AND euro_per_kWh >= '${lowerprice}' AND euro_per_kWh <='${higherprice}' ORDER BY postalcode`, (err,res)=>
	{
		if(err) {
			console.log('An error occured while searching for nearest stations', err);
			result(null,res);
		}
		else {
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

Station.getStationByCodePay = (postalcode,payment,format,result) => {

	let postal_code = parseInt(postalcode,10);
	
	dbConn.query(`SELECT Station.operator AS Operator,
Station.euro_per_kWh AS Price_per_kWh,
Station.payment_types AS Payment_methods_available,
Station.address_info AS Address,
E.Evaluation AS Evaluation FROM Station LEFT JOIN (SELECT SUM(evaluates.evaluation)/COUNT(evaluates.StationID) AS Evaluation, Station.ID AS ID
FROM evaluates
LEFT JOIN Station
ON evaluates.StationID = Station.ID
WHERE is_active = 1
GROUP BY StationID) AS E ON E.ID = Station.ID WHERE (payment_types LIKE '%${payment}%') AND postalcode>='${postal_code-5}' AND postalcode<='${postal_code+5}' ORDER BY postalcode`, (err,res)=>
	{
		if(err) {
			console.log('An error occured while searching for nearest stations', err);
			result(null,res);
		}
		else {
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

Station.getStationByCodePricePay = (postalcode,lowerprice,higherprice,payment,format,result) => {

	let postal_code = parseInt(postalcode,10);
	
	dbConn.query(`SELECT Station.operator AS Operator,
Station.euro_per_kWh AS Price_per_kWh,
Station.payment_types AS Payment_methods_available,
Station.address_info AS Address,
E.Evaluation AS Evaluation FROM Station LEFT JOIN (SELECT SUM(evaluates.evaluation)/COUNT(evaluates.StationID) AS Evaluation, Station.ID AS ID
FROM evaluates
LEFT JOIN Station
ON evaluates.StationID = Station.ID
WHERE is_active = 1
GROUP BY StationID) AS E ON E.ID = Station.ID WHERE postalcode BETWEEN '${postal_code-5}' AND '${postal_code+5}' AND euro_per_kWh >= '${lowerprice}' AND euro_per_kWh <='${higherprice}' AND payment_types LIKE '%${payment}%' ORDER BY postalcode`, (err,res)=>
	{
		if(err) {
			console.log('An error occured while searching for nearest stations', err);
			result(null,res);
		}
		else {
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
