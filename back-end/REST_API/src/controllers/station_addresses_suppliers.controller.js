const StationAddressesModel=require('../models/station_addresses_suppliers.model');

exports.getStationAddresses=(req, res) => {
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
 			res.send(data);
 			return;
 		}
 		else {
 			res.statusMessage='No data';
 			res.status(402).send('No charging stations found.');
 			return;
 		}

 	});
 };
