const dbConn = require('../../config/db.config');

const Payment = function (payment) {};
var resarray = new Array();
var IDarray = new Array();
var stillowedarray = new Array();

const CreateDateFormat = function() {
	let date=new Date();
    let year = date.getFullYear().toString();
    let month=('0'+(date.getMonth()+1).toString()).slice(-2);
    let day=('0'+date.getDate().toString()).slice(-2);
    let hour=('0'+date.getHours().toString()).slice(-2);
    let min=('0'+date.getMinutes().toString()).slice(-2);
    let sec=('0'+date.getSeconds().toString()).slice(-2);
    let AM_PM = 'AM';

    if (hour == 12) {
        AM_PM = 'PM';
    }
    else if (hour > 12) {
        hourHelp = parseInt(hour);
        hourHelp -= 12;
        if (hourHelp < 10) {
            hour = '0' + hourHelp.toString();
        }
        else {
            hour = hourHelp.toString();
        }
        AM_PM = 'PM';
    }

    return( day + '/' + month + '/' + year + ' ' + hour + ':' + min + ':' + sec + ' ' + AM_PM);
};


Payment.CreateNewPayment = (req, result)=> {

    let currentdate = CreateDateFormat();
    let username = (req.params.username).toString();
    let moneypaid = parseFloat(req.params.moneypaid);
    let paymentway = (req.params.paymentway).toString();
    let bankid = parseInt(req.params.bankID);
    let pointsused = parseInt(req.params.pointsused);

    dbConn.query(`INSERT INTO Payment (value_paid, payment_way, date_time, points_used, Car_Ownerusername, BankID)
                  VALUES ('${moneypaid}', '${paymentway}', '${currentdate}', '${pointsused}', '${username}', '${bankid}')`, (err, res)=> {

        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        else {
            //console.log('Inserted Payment Successfully');
            Payment.ChargingsToBePaid(req, currentdate, IDarray, stillowedarray, result);
        }
    });
}

Payment.ChargingsToBePaid = (req, currentdate, idarray, moneyarray, result)=> {

    let username = (req.params.username).toString();
    let paymentway = (req.params.paymentway).toString();
    let bankid = parseInt(req.params.bankID);
    let pointsused = parseInt(req.params.pointsused);
    let moneypaid = parseFloat(req.params.moneypaid);

    dbConn.query(`SELECT Charging.ID as id, Charging.still_owed as owed,
     (CASE SUBSTRING(Charging.connection_time, 9,3)
      WHEN 'Jan' THEN CONCAT(SUBSTRING(Charging.connection_time, 13,4), '/01/', SUBSTRING(Charging.connection_time, 6,2))
      WHEN 'Feb' THEN CONCAT(SUBSTRING(Charging.connection_time, 13,4), '/02/', SUBSTRING(Charging.connection_time, 6,2))
      WHEN 'Mar' THEN CONCAT(SUBSTRING(Charging.connection_time, 13,4), '/03/', SUBSTRING(Charging.connection_time, 6,2))
      WHEN 'Apr' THEN CONCAT(SUBSTRING(Charging.connection_time, 13,4), '/04/', SUBSTRING(Charging.connection_time, 6,2))
      WHEN 'May' THEN CONCAT(SUBSTRING(Charging.connection_time, 13,4), '/05/', SUBSTRING(Charging.connection_time, 6,2))
      WHEN 'Jun' THEN CONCAT(SUBSTRING(Charging.connection_time, 13,4), '/06/', SUBSTRING(Charging.connection_time, 6,2))
      WHEN 'Jul' THEN CONCAT(SUBSTRING(Charging.connection_time, 13,4), '/07/', SUBSTRING(Charging.connection_time, 6,2))
      WHEN 'Aug' THEN CONCAT(SUBSTRING(Charging.connection_time, 13,4), '/08/', SUBSTRING(Charging.connection_time, 6,2))
      WHEN 'Sep' THEN CONCAT(SUBSTRING(Charging.connection_time, 13,4), '/09/', SUBSTRING(Charging.connection_time, 6,2))
      WHEN 'Oct' THEN CONCAT(SUBSTRING(Charging.connection_time, 13,4), '/10/', SUBSTRING(Charging.connection_time, 6,2))
      WHEN 'Nov' THEN CONCAT(SUBSTRING(Charging.connection_time, 13,4), '/11/', SUBSTRING(Charging.connection_time, 6,2))
      ELSE CONCAT(SUBSTRING(Charging.connection_time, 13,4), '/12/', SUBSTRING(Charging.connection_time, 6,2))
     END
     ) as orderdate
     FROM Charging
     WHERE Charging.Car_Ownerusername = '${username}' AND Charging.still_owed > 0
     ORDER BY orderdate` , (err, res)=> {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        else {
            var counter = moneypaid;

            for (var i = 0; i < res.length; i++) {
                idarray[i] = res[i]['id'];
                counter -= res[i]['owed'];
                if (counter > 0) {
                    moneyarray[i] = 0;
                }
                else {
                    moneyarray[i] = (-1) * counter;
                    break;
                }
            }

            /*for (i=0; i<idarray.length; i++){
                console.log(idarray[i]);
            }
            console.log("DONE");*/


            dbConn.query(`SELECT Payment.ID as id
                          FROM Payment
                          WHERE Payment.value_paid = '${moneypaid}'
                                AND Payment.payment_way = '${paymentway}'
                                AND Payment.date_time = '${currentdate}'
                                AND Payment.points_used = '${pointsused}'
                                AND Payment.Car_Ownerusername = '${username}'
                                AND Payment.BankID = '${bankid}'
                                ORDER BY Payment.ID DESC LIMIT 1`, (err, res)=>{
                                    if (err) {
                                        console.log("error: ", err);
                                        result(err, null);
                                        return;
                                    }
                                    else {
                                        //console.log(res[0]['id']);

                                        //console.log(idarray.length);

                                        for (i=0; i<idarray.length; i++){
                                            Payment.CreatePaysUp(req, res[0]['id'], idarray[i], moneyarray[i], result);
                                            Payment.UpdateStillOwed(req, idarray[i], moneyarray[i], result);
                                        }
                                        while (idarray.length > 0){
                                            idarray.pop();
                                            moneyarray.pop();
                                        }

                                        //console.log('Pays up created - still_owed updated');
                                        Payment.UpdatePoints(req, result);
                                    }
            });
        }
     });
}

