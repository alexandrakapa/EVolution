const dbConn  = require('../../config/db.config');
const converter = require('json-2-csv');


var cost = function (){};

//const model = function (){};


const parsedate= function(){
	let date=new Date();
    let year = date.getFullYear().toString();
    let month=('0'+(date.getMonth()+1).toString()).slice(-2);
    let day=('0'+date.getDate().toString()).slice(-2);
    let hour=('0'+date.getHours().toString()).slice(-2);
    let min=('0'+date.getMinutes().toString()).slice(-2);
    let sec=('0'+date.getSeconds().toString()).slice(-2);
    return(year+'-'+month+'-'+day+' '+hour+':'+min+':'+sec);
}


cost.getCostByModel = async (req, result) => {
	
	//console.log(parsedate());
	let arr=new Array();
	let ManufacturerID=(req.params.manufacturerID);
	let Model=req.params.model;
	let periodfrom=((req.params.yyyymmdd_from).substring(0,4)).concat('-',(req.params.yyyymmdd_from).substring(4,6),'-',(req.params.yyyymmdd_from).substring(6,8));
	let periodto=((req.params.yyyymmdd_to).substring(0,4)).concat('-',(req.params.yyyymmdd_from).substring(4,6),'-',(req.params.yyyymmdd_from).substring(6,8));
	//console.log(periodfrom);
	console.log('ManufacturerID ',ManufacturerID);
	dbConn.query(`SELECT Car_Manufacturer.ID as ManufacturerID, Car_Manufacturer.company_name as ManufacturerName
					FROM Car_Manufacturer
					WHERE Car_Manufacturer.ID=${ManufacturerID}` , (err, res) =>
	
	{

	 //console.log(res);
	 if (err) {
	    console.log("error: ", err);
	    result(err, null);
	    return;
	    }

	 if (res.length) {
	 	//arr.push({NumberOfCars: Object.keys(res).length});
	    console.log("Found Cars.");
	    //result(null, res);

		//arr.push(res);
		arr.push({ManufacturerID: res[0]['ManufacturerID']});
		arr.push({ManufacturerName: res[0]['ManufacturerName']});
		//result(null,arr);
		arr.push({RequestTimestamp: parsedate()})
		arr.push({PeriodFrom: periodfrom});
		arr.push({PeriodTo: periodto});
	    cost.getter(req, arr, result);
	   // result(null, arr);
	    return;
	
	    }

	    // not found 
	    console.log('No data for cars of this model for these dates.')

	    result(null, res);
	    return;
	


	});
}


cost.getter= async ( req, arr, result ) => {
	//Point.getPointByID(req, result);
	//let sessionlist=new Array();
	let ManufacturerID=(req.params.manufacturerID);
	let Model=req.params.model;
	console.log('ManufacturerID ',ManufacturerID);
	console.log('Model',Model);
	dbConn.query(`
	SELECT C.CarID AS CarID, C.model as Model, SUM(T.kWh_delivered)/SUM(T.km_between_charges) as EnergyCost, SUM(T.km_between_charges) as TotalKm, SUM(T.kWh_delivered) as TotalEnergyConsumed 
	FROM
	( 	SELECT * 
	 	FROM
		Charging
	     WHERE
	    DATE(STR_TO_DATE(Charging.the_date, '%c/%e/%Y %H:%i'))>=(SELECT DATE(${req.params.yyyymmdd_from}) FROM dual) AND DATE(STR_TO_DATE(Charging.the_date, '%c/%e/%Y'))<=(SELECT DATE(${req.params.yyyymmdd_to}) FROM dual)
	) as T
	INNER JOIN
	 (
		SELECT Car.ID as CarID, Car.model as Model
	 	FROM
		Car
	 	WHERE Car.Car_ManufacturerID=${ManufacturerID} and Car.model='${Model}'
	) as C

	ON T.CarID=C.CarID
	GROUP BY T.CarID
	ORDER BY EnergyCost DESC`, (err,res) =>
		{

		 //console.log(res);
		 if (err) {
		    console.log("error: ", err);
		    result(err, null);
		    return;
		    }

		 if (res.length) {
		 	arr.push({NumberOfCars: res.length});
		    console.log("Found Charging Sessions.");
		    //result(null, res);
		    arr.push(res);
		    //console.log(arr[0]['NumberOfChargingSessions']);
		    //console.log(arr[1][0]['SessionIndex']);
		     if (req.query.format=='csv'){
				console.log("found it")
				var tocsv=res
				tocsv.unshift(arr[0],arr[1],arr[2],arr[3],arr[4],arr[5])
				
			    converter.json2csv(tocsv, (err, csv) =>{
			    	if (err) {
			    		result(err,null)
			    	}
			    	/*else{
			    		console.log(csv)
			    		fs.writeFile('todos.csv', csv,'utf8')
			    		.then(result.attachment('todos.csv'))
			    		.catch(console.log("error creating csv file"))
			    	}*/
			    	else {
			    		//result.attachment('results.csv').send(csv)
			    		result(null,csv)
			    	}
			    })
			   
			}
			else {
				result(null,arr)
			}
		
		    }
		    else {
		    // not found 
		    console.log('No ChargingSessions for these dates and this region.')
		    arr.push({NumberOfChargingSessions: 0});
		    arr.push([]);
		    result(null, arr);
		    return;
		}
		 });
};






