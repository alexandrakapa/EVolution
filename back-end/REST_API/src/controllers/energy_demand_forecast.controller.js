 const SessionModel=require('../models/energy_demand_forecast.model');



  exports.getSessions=(req, res) => {

 	//check if any of the variables given is empty
  	if (Object.keys(req.params).length!=3){
  		res.statusMessage = 'Bad Request';
        res.status(400).send('Bad Request : Empty Required Field');
        return;
  	}
    console.log(req.params.yyyy_from);
    const ID = req.params.providerID;
    //check if provider ID length is valid based on our database's corresponding attribute's type
    if (ID.length > 255+255) {
        res.statusMessage = 'Bad Request';
        res.status(400).send('Bad Request : Invalid Supplier ID');
        return;
    }


    // check if date length is indeed 4 , because we want format yyyy
    if (req.params.yyyy_from.length != 4 || req.params.yyyy_to.length != 4) {
        res.statusMessage = 'Bad Request';
        res.status(400).send('Bad Request : Invalid Year Format');
        return;
    }

    //Start date check
    const from_year = req.params.yyyy_from;
    const to_year =req.params.yyyy_to;

    //General easy checks
    if (from_year < 1 || to_year < 1 ) {
        res.statusMessage = 'Bad Request';
        res.status(400).send('Bad Request : Invalid Year');
        return;
    }



    //Check if from_date < to_date
    if (from_year > to_year) {
        res.statusMessage = 'Bad Request';
        res.status(400).send('Bad Request : Starting Period Year must precede Ending Period Year');
        return;
    }


    //check that the datatype requested is valid
    if (req.query.format!='csv' && req.query.format!=undefined && req.query.format!='json'){
        res.statusMessage = 'Bad Request'
        res.status(400).send("Invalid requested datatype.")
    }

 	SessionModel.getSessionsbyManID(req, (err, data) => {
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
 			res.status(402).send('No Energy Demand Statistics found for this Supplier.');
 			return;
 		}

 	});


 };
