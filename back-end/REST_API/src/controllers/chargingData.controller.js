const ChargingModel = require('../models/chargingData.model');


exports.getChargingData = (req, res)=>{
    ChargingModel.getChargingData(req.params.chargingID,(err, charging)=>{
        if(err)
        res.send(err);
        console.log('single charging data',charging);
        res.send(charging);
        return;
    });
}

exports.getChargingCost = (req, res)=>{
    ChargingModel.getChargingCost(req.params.chargingID,(err, chargingCost)=>{
        if(err)
        res.send(err);
        console.log('single charging cost',chargingCost);
        res.send(chargingCost);
        return;
    });
}
