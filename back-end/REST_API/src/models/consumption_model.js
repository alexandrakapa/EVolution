var dbConn  = require('../../config/db.config');
const converter = require('json-2-csv');




var Consumer = function(user){
    this.id = user.id;
    this.username     =   user.username;
    this.token = user.token;
    this.category ="";
    this.sessionID =user.sessionID;

}
  Consumer.fetchStats = async(req,result) =>{
    dbConn.query( `SELECT SUM(Charging.kWh_delivered) as EnergyConsumption , Car.model as Model FROM Charging RIGHT 
    OUTER JOIN (Car RIGHT OUTER JOIN Car_Manufacturer ON Car.Car_ManufacturerID=Car_Manufacturer.ID ) ON Charging.CarID=Car.ID 
    WHERE Car_Manufacturer.company_name="${req.params.companyName}" 
    And DATE(STR_TO_DATE(Charging.the_date, '%e/%c/%Y %H:%i'))>=(SELECT DATE(${req.params.yyyymmdd_from}) FROM dual) AND DATE(STR_TO_DATE(Charging.the_date, '%e/%c/%Y'))<=(SELECT DATE(${req.params.yyyymmdd_to}) FROM dual)
    GROUP BY Car.model`
    , (err, res)=>{
        if(err){
            console.log('Error while fetching user by username', err);
            res(err, null);
            return;
        }
        if (res.length){
            console.log("Found data.");

             if (req.query.format=='csv'){
                console.log("found it")
                var tocsv=res
                                
                converter.json2csv(tocsv, (err, csv) =>{
                    if (err) {
                        result(err,null)
                    }

                    else {
                        //result.attachment('results.csv').send(csv)
                        result(null,csv)
                    }
                },{emptyFieldValue  : ''})
        }
        else {
                result(null,res)
            }
    

        }
        else {
            console.log('No data found.')

            result(null, res);
            return;
        }
    })
}
module.exports = Consumer;
