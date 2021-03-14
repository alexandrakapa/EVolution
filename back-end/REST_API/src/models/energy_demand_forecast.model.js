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

	dbConn.query(`SELECT Energy_Supplier.ID as SupplierID ,Energy_Supplier.company_name as SupplierName, MONTH(STR_TO_DATE(Charging.the_date, '%e/%c/%Y %H:%i')) as Month ,SUM(Charging.kWh_delivered) as Total_Energy_Delivered
	FROM Space,Energy_Supplier,Station,Charging
	WHERE Energy_Supplier.ID='${supplierID}' and Space.Energy_SupplierID=Energy_Supplier.ID  and Space.StationID=Station.ID  and Charging.SpaceStationID=Station.ID and Charging.supplierID=Energy_Supplier.ID AND YEAR(STR_TO_DATE(Charging.the_date, '%e/%c/%Y %H:%i'))>=${periodfrom} AND YEAR(STR_TO_DATE(Charging.the_date, '%e/%c/%Y'))<=${periodto}
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
			let newArr= new Array();
			let check=0;
			for (var i=0; i<res.length; i++){
				let sessionlist=new Array();
	      //arr.push({Number: res.length});
				if((res[i]['Month'] -1)==check){
				sessionlist.push({Month: months[res[i]['Month'] -1 ]});
				sessionlist.push({TotalEnergyDelivered: res[i]['Total_Energy_Delivered']});
				newArr.push({Month: months[res[i]['Month'] -1 ], TotalEnergyDelivered: res[i]['Total_Energy_Delivered'] });
				check=check+1;
			}
			else{
				sessionlist.push({Month: months[check]});
				sessionlist.push({TotalEnergyDelivered: 0});
				newArr.push({Month: months[check],TotalEnergyDelivered: 0 })

				i--;
				check=check+1;

			}
	      arr.push(sessionlist)
}
let diff= 11 -(res[res.length-1]['Month'] -1) ;
if(diff==0){

		if (req.query.format=='csv'){
		console.log("found it")
		var tocsv=newArr
		newArr.unshift(arr[0],arr[1])

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
	else{
		result(null, arr);
		return;
	}




}
else {
	for (var i=12-diff; i<12;i++){
		let sessionlist=new Array();
		sessionlist.push({Month: months[i]});
		sessionlist.push({TotalEnergyDelivered: 0});
		newArr.push({Month: months[i],TotalEnergyDelivered: 0})
		arr.push(sessionlist)
	}

	if (req.query.format=='csv'){
	console.log("found it")
	var tocsv=newArr
	newArr.unshift(arr[0],arr[1])

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
else{
	result(null, arr);
	return;
}



}

}
		else{
		arr.push({SupplierID: null})
		console.log("No result for this ID.")

		//result({ kind: "not_found" }, null);
		result(null,arr);
		return;
	}


	});

}
else{
dbConn.query(`SELECT Energy_Supplier.ID as SupplierID ,Energy_Supplier.company_name as SupplierName, YEAR(STR_TO_DATE(Charging.the_date, '%e/%c/%Y %H:%i')) as Year ,SUM(Charging.kWh_delivered) as Total_Energy_Delivered
FROM Space,Energy_Supplier,Station,Charging
WHERE Energy_Supplier.ID='${supplierID}' and Space.Energy_SupplierID=Energy_Supplier.ID  and Space.StationID=Station.ID  and Charging.SpaceStationID=Station.ID and Charging.supplierID=Energy_Supplier.ID AND YEAR(STR_TO_DATE(Charging.the_date, '%e/%c/%Y %H:%i'))>=${req.params.yyyy_from} AND YEAR(STR_TO_DATE(Charging.the_date, '%e/%c/%Y'))<=${req.params.yyyy_to}
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
		let newArr= new Array();
		for (var i=0; i<res.length; i++){
		let sessionlist=new Array();
		//arr.push({Number: res.length});
		sessionlist.push({Year: res[i]['Year']});
		sessionlist.push({TotalEnergyDelivered: res[i]['Total_Energy_Delivered']});
		newArr.push({Year: res[i]['Year'],TotalEnergyDelivered: res[i]['Total_Energy_Delivered'] })
		arr.push(sessionlist)
}
		if (req.query.format=='csv'){
		console.log("found it")
		var tocsv=newArr
		newArr.unshift(arr[0],arr[1],arr[2],arr[3])

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
	else{
		result(null, arr);
		return;
	}

}
	else{
	arr.push({SupplierID: null})
	console.log("No result for this ID.")

	//result({ kind: "not_found" }, null);
	result(null,arr);
	return;
}

});
}

}
//module.exports=Session;
module.exports=Supplier;
