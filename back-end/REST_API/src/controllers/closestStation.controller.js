const StationModel =  require('../models/closestStation.model');

exports.getStationByCode = (req,res) => 
{
	StationModel.getStationByCode(req.params.postalcode, (err,stations) =>
	{
		if(err)
			res.send(err);
		console.log('Closest stations with requested parameters', stations);
		res.send(stations);
		return;
	});
}

exports.getStationByCodePrice = (req,res) => 
{
	StationModel.getStationByCodePrice(req.params.postalcode,req.params.lowerprice,req.params.higherprice,(err,stations)=>
	{
		if(err)
			res.send(err);
		console.log('Closest stations with requested parameters', stations);
		res.send(stations);
		return;
	});
}

exports.getStationByCodePay = (req,res) => 
{
	StationModel.getStationByCodePay(req.params.postalcode,req.params.payment,(err,stations)=>
	{
		if(err)
			res.send(err);
		console.log('Closest stations with requested parameters', stations);
		res.send(stations);
		return;
	});
}

exports.getStationByCodePricePay = (req,res) => 
{
	StationModel.getStationByCodePricePay(req.params.postalcode,req.params.lowerprice,req.params.higherprice,req.params.payment,(err,stations)=>
	{
		if(err)
			res.send(err);
		console.log('Closest stations with requested parameters', stations);
		res.send(stations);
		return;
	});
}
