const dbConn  = require('../../config/db.config');
const converter = require('json-2-csv');


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
	let station=( req.params.station);
	let periodfrom=((req.params.yyyymmdd_from).substring(0,4)).concat('-',(req.params.yyyymmdd_from).substring(4,6),'-',(req.params.yyyymmdd_from).substring(6,8));
	let periodto=((req.params.yyyymmdd_to).substring(0,4)).concat('-',(req.params.yyyymmdd_to).substring(4,6),'-',(req.params.yyyymmdd_to).substring(6,8));
	console.log('SupplierID ',supplierID);
	console.log('Station',station);
	//console.log(periodfrom);
	dbConn.query(`SELECT Energy_Supplier.ID as SupplierID ,Energy_Supplier.company_name as SupplierName,Station.ID as ID,Station.address_info as Address ,SUM(Charging.kWh_delivered) as Total_Energy_Delivered
	FROM Space,Energy_Supplier,Station,Charging
	WHERE Energy_Supplier.ID='${supplierID}' and   Space.Energy_SupplierID=Energy_Supplier.ID and   Space.StationID=Station.ID and Station.ID='${station}' and Charging.SpaceStationID=Station.ID and Charging.supplierID=Energy_Supplier.ID AND DATE(STR_TO_DATE(Charging.the_date, '%e/%c/%Y %H:%i'))>=(SELECT DATE(${req.params.yyyymmdd_from}) FROM dual) AND DATE(STR_TO_DATE(Charging.the_date, '%e/%c/%Y'))<=(SELECT DATE(${req.params.yyyymmdd_to}) FROM dual)`
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
			arr.push({StationID: station});
			arr.push({Station: res[0]['Address']});
			arr.push({TotalEnergyDelivered: res[0]['Total_Energy_Delivered']});
			//Session.getter(req, arr, result);
			if (req.query.format=='csv'){
			console.log("found it")
			var tocsv=arr



				converter.json2csv(tocsv, (err, csv) =>{
					if (err) {
						result(err,null)
					}

					else {
						//result.attachment('results.csv').send(csv)
						result(null,csv)
					}
				}, {emptyFieldValue  : ''})

		}
		else {
			result(null,arr)
		}

		//END OF CSV  --------------------------------

			//result(null, arr);
			//return;

	}
	else{
		console.log("No result for this ID.")
		//result({ kind: "not_found" }, null);
		result(null,res);
		return;
}

	});
}
//module.exports=Session;
module.exports=Supplier;
