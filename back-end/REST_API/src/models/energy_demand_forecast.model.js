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
	let supplierID=(req.params.supplierID);
	let periodfrom=(req.params.yyyy_from).substring(0,4);
	let periodto=(req.params.yyyy_to).substring(0,4);
	console.log('SupplierID ',supplierID);
	console.log('Year',periodfrom);
	//console.log(periodfrom);
	dbConn.query(`SELECT Energy_Supplier.ID as SupplierID ,Energy_Supplier.company_name as SupplierName,Station.ID as ID,Station.address_info as Address ,SUM(Charging.kWh_delivered) as Total_Energy_Delivered
	FROM Space,Energy_Supplier,Station,Charging
	WHERE Energy_Supplier.ID='${supplierID}' and Space.Energy_SupplierID=Energy_Supplier.ID  and Space.StationID=Station.ID  and Charging.SpaceStationID=Station.ID and Charging.supplierID=Energy_Supplier.ID AND YEAR(STR_TO_DATE(Charging.the_date, '%c/%e/%Y %H:%i'))>=${req.params.yyyy} AND YEAR(STR_TO_DATE(Charging.the_date, '%c/%e/%Y'))<=${req.params.yyyy}`
	, (err, res) =>
	{
		if (err) {
		    console.log("error: ", err);
		    result(err, null);
		    return;
		    }
				console.log(res[0]['SupplierID']);
		if (res[0]['SupplierID']!=null){
			console.log(res[0]['SupplierID']);
			console.log('Found Supplier.')
			//arr.push(res);
			arr.push({SupplierID: res[0]['SupplierID']});
			arr.push({SupplierName: res[0]['SupplierName']});
			arr.push({PeriodFrom: periodfrom});
			arr.push({PeriodTo: periodto});
			arr.push({Station: station});
			arr.push({Station: res[0]['Address']});
			arr.push({TotalEnergyDelivered: res[0]['Total_Energy_Delivered']});
			//Session.getter(req, arr, result);
			result(null, arr);
			return;

		}
		console.log("No result for this ID.")
		//result({ kind: "not_found" }, null);
		result(null,res);
		return;


	});
}
//module.exports=Session;
module.exports=Supplier;
