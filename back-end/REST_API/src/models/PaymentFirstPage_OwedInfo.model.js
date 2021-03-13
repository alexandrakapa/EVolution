const dbConn = require('../../config/db.config');
const converter = require('json-2-csv');

const PaymentInfo = function (station) {};

PaymentInfo.getOwedInfo = async (req, result)=> {
    let resultarray = new Array()
    let username = (req.params.username);
    dbConn.query(`SELECT Car_Owner.price_to_pay as owed,
                         Car_Owner.points as points,
                         in_program_with.monthly_charge as program,
                         in_program_with.discount as discount
                    FROM Car_Owner
                    LEFT JOIN in_program_with
                    ON Car_Owner.username = in_program_with.Car_Ownerusername
                    WHERE Car_Owner.username = '${username}' `, (err, res)=> {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        else if (res.length) {
            resultarray.push({OwedMoney: res[0]['owed']});
            resultarray.push({Points: res[0]['points']});
            if (res[0]['program'] == -1.00) {
               resultarray.push({MonthlyProgram: null})
            }
            else {
                resultarray.push({MonthlyProgram: res[0]['program']});
            }
            if (res[0]['discount'] == -1) {
                resultarray.push({Discount: null})
            }
            else {
                resultarray.push({Discount: res[0]['discount']});
            }
        
            if (req.query.format=='csv'){
				console.log("found it")
				var tocsv=resultarray
				
			    converter.json2csv(tocsv, (err, csv) =>{
			    	if (err) {
			    		result(err, null);
			    	}
			    	else {
			    		result(null, csv);
			    	}
			    }, {emptyFieldValue  : ''})
                
                return;
			}
            else {
                result(null, resultarray);
                return;
            }
            

        }

        else {
            result(null, resultarray);
            return;
        }

    });

}

module.exports = PaymentInfo;
