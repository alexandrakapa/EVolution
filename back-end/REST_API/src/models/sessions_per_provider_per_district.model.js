const dbConn  = require('../../config/db.config');

const Session = function (){
};


const Supplier = function (){};

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
	let SupplierID=(req.params.supplierID);
	let periodfrom=((req.params.yyyymmdd_from).substring(0,4)).concat('-',(req.params.yyyymmdd_from).substring(4,6),'-',(req.params.yyyymmdd_from).substring(6,8));
	let periodto=((req.params.yyyymmdd_to).substring(0,4)).concat('-',(req.params.yyyymmdd_from).substring(4,6),'-',(req.params.yyyymmdd_from).substring(6,8));
	let region=(req.params.region);
	console.log('SupplierID ',SupplierID);
	console.log('region',region);
	//console.log(periodfrom);
	dbConn.query(`SELECT Energy_Supplier.ID,Energy_Supplier.company_name,SUM(Charing.kWh_delivered) as Total_Energy_Delivered
	FROM Space,Energy_Supplier,Station,Charging
	WHERE Energy_Supplier.ID='${providerid}' and Space.StationID=Station.ID and SUBSTRING(concat(Station.PostalCode,''), 1, 2)='${region}' and Charging.SpaceStationID=Station.ID and Charging.supplierID=Energy_Supplier.ID and DATE(STR_TO_DATE(Charging.the_date, '%c/%e/%Y %H:%i'))>=(SELECT DATE(${req.params.yyyymmdd_from}) FROM dual) AND DATE(STR_TO_DATE(Charging.the_date, '%c/%e/%Y'))<=(SELECT DATE(${req.params.yyyymmdd_to}) FROM dual)`
	, (err, res) =>
	{
		if (err) {
		    console.log("error: ", err);
		    result(err, null);
		    return;
		    }
		if (res.length){
			//console.log(res[0]);
			console.log('Found Supplier.')
			//arr.push(res);
			arr.push({SupplierID: res[0]['SupplierID']});
			arr.push({SupplierName: res[0]['SupplierName']});
			arr.push({RequestTimestamp: parsedate()})
			arr.push({PeriodFrom: periodfrom});
			arr.push({PeriodTo: periodto});
			arr.push({TotalEnergyDelivered: res[0]['Total_Energy_Delivered']})
			//Session.getter(req, arr, result);
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
	let SupplierID=(req.params.supplierID);
	let region=(req.params.region);
	console.log('SupplierID ',SupplierID);
	console.log('region',region);
	// dbConn.query(`
	// 	SELECT SUM(kWh_delivered)
	// 	FROM Charging
	// 	WHERE DATE(STR_TO_DATE(Charging.the_date, '%c/%e/%Y %H:%i'))>=(SELECT DATE(${req.params.yyyymmdd_from}) FROM dual) AND DATE(STR_TO_DATE(Charging.the_date, '%c/%e/%Y'))<=(SELECT DATE(${req.params.yyyymmdd_to}) FROM dual)
	//
	// 	`


	dbConn.query(`
		SELECT (@rank := @rank+1) as SessionIndex, F.SessionID, F.CarID, F.Model, F.UsableBatterySize, F.StartedOn, F.FinishedOn,  F.Protocol, F.EnergyDelivered, F.BatteryPercentBegin, F.BatteryPercentEnd, F.kmTotal, F.kmBetweenCharges, F.StationAddress
		FROM (



		SELECT A.SessionID, A.CarID, A.Model, A.UsableBatterySize, A.StartedOn, A.FinishedOn,  A.Protocol, A.EnergyDelivered, A.BatteryPercentBegin, A.BatteryPercentEnd, A.kmTotal, A.kmBetweenCharges, G.StationAddress, G.PostalCode
		FROM


		( SELECT * FROM


		(
		(SELECT ID as SupplierID
		FROM Car
		WHERE Car.Car_ManufacturerID=${ManufacturerID}
		) as B
		INNER JOIN
		( SELECT Charging.ID as SessionID, SUBSTRING(CONCAT(STR_TO_DATE(SUBSTRING(Charging.connection_time,6,11), "%d %b %Y"), SUBSTRING(Charging.connection_time,17,17) ), 1, 19) as StartedOn, SUBSTRING(CONCAT(STR_TO_DATE(SUBSTRING(Charging.disconnection_time,6,11), "%d %b %Y"), SUBSTRING(Charging.disconnection_time,17,17) ), 1, 19) as FinishedOn,
		Charging.kWh_delivered as EnergyDelivered, Charging.battery_percent_begin as BatteryPercentBegin, Charging.battery_percent_end as BatteryPercentEnd, Charging.km_total as kmTotal,
		Charging.km_between_charges as kmBetweenCharges, Charging.protocol as Protocol, Charging.SpaceStationID as StationID, Charging.CarID as CarID
		 FROM Charging
		WHERE
		DATE(STR_TO_DATE(Charging.the_date, '%c/%e/%Y %H:%i'))>=(SELECT DATE(${req.params.yyyymmdd_from}) FROM dual) AND DATE(STR_TO_DATE(Charging.the_date, '%c/%e/%Y'))<=(SELECT DATE(${req.params.yyyymmdd_to}) FROM dual)
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
		    result(null, arr);
		    return;

		    }

		    // not found
		    console.log('No Energy Delivered for these dates and this region.')
		    arr.push({NumberOfChargingSessions: 0});
		    arr.push([]);
		    result(null, arr);
		    return;
		 });
};


//module.exports=Session;
module.exports=Manufacturer;
