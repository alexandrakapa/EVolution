const SessionModel = require('../models/SessionsPerStation.model');

//function that checks if the day in a date is valid (if it is a small enough number)
check_day = (y, m, d) => {
    const months30 = ['04', '06', '09', '11'];
    const months31 = ['01', '03', '05', '07', '08', '10', '12'];

    if (m == 2) {
        if (y % 4 == 0) {
            if (d > 29) {
                return true;                
            }
        }
        else if (d > 28) {
            return true;
        }
    }

    else if (months30.includes(m)) {
        if (d > 30) {
            return true;
        }
    }

    else if (months31.includes(m)) {
        if (d >31) {
            return true;
        }
    }

    return false;
}


exports.getStation = (req, res)=> {

    //check if any of the variables given is empty
  	if (Object.keys(req.params).length!=3){
      res.statusMessage = 'Bad Request';
      res.status(400).send('Bad Request : Empty Required Field');
      return;
    }

    //check if date length is indeed 8 , because we want format yyyymmdd
    if (req.params.yyyymmdd_from.length != 8 || req.params.yyyymmdd_to.length != 8) {
        res.statusMessage = 'Bad Request';
        res.status(400).send('Bad Request : Invalid Date Format');
        return;
    }

    //Start date check
    const from_year = (req.params.yyyymmdd_from).substring(0,4);
    const to_year =  (req.params.yyyymmdd_to).substring(0,4);
    const from_month = (req.params.yyyymmdd_from).substring(4,6);
    const to_month = (req.params.yyyymmdd_to).substring(4,6);
    const from_day = (req.params.yyyymmdd_from).substring(6,8);
    const to_day = (req.params.yyyymmdd_to).substring(6,8);

    //General easy checks: everything must be >= 1 and months must be < 12
    if (from_year < 1 || to_year < 1 || from_month < 1 || from_month > 12 || to_month < 1 || to_month > 12 || from_day < 1 || to_day < 1 ) {
        res.statusMessage = 'Bad Request';
        res.status(400).send('Bad Request : Invalid Dates');
        return;
    }

    //check if day < (right int)
    if (check_day(from_year, from_month, from_day) ) {
        res.statusMessage = 'Bad Request';
        res.status(400).send('Bad Request : Invalid Dates');
        return;       
    }
    if (check_day(to_year, to_month, to_day) ) {
        res.statusMessage = 'Bad Request';
        res.status(400).send('Bad Request : Invalid Dates');
        return;
    }

    //Check if from_date < to_date
    if (from_year > to_year) {
        res.statusMessage = 'Bad Request';
        res.status(400).send('Bad Request : Starting Period Date must precede Ending Period Date');
        return;
    }
    else if (to_year == from_year) {
        if (from_month > to_month) {
            res.statusMessage = 'Bad Request';
            res.status(400).send('Bad Request : FromMonth > ToMonth');
            return;
        }
        else if (to_month == from_month) {
            if (from_day > to_day) {
                res.statusMessage = 'Bad Request';
                res.status(400).send('Bad Request : FromDay > ToDay');
                return;
            }
        }
    }

    //401 error code missing


    //check that the datatype requested is valid
    if (req.query.format!='csv' && req.query.format!=undefined && req.query.format!='json'){
        res.statusMessage = 'Bad Request'
        res.status(400).send("Invalid requested datatype.")
    }

    SessionModel.getStationByID(req, (err, data) => {
        if (err) {
            res.send(err);
            return;
        }

        else if (data.length) {
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
            res.statusMessage = 'No data';
            res.status(402).send('No Chargings for this Station');
            return;
        }
    });
};