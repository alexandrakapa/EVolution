const StationModel = require('../models/stationInfo.model');

exports.getAllStations = (req,res) =>
{
	StationModel.getAllStations( (err,stations) =>
	{
		if (err)
			res.send(err);
		console.log('Available stations', stations);
		res.send(stations);
		return;
	});
}

exports.getStationInfo = (req,res) =>
{
	StationModel.getStationInfo(req.params.stationID,(err,station) =>
		{
			if(err)
				res.send(err);
			console.log('Station Info', station);
			res.send(station);
			return;
		});
}

exports.getStationReview = (req,res) =>
{
	StationModel.getStationReview(req.params.stationID,(err,stationReview) =>
	{
		if (err)
			res.send(err);
		console.log('Station Review', stationReview);
		res.send(stationReview);
		return;
	});
}
