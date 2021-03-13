const dbConn  = require('../../config/db.config');

const Session = function (session){
};


const Provider = function (provider){};

Provider.getProviderByID = async(req,result) => {
	//console.log(req.headers.Date);
	let arr=new Array();
	let providerid=(req.params.supplierID).substring(0,2);
	let periodfrom=((req.params.yyyymmdd_from).substring(0,4)).concat('-',(req.params.yyyymmdd_from).substring(4,6),'-',(req.params.yyyymmdd_from).substring(6,8));
	let periodto=((req.params.yyyymmdd_to).substring(0,4)).concat('-',(req.params.yyyymmdd_to).substring(4,6),'-',(req.params.yyyymmdd_to).substring(6,8));
	//console.log(periodfrom);
	//console.log('ProviderID ',providerId);


  // SELECT CONCAT(Space.name,'-', Space.StationID) as Provider, Space.operator as ProviderOperator
  //         FROM
  //         Space
  //         WHERE
  //         Space.name='${spacename}' and Space.StationID='${stationid}'

	// dbConn.query(`
	// 	SELECT StationID,Energy_SupplierID,company_name,Charging.ID as SessionID,Charging.CARID as VehicleID, SUBSTRING(CONCAT(STR_TO_DATE(SUBSTRING(Charging.connection_time,6,11), "%d %b %Y"), SUBSTRING(Charging.connection_time,17,17) ), 1, 19) as StartedOn, SUBSTRING(CONCAT(STR_TO_DATE(SUBSTRING(Charging.disconnection_time,6,11), "%d %b %Y"), SUBSTRING(Charging.disconnection_time,17,17) ), 1, 19) as FinishedOn, Charging.protocol as Protocol, Charging.kWh_delivered as EnergyDelivered,Charging.charging_price as CostPerKWh,Charging.charging_price*Charging.kWh_delivered as TotalCost
	// 	FROM ((Space
	// 		INNER JOIN Energy_Supplier ON Space.Energy_SupplierID=Energy_Supplier.ID)
	// 		INNER JOIN Station ON Station.ID=Space.StationID
	// 	)
	// 	WHERE Energy_Supplier.ID='${providerid}' and  DATE(STR_TO_DATE(Charging.the_date, '%c/%e/%Y %H:%i'))>=(SELECT DATE(${req.params.yyyymmdd_from}) FROM dual) AND DATE(STR_TO_DATE(Charging.the_date, '%c/%e/%Y'))<=(SELECT DATE(${req.params.yyyymmdd_to}) FROM dual)
	//







// 		SELECT StationID,Energy_SupplierID,company_name,Charging.ID as SessionID,Charging.CARID as VehicleID, SUBSTRING(CONCAT(STR_TO_DATE(SUBSTRING(Charging.connection_time,6,11), "%d %b %Y"), SUBSTRING(Charging.connection_time,17,17) ), 1, 19) as StartedOn, SUBSTRING(CONCAT(STR_TO_DATE(SUBSTRING(Charging.disconnection_time,6,11), "%d %b %Y"), SUBSTRING(Charging.disconnection_time,17,17) ), 1, 19) as FinishedOn, Charging.protocol as Protocol, Charging.kWh_delivered as EnergyDelivered,Charging.charging_price as CostPerKWh,Charging.charging_price*Charging.kWh_delivered as TotalCost
//   FROM Space, Energy_Supplier,Charging
//   WHERE   and Charging.Spacename=Space.name and Charging.SpaceStationID=Space.StationID
// `



	dbConn.query(`SELECT StationID,Energy_SupplierID,company_name,Charging.ID as SessionID,Charging.CARID as VehicleID, SUBSTRING(CONCAT(STR_TO_DATE(SUBSTRING(Charging.connection_time,6,11), "%d %b %Y"), SUBSTRING(Charging.connection_time,17,17) ), 1, 19) as StartedOn, SUBSTRING(CONCAT(STR_TO_DATE(SUBSTRING(Charging.disconnection_time,6,11), "%d %b %Y"), SUBSTRING(Charging.disconnection_time,17,17) ), 1, 19) as FinishedOn, Charging.protocol as Protocol, Charging.kWh_delivered as EnergyDelivered,Charging.charging_price as CostPerKWh,Charging.charging_price*Charging.kWh_delivered as TotalCost
  FROM Space, Energy_Supplier,Charging
  WHERE Space.Energy_SupplierID='${providerid}' and  Space.Energy_SupplierID=Energy_Supplier.ID and Charging.Spacename=Space.name and Charging.SpaceStationID=Space.StationID and DATE(STR_TO_DATE(Charging.the_date, '%e/%c/%Y %H:%i'))>=(SELECT DATE(${req.params.yyyymmdd_from}) FROM dual) AND DATE(STR_TO_DATE(Charging.the_date, '%e/%c/%Y'))<=(SELECT DATE(${req.params.yyyymmdd_to}) FROM dual)
` , (err, res) =>
	{
		if (err) {
		    console.log("error: ", err);
		    result(err, null);
		    return;
		    }
		if (res.length){
			console.log('Found Provider.')
			//arr.push(res);
      arr.push({ProviderID: res[0]['Energy_SupplierID']});
      arr.push({ProviderName: res[0]['company_name']});
      for (var i=0; i<res.length; i++){
      let sessionlist=new Array();
      //arr.push({Number: res.length});
      sessionlist.push({StationID: res[i]['StationID']});
      sessionlist.push({SessionID: res[i]['SessionID']});
      sessionlist.push({VehicleID: res[i]['VehicleID']});
      sessionlist.push({StartedOn: res[i]['StartedOn']});
      sessionlist.push({FinishedOn: res[i]['FinishedOn']});
      sessionlist.push({EnergyDelivered: res[i]['EnergyDelivered']});
      // arr.push({PricePolicyRef: res[0]['PricePolicyRef']});
      sessionlist.push({CostPerKWh: res[i]['CostPerKWh']});
      sessionlist.push({TotalCost: res[i]['TotalCost']});
      arr.push(sessionlist)
}

			result(null,arr);
			return;

		}
		console.log("No result for this ID.")
		//result({ kind: "not_found" }, null);
		result(null,res);
		return;


	});
}


//module.exports=Session;
module.exports=Provider;
