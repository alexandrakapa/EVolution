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
	let username=(req.params.username);
	let periodfrom=(req.params.yyyy_from);
	console.log('Username ',username);
	console.log('Year',periodfrom);

	dbConn.query(`SELECT Charging.Car_Ownerusername as Car_Owner, MONTH(STR_TO_DATE(Charging.the_date, '%c/%e/%Y %H:%i')) as Month ,SUM(Charging.charging_price) as Total_Charging_Sum
	FROM Charging
	WHERE Charging.Car_Ownerusername='${username}' and YEAR(STR_TO_DATE(Charging.the_date, '%c/%e/%Y %H:%i'))>=${periodfrom} AND YEAR(STR_TO_DATE(Charging.the_date, '%c/%e/%Y'))<=${periodfrom}
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
			arr.push({Car_Owner: res[0]['Car_Owner']});
			arr.push({PeriodFrom: periodfrom});
			var months = [ "January", "February", "March", "April", "May", "June",
           "July", "August", "September", "October", "November", "December" ];
					let check=0;
					var newArr= new Array();
		 			for (var i=0; i<res.length; i++){
		       let sessionlist=new Array();
		       //arr.push({Number: res.length});
		 			if((res[i]['Month'] -1)==check){
		 			sessionlist.push({Month: months[res[i]['Month'] -1 ]});
		 			sessionlist.push({Total_Charging_Sum: res[i]['Total_Charging_Sum']});
					newArr.push({Month: months[res[i]['Month'] -1 ], Total_Charging_Sum: res[i]['Total_Charging_Sum'] })
					check=check+1;
		 		}
		 		else{
		 			sessionlist.push({Month: months[check]});
		 			sessionlist.push({Total_Charging_Sum: 0});
					newArr.push({Month: months[check],Total_Charging_Sum: 0 })
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
		 		sessionlist.push({Total_Charging_Sum: 0});
				newArr.push({Month: months[i],Total_Charging_Sum: 0})
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
		arr.push({Car_Owner: null})
		console.log("No result for this Car Owner.")

		//result({ kind: "not_found" }, null);
		result(null,arr);
		return;
	}


	});
}

//module.exports=Session;
module.exports=Supplier;
