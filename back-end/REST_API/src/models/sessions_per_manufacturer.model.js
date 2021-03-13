const dbConn  = require('../../config/db.config');
const converter = require('json-2-csv');

const Session = function (){
};


const Manufacturer = function (){};

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


Manufacturer.getSessionsbyManID = async (req, result) => {
	
	//console.log(parsedate());
	let arr=new Array();
	let ManufacturerID=(req.params.manufacturerID);
	let periodfrom=((req.params.yyyymmdd_from).substring(0,4)).concat('-',(req.params.yyyymmdd_from).substring(4,6),'-',(req.params.yyyymmdd_from).substring(6,8));
	let periodto=((req.params.yyyymmdd_to).substring(0,4)).concat('-',(req.params.yyyymmdd_to).substring(4,6),'-',(req.params.yyyymmdd_to).substring(6,8));
	//console.log(periodfrom);
	console.log('ManufacturerID ',ManufacturerID);
	dbConn.query(`SELECT Car_Manufacturer.ID as ManufacturerID, Car_Manufacturer.company_name as ManufacturerName
					FROM Car_Manufacturer
					WHERE Car_Manufacturer.ID=${ManufacturerID}` , (err, res) =>
	{
		if (err) {
		    console.log("error: ", err);
		    result(err, null);
		    return;
		    }
		if (res.length){
			//console.log(res[0]);
			console.log('Found Manufacturer.')
			//arr.push(res);
			arr.push({ManufacturerID: res[0]['ManufacturerID']});
			arr.push({ManufacturerName: res[0]['ManufacturerName']});
			//result(null,arr);
			arr.push({RequestTimestamp: parsedate()})
			arr.push({PeriodFrom: periodfrom});
			arr.push({PeriodTo: periodto});
			Session.getter(req, arr, result);
			//result(null, arr);
			return;

		}
		console.log("No result for this ID.")
		//result({ kind: "not_found" }, null);
		result(null,res);
		return;


	});
}


Session.getter= async ( req, arr, result ) => {
	//Point.getPointByID(req, result);
	let sessionlist=new Array();
	let ManufacturerID=(req.params.manufacturerID);
	let region=(req.params.region).substring(0,2);
	console.log('ManufacturerID ',ManufacturerID);
	console.log('region',region);
	dbConn.query(`
		SELECT (@rank := @rank+1) as SessionIndex, F.SessionID, F.CarID, F.Model, F.UsableBatterySize, F.StartedOn, F.FinishedOn,  F.Protocol, F.EnergyDelivered, F.BatteryPercentBegin, F.BatteryPercentEnd, F.kmTotal, F.kmBetweenCharges, F.StationAddress
		FROM (
		SELECT A.SessionID, A.CarID, A.Model, A.UsableBatterySize, A.StartedOn, A.FinishedOn,  A.Protocol, A.EnergyDelivered, A.BatteryPercentBegin, A.BatteryPercentEnd, A.kmTotal, A.kmBetweenCharges, G.StationAddress, G.PostalCode
		FROM
		( SELECT * FROM (
		(SELECT Car.Car_ManufacturerID as ManufacturerID, Car.ID as ID, Car.model as Model, Car.usable_battery_size as UsableBatterySize
		FROM Car
		WHERE Car.Car_ManufacturerID=${ManufacturerID}
		) as B
		INNER JOIN
		( SELECT Charging.ID as SessionID, SUBSTRING(CONCAT(STR_TO_DATE(SUBSTRING(Charging.connection_time,6,11), "%d %b %Y"), SUBSTRING(Charging.connection_time,17,17) ), 1, 19) as StartedOn, SUBSTRING(CONCAT(STR_TO_DATE(SUBSTRING(Charging.disconnection_time,6,11), "%d %b %Y"), SUBSTRING(Charging.disconnection_time,17,17) ), 1, 19) as FinishedOn, 
		Charging.kWh_delivered as EnergyDelivered, Charging.battery_percent_begin as BatteryPercentBegin, Charging.battery_percent_end as BatteryPercentEnd, Charging.km_total as kmTotal, 
		Charging.km_between_charges as kmBetweenCharges, Charging.protocol as Protocol, Charging.SpaceStationID as StationID, Charging.CarID as CarID
		 FROM Charging
		WHERE
		DATE(STR_TO_DATE(Charging.the_date, '%e/%c/%Y %H:%i'))>=(SELECT DATE(${req.params.yyyymmdd_from}) FROM dual) AND DATE(STR_TO_DATE(Charging.the_date, '%e/%c/%Y'))<=(SELECT DATE(${req.params.yyyymmdd_to}) FROM dual)
		) as T
		ON T.CarID=B.ID
		)
		) as A
		LEFT JOIN
		(SELECT Station.ID as StationID, CONCAT(Station.address_info,', ', Station.postalcode, ', ', Station.country) as StationAddress, Station.postalcode as PostalCode
		FROM Station
		) as G
		on A.StationID=G.StationID
		) as F, (SELECT @rank:=0) r
		WHERE SUBSTRING(concat(F.PostalCode,''), 1, 2)='${region}'
		ORDER BY F.StartedOn DESC`, (err,res) =>
		{

		 //console.log(res);
		 if (err) {
		    console.log("error: ", err);
		    result(err, null);
		    return;
		    }

		 if (res.length) {
		 	arr.push({NumberOfChargingSessions: res.length});
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
			    	else {
			    		result(null,csv)
			    	}
			    },{emptyFieldValue  : ''})
			   
			}
			else {
				result(null,arr)
				return
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


//module.exports=Session;
module.exports=Manufacturer;
