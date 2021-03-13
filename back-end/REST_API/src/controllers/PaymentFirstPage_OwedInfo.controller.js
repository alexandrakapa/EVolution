const SessionModel = require('../models/PaymentFirstPage_OwedInfo.model')

exports.Owed = (req, res)=> {

    //check if parameter is empty
    if ( !( req.params.username > "") ) {
        res.statusMessage = 'Bad Request';
        res.status(400).send('Bad Request : Empty Required Field');
        return;
    }

    SessionModel.getOwedInfo(req, (err, data) => {
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
                return;
            }
            else {
                console.log('error in query.format, should not be here')
            }
        }
        else {
            res.statusMessage = 'No data';
            res.status(402).send('No data for this username');
            return;
        }
    });
};
