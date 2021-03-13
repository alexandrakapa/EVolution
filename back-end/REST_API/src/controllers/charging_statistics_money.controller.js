 const SessionModel=require('../models/charging_statistics_money.model');



  exports.getSessions=(req, res) => {

 	//check if any of the variables given is empty
  	if (Object.keys(req.params).length!=2){
  		res.statusMessage = 'Bad Request';
        res.status(400).send('Bad Request : Empty Required Field');
        return;
  	}
    console.log(req.params.yyyy_from);
    const username = req.params.username;
    //check if username length is valid based on our database's corresponding attribute's type
    if (username.length > 255) {
        res.statusMessage = 'Bad Request';
        res.status(400).send('Bad Request : Invalid Username');
        return;
    }


    // check if date length is indeed 4 , because we want format yyyy
    if (req.params.yyyy_from.length != 4) {
        res.statusMessage = 'Bad Request';
        res.status(400).send('Bad Request : Invalid Year Format');
        return;
    }

    //Start date check
    const from_year = req.params.yyyy_from;

    //General easy checks
    if (from_year < 1) {
        res.statusMessage = 'Bad Request';
        res.status(400).send('Bad Request : Invalid Year');
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
 			res.status(402).send('No Charging Statistics found for this User.');
 			return;
 		}

 	});


 };
