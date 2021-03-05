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
    if (from_year < 2000 || to_year < 2000 ) {
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


 	SessionModel.getSessionsbyManID(req, (err, data) => {
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
 			res.status(402).send('No Energy Demand Statistics found for this Supplier.');
 			return;
 		}

 	});


 };
