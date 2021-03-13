const StationModel =  require('../models/closestStation.model');

exports.getStationByCode= (req, res)=>{
  //check that the datatype requested is valid
 if (req.query.format!='csv' && req.query.format!=undefined && req.query.format!='json'){
     res.statusMessage = 'Bad Request'
     res.status(400).send("Invalid requested datatype.")
 }
    StationModel.getStationByCode(req.params.postalcode,req.query.format,(err, station)=>{
      if (err) {
            res.send(err);
            return;
        }
        else if (station.length){
            if (req.query.format=='csv'){
                    //console.log(data)
                    res.attachment('results.csv').send(station);
                    return;
                }
                else if (req.query.format=='json' || req.query.format==undefined){
                    res.send(station);
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

exports.getStationByCodePrice= (req, res)=>{
  //check that the datatype requested is valid
 if (req.query.format!='csv' && req.query.format!=undefined && req.query.format!='json'){
     res.statusMessage = 'Bad Request'
     res.status(400).send("Invalid requested datatype.")
 }
    StationModel.getStationByCodePrice(req.params.postalcode,req.params.lowerprice,req.params.higherprice,req.query.format,(err, station)=>{
      if (err) {
            res.send(err);
            return;
        }
        else if (station.length){
            if (req.query.format=='csv'){
                    //console.log(data)
                    res.attachment('results.csv').send(station);
                    return;
                }
                else if (req.query.format=='json' || req.query.format==undefined){
                    res.send(station);
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

exports.getStationByCodePay= (req, res)=>{
  //check that the datatype requested is valid
 if (req.query.format!='csv' && req.query.format!=undefined && req.query.format!='json'){
     res.statusMessage = 'Bad Request'
     res.status(400).send("Invalid requested datatype.")
 }
    StationModel.getStationByCodePay(req.params.postalcode,req.params.payment,req.query.format,(err, station)=>{
      if (err) {
            res.send(err);
            return;
        }
        else if (station.length){
            if (req.query.format=='csv'){
                    //console.log(data)
                    res.attachment('results.csv').send(station);
                    return;
                }
                else if (req.query.format=='json' || req.query.format==undefined){
                    res.send(station);
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

exports.getStationByCodePricePay= (req, res)=>{
  //check that the datatype requested is valid
 if (req.query.format!='csv' && req.query.format!=undefined && req.query.format!='json'){
     res.statusMessage = 'Bad Request'
     res.status(400).send("Invalid requested datatype.")
 }
    StationModel.getStationByCodePricePay(req.params.postalcode,req.params.lowerprice,req.params.higherprice,req.params.payment,req.query.format,(err, station)=>{
      if (err) {
            res.send(err);
            return;
        }
        else if (station.length){
            if (req.query.format=='csv'){
                    //console.log(data)
                    res.attachment('results.csv').send(station);
                    return;
                }
                else if (req.query.format=='json' || req.query.format==undefined){
                    res.send(station);
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
