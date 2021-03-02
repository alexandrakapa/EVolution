const dbConn  = require('../../config/db.config');

const Session = function (session){
};


const Point = function (point){};

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


Point.getPointByID = async (req, result) => {
	
	//console.log(parsedate());
	let arr=new Array();
	let spacename=(req.params.pointID).substring(0,6);
	let stationid=(req.params.pointID).substring(6,req.params.pointID.length);
	let periodfrom=((req.params.yyyymmdd_from).substring(0,4)).concat('-',(req.params.yyyymmdd_from).substring(4,6),'-',(req.params.yyyymmdd_from).substring(6,8));
	let periodto=((req.params.yyyymmdd_to).substring(0,4)).concat('-',(req.params.yyyymmdd_from).substring(4,6),'-',(req.params.yyyymmdd_from).substring(6,8));
	//console.log(periodfrom);
	console.log('Spacename ',spacename);
	console.log('StationID ',stationid);
	dbConn.query(`SELECT CONCAT(Space.name,'-', Space.StationID) as Point, Space.operator as PointOperator
					FROM
					Space
					WHERE
					Space.name='${spacename}' and Space.StationID='${stationid}'` , (err, res) =>
	{
		if (err) {
		    console.log("error: ", err);
		    result(err, null);
		    return;
		    }
		if (res.length){
			console.log(res);
			console.log('Found charging point.')
			//arr.push(res);
			arr.push({Point: res[0]['Point']});
			arr.push({PointOperator: res[0]['PointOperator']});
			//result(null,arr);
			arr.push({RequestTimestamp: parsedate()})
			arr.push({PeriodFrom: periodfrom});
			arr.push({PeriodTo: periodto});
			Session.findByPoint(req, arr, result);
			return;

		}
		console.log("No result for this ID.")
		//result({ kind: "not_found" }, null);
		result(null,res);
		return;


	});
}


Session.findByPoint= async ( req, arr, result ) => {
	//Point.getPointByID(req, result);
	let sessionlist=new Array();
	let spacename=(req.params.pointID).substring(0,6);
	let stationid=(req.params.pointID).substring(6,req.params.pointID.length);
	console.log('Spacename ',spacename);
	console.log('StationID ',stationid);
	dbConn.query(`
		SELECT (@rank := @rank+1) as SessionIndex, T.SessionID, T.StartedOn, T.FinishedOn, T.Protocol, T.EnergyDelivered, K.Payment, T.VehicleType FROM 
		((SELECT Charging.ID as SessionID, SUBSTRING(CONCAT(STR_TO_DATE(SUBSTRING(Charging.connection_time,6,11), "%d %b %Y"), SUBSTRING(Charging.connection_time,17,17) ), 1, 19) as StartedOn, SUBSTRING(CONCAT(STR_TO_DATE(SUBSTRING(Charging.disconnection_time,6,11), "%d %b %Y"), SUBSTRING(Charging.disconnection_time,17,17) ), 1, 19) as FinishedOn, Charging.protocol as Protocol, Charging.kWh_delivered as EnergyDelivered, Car.model as VehicleType FROM Car, Charging WHERE (Car.ID=Charging.CarID and Charging.SpaceStationID='${stationid}' and Charging.Spacename='${spacename}' and DATE(STR_TO_DATE(Charging.the_date, '%c/%e/%Y %H:%i'))>=(SELECT DATE(${req.params.yyyymmdd_from}) FROM dual) AND DATE(STR_TO_DATE(Charging.the_date, '%c/%e/%Y'))<=(SELECT DATE(${req.params.yyyymmdd_to}) FROM dual)) ) as T
		LEFT JOIN 
		( SELECT pays_up.ChargingID, Payment.payment_way as Payment
		 FROM Payment, pays_up
		 where pays_up.PaymentID=Payment.ID ) AS K
		 ON K.ChargingID=T.SessionID), (SELECT @rank:=0) r
		 ORDER by T.StartedOn DESC`, (err,res) =>
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
		    for (var i=0; i<res.length; i++){
		    	//console.log(typeof(result[i]));
		    	//res[i].push({key:'SessionIndex', value: i});
		    	if (res[i]['Payment']==null)
		    		res[i]['Payment']="Pay later with app.";
		    	sessionlist.push(res[i]);
		    	
		    }
		    arr.push(sessionlist);
		    //console.log(arr[0]['NumberOfChargingSessions']);
		    //console.log(arr[1][0]['SessionIndex']);
		    result(null, arr);
		    return;
		
		    }

		    // not found 
		    console.log('No ChargingSessions for these dates.')
		    arr.push({NumberOfChargingSessions: 0});
		    arr.push([]);
		    result(null, arr);
		    return;
		 });
};


//module.exports=Session;
module.exports=Point;
