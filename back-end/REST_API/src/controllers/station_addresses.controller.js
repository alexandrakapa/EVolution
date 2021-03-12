const StationAddressesModel=require('../models/station_addresses.model');

exports.getStationAddresses=(req, res) => {


    //check that the datatype requested is valid
    if (req.query.format!='csv' && req.query.format!=undefined && req.query.format!='json'){
        res.statusMessage = 'Bad Request'
        res.status(400).send("Invalid requested datatype.")
    }
    
	StationAddressesModel.getStationAddresses(req, (err, data) => {
 		if (err) {
 			res.send(err);
 			return;
 		}
 		else if (data.length){
 			  if (req.query.format=='csv'){
                    //console.log(data)
                    res.attachment('results.csv').send(data);
                    return;
                }
                else if (req.query.format=='json' || req.query.format==undefined){
                    res.send(data);
                    console.log('json')
                    return;
                }
                else {
                    console.log('error in query.format, should not be here')
                }
 		}
 		else {
 			res.statusMessage='No data';
 			res.status(402).send('No charging stations found.');
 			return;
 		}
 		
 	});
 };