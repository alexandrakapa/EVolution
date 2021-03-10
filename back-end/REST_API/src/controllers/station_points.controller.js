const StationPointsModel=require('../models/station_points.model');

exports.getStationPoints=(req, res) => {
	StationPointsModel.getStationPoints(req, (err, data) => {
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
 			res.status(402).send('No charging points found.');
 			return;
 		}
 		
 	});
 };