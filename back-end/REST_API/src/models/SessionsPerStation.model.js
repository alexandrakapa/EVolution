const dbConn = require('../../config/db.config');

const Station = function (station) {};

const parsedate= function() {
	let date=new Date();
    let year = date.getFullYear().toString();
    let month=('0'+(date.getMonth()+1).toString()).slice(-2);
    let day=('0'+date.getDate().toString()).slice(-2);
    let hour=('0'+date.getHours().toString()).slice(-2);
    let min=('0'+date.getMinutes().toString()).slice(-2);
    let sec=('0'+date.getSeconds().toString()).slice(-2);
    return(year+'-'+month+'-'+day+' '+hour+':'+min+':'+sec);
};

Station.getStationByID = async (req, result)=> {
    let currentdate = parsedate();
    let resultarray = new Array();
    let myList = new Array();
    let stationid = (req.params.stationID);
    let periodfrom = ((req.params.yyyymmdd_from).substring(0,4)).concat('-',(req.params.yyyymmdd_from).substring(4,6),'-',(req.params.yyyymmdd_from).substring(6,8));
    let periodto = ((req.params.yyyymmdd_to).substring(0,4)).concat('-',(req.params.yyyymmdd_to).substring(4,6),'-',(req.params.yyyymmdd_to).substring(6,8));
    dbConn.query(`SELECT Station.operator as Operator,
                         Charging.Spacename as PointID, 
                         Charging.SpaceStationID as StationID, 
                         COUNT(Charging.ID) as PointSessions, 
                         SUM(Charging.kWh_delivered) as EnergyDelivered
                  FROM Charging
                  LEFT JOIN Station
                  ON Charging.SpaceStationID = Station.ID
                  WHERE Charging.SpaceStationID = '${stationid}'
                        AND DATE(STR_TO_DATE(Charging.the_date, '%e/%c/%Y %H:%i')) >= (SELECT DATE(${req.params.yyyymmdd_from}) FROM dual) 
                        AND DATE(STR_TO_DATE(Charging.the_date, '%e/%c/%Y')) <= (SELECT DATE(${req.params.yyyymmdd_to}) FROM dual)
                  GROUP BY Charging.Spacename
                  ORDER BY Charging.Spacename`, (err, res)=> {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }

        else if (res.length) {
            resultarray.push({StationID: stationid});
            resultarray.push({Operator: res[0]['Operator']});
            resultarray.push({RequestTimestamp: currentdate});
            resultarray.push({PeriodFrom: periodfrom});
            resultarray.push({PeriodTo: periodto});

            var TotalEnergy = 0;
            var TotalSessions = 0;
            for (var i=0; i<res.length; i++) {
                TotalEnergy += res[i]['EnergyDelivered'];
                TotalSessions += res[i]['PointSessions'];
            }

            resultarray.push({TotalEnergyDelivered: TotalEnergy});
            resultarray.push({NumberOfChargingSessions: TotalSessions});

            myList.push({NumberOfActivePoints: res.length});

            for (var i=0; i<res.length; i++) {
                myList.push({PointID: res[i]['StationID'].concat(' ', res[i]['PointID']), PointSessions: res[i]['PointSessions'], EnergyDelivered: res[i]['EnergyDelivered']});
            }

            resultarray.push(myList);
            result(null, resultarray);
            return;
            
        }

        else {
            result(null, resultarray);
            return;
        }

    });

}

module.exports = Station;