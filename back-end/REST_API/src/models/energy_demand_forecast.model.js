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


Supplier.getSessionsbyManID = async (req, result) => {

	//console.log(parsedate());
	let arr=new Array();
	let supplierID=(req.params.providerID);
	let periodfrom=(req.params.yyyy_from);
	let periodto=(req.params.yyyy_to);
	console.log('SupplierID ',supplierID);
	console.log('Year',periodfrom);
	//console.log(periodfrom);
if(periodfrom==periodto|| periodto==2018||periodfrom==2020) {
	if(periodto==2018){
		periodfrom="2018";
	}
	else if (periodfrom==2020){
		periodto="2020";
	}

	dbConn.query(`SELECT Energy_Supplier.ID as SupplierID ,Energy_Supplier.company_name as SupplierName, MONTH(STR_TO_DATE(Charging.the_date, '%c/%e/%Y %H:%i')) as Month ,SUM(Charging.kWh_delivered) as Total_Energy_Delivered
	FROM Space,Energy_Supplier,Station,Charging
	WHERE Energy_Supplier.ID='${supplierID}' and Space.Energy_SupplierID=Energy_Supplier.ID  and Space.StationID=Station.ID  and Charging.SpaceStationID=Station.ID and Charging.supplierID=Energy_Supplier.ID AND YEAR(STR_TO_DATE(Charging.the_date, '%c/%e/%Y %H:%i'))>=${periodfrom} AND YEAR(STR_TO_DATE(Charging.the_date, '%c/%e/%Y'))<=${periodto}
	GROUP BY Month
	ORDER BY Month ASC`
	, (err, res) =>
	{
		if (err) {
		    console.log("error: ", err);
		    result(err, null);
		    return;
		    }
		console.log(res.length);
		if (res.length != 0){
			arr.push({SupplierID: res[0]['SupplierID']});
			arr.push({SupplierName: res[0]['SupplierName']});
			arr.push({PeriodFrom: periodfrom});
			arr.push({PeriodTo: periodto});
			var months = [ "January", "February", "March", "April", "May", "June",
           "July", "August", "September", "October", "November", "December" ];
			for (var i=0; i<res.length; i++){
      let sessionlist=new Array();
      //arr.push({Number: res.length});
			sessionlist.push({Month: months[res[i]['Month'] -1 ]});
			sessionlist.push({TotalEnergyDelivered: res[i]['Total_Energy_Delivered']});
      arr.push(sessionlist)
}
			result(null, arr);
			return;

		}
		console.log("No result for this ID and this Date .")
		//result({ kind: "not_found" }, null);
		result(null,res);
		return;


	});

}
else{
dbConn.query(`SELECT Energy_Supplier.ID as SupplierID ,Energy_Supplier.company_name as SupplierName, YEAR(STR_TO_DATE(Charging.the_date, '%c/%e/%Y %H:%i')) as Year ,SUM(Charging.kWh_delivered) as Total_Energy_Delivered
FROM Space,Energy_Supplier,Station,Charging
WHERE Energy_Supplier.ID='${supplierID}' and Space.Energy_SupplierID=Energy_Supplier.ID  and Space.StationID=Station.ID  and Charging.SpaceStationID=Station.ID and Charging.supplierID=Energy_Supplier.ID AND YEAR(STR_TO_DATE(Charging.the_date, '%c/%e/%Y %H:%i'))>=${req.params.yyyy_from} AND YEAR(STR_TO_DATE(Charging.the_date, '%c/%e/%Y'))<=${req.params.yyyy_to}
GROUP BY Year
ORDER BY Year ASC`
, (err, res) =>
{
	if (err) {
			console.log("error: ", err);
			result(err, null);
			return;
			}
	console.log(res.length);
	if (res.length != 0){
		arr.push({SupplierID: res[0]['SupplierID']});
		arr.push({SupplierName: res[0]['SupplierName']});
		arr.push({PeriodFrom: periodfrom});
		arr.push({PeriodTo: periodto});
		for (var i=0; i<res.length; i++){
		let sessionlist=new Array();
		//arr.push({Number: res.length});
		sessionlist.push({Year: res[i]['Year']});
		sessionlist.push({TotalEnergyDelivered: res[i]['Total_Energy_Delivered']});
		arr.push(sessionlist)
}

		result(null, arr);
		return;

	}
	console.log("No result for this ID.")
	//result({ kind: "not_found" }, null);
	result(null,res);
	return;


});
}

}
//module.exports=Session;
module.exports=Supplier;
