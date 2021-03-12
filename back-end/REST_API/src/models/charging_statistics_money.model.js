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
			for (var i=0; i<res.length; i++){
      let sessionlist=new Array();
      //arr.push({Number: res.length});
			sessionlist.push({Month: months[res[i]['Month'] -1 ]});
			sessionlist.push({Total_Charging_Sum: res[i]['Total_Charging_Sum']});
      arr.push(sessionlist)
}
			result(null, arr);
			return;

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
