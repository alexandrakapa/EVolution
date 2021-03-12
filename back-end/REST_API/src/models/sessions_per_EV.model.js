const dbConn = require('../../config/db.config');
const converter = require('json-2-csv');

const Session = function(session){};
const Vehicle = function(vehicle){};

const parsedate= function(){
	let date=new Date();
    let year = date.getFullYear().toString();
    let month=('0'+(date.getMonth()+1).toString()).slice(-2);
    let day=('0'+date.getDate().toString()).slice(-2);
    let hour=('0'+date.getHours().toString()).slice(-2);
    let min=('0'+date.getMinutes().toString()).slice(-2);
    let sec=('0'+date.getSeconds().toString()).slice(-2);
    return(year+'-'+month+'-'+day+' '+hour+':'+min+':'+sec);
};


Vehicle.getVehicleByID = async (req,result) => {

	let resultarray = new Array();
	let vehicleid = (req.params.vehicleID);
	let periodfrom=((req.params.yyyymmdd_from).substring(0,4)).concat('-',(req.params.yyyymmdd_from).substring(4,6),'-',(req.params.yyyymmdd_from).substring(6,8));
	let periodto=((req.params.yyyymmdd_to).substring(0,4)).concat('-',(req.params.yyyymmdd_to).substring(4,6),'-',(req.params.yyyymmdd_to).substring(6,8));

	console.log('VehicleID', vehicleid);

	dbConn.query(`SELECT CarID AS Vehicle, SUM(kWh_delivered) AS TotalEnergyConsumed, COUNT(DISTINCT(SpaceStationID)) AS NumberOfVisitedPoints, COUNT(ID) AS NumberOfVehicleChargingSessions FROM Charging  WHERE CarID = "${vehicleid}" and DATE(STR_TO_DATE(Charging.the_date, "%c/%e/%Y %H:%i"))>=(SELECT DATE(${req.params.yyyymmdd_from}) FROM dual) AND DATE(STR_TO_DATE(Charging.the_date, "%c/%e/%Y"))<=(SELECT DATE(${req.params.yyyymmdd_to}) FROM dual)`, (err,res) =>
	{
		if (err) {
			console.log("error: ", err);
			result(err, null);
			return;
		}

		if (res.length) {
			console.log('Found vehicle.')
			console.log(res);
			resultarray.push({Vehicle: res[0]['Vehicle']});
			resultarray.push({TotalEnergyConsumed: res[0]['TotalEnergyConsumed']});
			resultarray.push({NumberOfVisitedPoints: res[0]['NumberOfVisitedPoints']});
			resultarray.push({NumberOfVehicleChargingSessions: res[0]['NumberOfVehicleChargingSessions']});

			resultarray.push({RequestTimestamp: parsedate()});
			resultarray.push({PeriodFrom: periodfrom});
			resultarray.push({PeriodTo: periodto});

			Session.findByVehicle(req,resultarray,result);
			return;
		}
               else {
		console.log("Noresult for this ID");
		result(null,res);
		return;
		}
	});
}

Session.findByVehicle = async (req,resultarray, result) => {

	let vcslist = new Array();
	let vehicleid = (req.params.vehicleID);

	console.log('VehicleID', vehicleid);

	dbConn.query(`SELECT (@rank := @rank+1) as SessionIndex, Charging.ID as SessionID, Energy_Supplier.company_name as EnergyProvider, SUBSTRING(CONCAT(STR_TO_DATE(SUBSTRING(Charging.connection_time,6,11), "%d %b %Y"), SUBSTRING(Charging.connection_time,17,17) ), 1, 19) as StartedOn, SUBSTRING(CONCAT(STR_TO_DATE(SUBSTRING(Charging.disconnection_time,6,11), "%d %b %Y"), SUBSTRING(Charging.disconnection_time,17,17) ), 1, 19) as FinishedOn, Charging.kWh_delivered as EnergyDelivered, Station.euro_per_kWh as CostPerkWh, Charging.charging_price AS SessionCost FROM Charging LEFT JOIN Energy_Supplier ON Charging.supplierID = Energy_Supplier.ID LEFT JOIN Station ON Station.ID = Charging.SpaceStationID, (SELECT @rank:=0) r WHERE CarID ="${vehicleid}" and DATE(STR_TO_DATE(Charging.the_date, "%c/%e/%Y %H:%i"))>=(SELECT DATE(${req.params.yyyymmdd_from}) FROM dual) AND DATE(STR_TO_DATE(Charging.the_date, "%c/%e/%Y"))<=(SELECT DATE(${req.params.yyyymmdd_to}) FROM dual)`, (err,res) =>
	{
		if (err) {
			console.log("error: ", err);
			result(err,null);
			return;
		}

		if (res.length) {
			vcslist.push({NumberofChargingSessions: res.length});
			console.log("Found vehicle");

			for(var i=0; i<res.length; i++){
				vcslist.push(res[i]);
			}

			resultarray.push(vcslist);

			 if (req.query.format=='csv'){
				console.log("found it")
				var tocsv=vcslist
				tocsv.unshift(resultarray[0],resultarray[1],resultarray[2],resultarray[3],resultarray[4],resultarray[5],resultarray[6])
				
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
				result(null,resultarray);
				return;
			}
			
		}
                else{
		console.log('No session for vehicle within requested dates');
		resultarray.push({NumberofChargingSessions: 0});
		resultarray.push([]);
		result(null,resultarray);
		return;
		}

	});

};

module.exports = Vehicle;
