const StationModel = require('../models/stationInfo.model');

exports.getAllStations= (req, res)=>{
  //check that the datatype requested is valid
 if (req.query.format!='csv' && req.query.format!=undefined && req.query.format!='json'){
     res.statusMessage = 'Bad Request'
     res.status(400).send("Invalid requested datatype.")
 }
    StationModel.getAllStations(req.query.format,(err, station)=>{
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

exports.getStationInfo= (req, res)=>{
  //check that the datatype requested is valid
 if (req.query.format!='csv' && req.query.format!=undefined && req.query.format!='json'){
     res.statusMessage = 'Bad Request'
     res.status(400).send("Invalid requested datatype.")
 }
    StationModel.getStationInfo(req.params.stationID,req.query.format,(err, station)=>{
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

exports.getStationReview= (req, res)=>{
  //check that the datatype requested is valid
 if (req.query.format!='csv' && req.query.format!=undefined && req.query.format!='json'){
     res.statusMessage = 'Bad Request'
     res.status(400).send("Invalid requested datatype.")
 }
    StationModel.getStationReview(req.params.stationID, req.query.format,(err, stationreview)=>{
      if (err) {
            res.send(err);
            return;
        }
        else if (stationreview.length){
            if (req.query.format=='csv'){
                    //console.log(data)
                    res.attachment('results.csv').send(stationreview);
                    return;
                }
                else if (req.query.format=='json' || req.query.format==undefined){
                    res.send(stationreview);
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
