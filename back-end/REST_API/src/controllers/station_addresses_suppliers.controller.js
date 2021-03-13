const StationAddressesModel=require('../models/station_addresses_suppliers.model');

exports.getStationAddresses=(req, res) => {

	//check that the datatype requested is valid
	if (req.query.format!='csv' && req.query.format!=undefined && req.query.format!='json'){
			res.statusMessage = 'Bad Request'
			res.status(400).send("Invalid requested datatype.")
	}

	StationAddressesModel.getStationAddresses(req, (err, data) => {

		const ID = req.params.supplierID;
		//check if provider ID length is valid based on our database's corresponding attribute's type
		if (ID.length > 255) {
				res.statusMessage = 'Bad Request';
				res.status(400).send('Bad Request : Invalid Provider ID');
				return;
		}

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