Payment.CreatePaysUp = (req, paymentid, chargingid, moneyarray, result)=> {

        dbConn.query(`Insert into pays_up (PaymentID, ChargingID) VALUES ('${paymentid}' , '${chargingid}')`, (err, res)=> {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            else {
                //console.log("inserted pays up ", chargingid);
                return;
            }
        });

}

Payment.UpdateStillOwed = (req, id, stillowed, result)=> {

        dbConn.query(`UPDATE Charging SET Charging.still_owed = '${stillowed}' WHERE Charging.ID = '${id}'`, (err, res)=> {
            if (err) {
                console.log("error: ", err);
                result(err, null);
                return;
            }
            else {
                //console.log("Made update still owed", id);
                return;
            }
        });
}

Payment.UpdatePoints = (req, result)=> {
    let username = (req.params.username).toString();
    let moneypaid = parseFloat(req.params.moneypaid);
    let points_used = parseInt(req.params.pointsused);
		let minpoints = points_used/0.2;
    var decimalpoints = moneypaid * 0.2;
    const points_earned = Math.round(decimalpoints);
    var pointsforbase = parseInt(points_earned - points_used);

    dbConn.query(`UPDATE Car_Owner SET Car_Owner.points = Car_Owner.points + '${pointsforbase}', Car_Owner.price_to_pay = Car_Owner.price_to_pay - '${moneypaid}' - '${minpoints}' WHERE Car_Owner.username = '${username}'`, (err, res)=> {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        else {
            //console.log("updated points successfully");
            Payment.ReturnPoints(req, points_earned, result);
        }
    });
}

Payment.ReturnPoints = (req, earnedpoints, result)=> {
    let username = (req.params.username).toString();

    resarray.push({EarnedPoints: earnedpoints});

    dbConn.query(`SELECT Car_Owner.points as TotalPoints FROM Car_Owner WHERE Car_Owner.username = '${username}'`, (err,res)=> {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        else {
            resarray.push({TotalPoints: res[0]['TotalPoints']});
            result(null, resarray);
            return;
        }
    });
}

module.exports = Payment;