cost.getMeanCost = async (req, result) => {
	
	
	let arr=new Array();
	let periodfrom=((req.params.yyyymmdd_from).substring(0,4)).concat('-',(req.params.yyyymmdd_from).substring(4,6),'-',(req.params.yyyymmdd_from).substring(6,8));
	let periodto=((req.params.yyyymmdd_to).substring(0,4)).concat('-',(req.params.yyyymmdd_from).substring(4,6),'-',(req.params.yyyymmdd_from).substring(6,8));
	
	dbConn.query(` SELECT A.ManufacturerName, SUM(A.EnergyDelivedInKWh)/SUM(A.TotalKm) as EnergyCostPerKm, SUM(A.EnergyDelivedInKWh) as EnergyDelivedInKWh, SUM(A.TotalKm) as TotalKm FROM (
		SELECT C.ManName as ManufacturerName, C.Model as CarModel, SUM(T.kWh_delivered)/SUM(T.km_total) as EnergyCostPerKm, SUM(T.kWh_delivered) as EnergyDelivedInKWh, SUM(T.km_total) as TotalKm  FROM

		( SELECT Charging.CarID, Charging.km_total, Charging.kWh_delivered, Charging.ID as Charging_ID 
		 from Charging 
		WHERE DATE(STR_TO_DATE(Charging.the_date, '%c/%e/%Y %H:%i'))>=(SELECT DATE(${req.params.yyyymmdd_from}) FROM dual) AND DATE(STR_TO_DATE(Charging.the_date, '%c/%e/%Y'))<=(SELECT DATE(${req.params.yyyymmdd_to}) FROM dual)) as T

		INNER JOIN

		( SELECT Car.Car_ManufacturerID as ManID, Car.model as Model, Car.ID as CarID , Car_Manufacturer.company_name as ManName
		 FROM Car, Car_Manufacturer
		 WHERE Car.Car_ManufacturerID=Car_Manufacturer.ID ) as C
		 
		 ON T.CarID=C.CarID
		 GROUP BY T.CarID
		 ) as A
		 GROUP BY A.ManufacturerName
		 ORDER BY ManufacturerName` , (err, res) =>
	
	{

	 //console.log(res);
	 if (err) {
	    console.log("error: ", err);
	    result(err, null);
	    return;
	    }

	 if (res.length) {
	 	//arr.push({NumberOfCars: Object.keys(res).length});
	    console.log("Found mean Energy Cost.");

		
		arr.push({RequestTimestamp: parsedate()})
		arr.push({PeriodFrom: periodfrom});
		arr.push({PeriodTo: periodto});
		//console.log(res)
		arr.push(res);


		 if (req.query.format=='csv'){
				console.log("found it")
				var tocsv=res
				tocsv.unshift(arr[0],arr[1],arr[2])
				
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
				result(null,arr)
			}
	
	    }

	    else{

	    // not found 
	    console.log('No charging sessions to calculate mean energy cost per km for these dates.')

	    result(null, res);
	    return;
	
	}

	});
}



cost.getModels = async (req, result) => {
	

	let ManufacturerID=(req.params.manufacturerID);
	console.log('ManufacturerID ',ManufacturerID);
	dbConn.query(`SELECT DISTINCT Car.model as Model
					FROM Car
					WHERE Car.Car_ManufacturerID=${ManufacturerID}` , (err, res) =>
	
	{

	 //console.log(res);
	 if (err) {
	    console.log("error: ", err);
	    result(err, null);
	    return;
	    }

	 if (res.length) {

	    console.log("Found models.");
		 
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
	    console.log('No data for cars of this model for these dates.')

	    result(null, res);
	    return;
	}


	});
}

//module.exports=Session;
module.exports = cost;

//module.exports= getCostByModel;