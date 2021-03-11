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
            res.send(data);
            return;
        }

        else {
            res.statusMessage = 'No data';
            res.status(402).send('No data for this username');
            return;
        }
    });
};
