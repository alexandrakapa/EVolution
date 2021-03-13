const ChargingModel = require('../models/chargingData.model');


exports.getChargingData = (req, res)=>{
  //check that the datatype requested is valid
 if (req.query.format!='csv' && req.query.format!=undefined && req.query.format!='json'){
     res.statusMessage = 'Bad Request'
     res.status(400).send("Invalid requested datatype.")
 }
    ChargingModel.getChargingData(req.params.chargingID,req.query.format,(err, charging)=>{
      if (err) {
            res.send(err);
            return;
        }
        else if (charging.length){
            if (req.query.format=='csv'){
                    //console.log(data)
                    res.attachment('results.csv').send(charging);
                    return;
                }
                else if (req.query.format=='json' || req.query.format==undefined){
                    res.send(charging);
                    console.log('json')
                    return;
                }
                else {
                    console.log('error in query.format, should not be here')
                }
        }
        else {
            res.statusMessage='No data';
            res.status(402).send('No Data.');
            return;
        }
    });
}


exports.getChargingDataByOwner = (req, res)=>{
  //check that the datatype requested is valid
 if (req.query.format!='csv' && req.query.format!=undefined && req.query.format!='json'){
     res.statusMessage = 'Bad Request'
     res.status(400).send("Invalid requested datatype.")
 }
    ChargingModel.getChargingDataByOwner(req.params.username,req.params.vehicleID,req.query.format,(err, charging)=>{
      if (err) {
            res.send(err);
            return;
        }
        else if (charging.length){
            if (req.query.format=='csv'){
                    //console.log(data)
                    res.attachment('results.csv').send(charging);
                    return;
                }
                else if (req.query.format=='json' || req.query.format==undefined){
                    res.send(charging);
                    console.log('json')
                    return;
                }
                else {
                    console.log('error in query.format, should not be here')
                }
        }
        else {
            res.statusMessage='No data';
            res.status(402).send('No Data.');
            return;
        }
    });
}




// exports.getChargingCost = (req, res)=>{
//     ChargingModel.getChargingCost(req.params.chargingID,(err, chargingCost)=>{
//         if(err)
//         res.send(err);
//         console.log('single charging cost',chargingCost);
//         res.send(chargingCost);
//         return;
//     });
// }
