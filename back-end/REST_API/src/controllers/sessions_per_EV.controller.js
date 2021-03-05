const SessionModel = require('../models/sessions_per_EV.model');

exports.getVehicle = (req,res) => {
	if ( ((req.params.yyyymmdd_from.match(/[0-2][0-9][0-9][0-9][0][1-9][0][1-9]/)) || (req.params.yyyymmdd_from.match(/[0-2][0-9][0-9][0-9][0][1-9][1-2][0-9]/)) || (req.params.yyyymmdd_from.match(/[0-2][0-9][0-9][0-9][0][1-9][3][0-1]/)) || (req.params.yyyymmdd_from.match(/[0-2][0-9][0-9][0-9][1][0-2][0][1-9]/)) || (req.params.yyyymmdd_from.match(/[0-2][0-9][0-9][0-9][1][0-2][1-2][0-9]/))|| (req.params.yyyymmdd_from.match(/[0-2][0-9][0-9][0-9][1][0-2][3][1-2]/)) )&&
 	     ((req.params.yyyymmdd_to.match(/[0-2][0-9][0-9][0-9][0][1-9][0][1-9]/)) || (req.params.yyyymmdd_to.match(/[0-2][0-9][0-9][0-9][0][1-9][1-2][0-9]/)) || (req.params.yyyymmdd_to.match(/[0-2][0-9][0-9][0-9][0][1-9][3][0-1]/)) || (req.params.yyyymmdd_to.match(/[0-2][0-9][0-9][0-9][1][0-2][0][1-9]/)) || (req.params.yyyymmdd_to.match(/[0-2][0-9][0-9][0-9][1][0-2][1-2][0-9]/))|| (req.params.yyyymmdd_to.match(/[0-2][0-9][0-9][0-9][1][0-2][3][1-2]/))) ) {

		SessionModel.getVehicleByID(req, (err,data) => {
			if (err) {
				res.send(err);
				return;
			}
			else if (data.length) {
				res.send(data);
				return;
			}
			else {
				res.statusMessage = 'No data';
				res.status(402).send('No vehicle with this ID');
				return; 
			}
		});
	}
	else {
		console.log('Invalid');
		res.statusMessage = 'Bad request';
		res.status(400).send('Bad request: A date you entered is not valid');
		return;
	}

};
