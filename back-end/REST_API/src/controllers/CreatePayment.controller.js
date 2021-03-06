const PaymentModel = require('../models/CreatePayment.model');

function isFloat(n) {
    return Number(n) === n && n % 1 !==0
}

exports.postPayment = (req, res)=> {

    //check if any of the variables given is empty
    if (Object.keys(req.params).length!=5){
        res.statusMessage = 'Bad Request';
        res.status(400).send('Bad Request : Empty Required Field');
        return;
    }

    let m = Number(req.params.moneypaid);
    if ( ( !isFloat(m) && !Number.isInteger(m) ) || m < 0) {
        res.statusMessage = 'Bad Request';
        res.status(400).send('Bad Request : Inserted money is invalid number');
        return;
    }

    if (!Number.isInteger(Number(req.params.pointsused)) || (req.params.pointsused) < 0) {
        res.statusMessage = 'Bad Request';
        res.status(400).send('Bad Request : Inserted points in not an integer');
        return;
    }


    //if (insertpayment)
        PaymentModel.CreateNewPayment(req, (err, data) => {
            if (err) {
                res.send(err);
                return;
            }
            else if (data != null) {
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
                    console.log('error in query.format, should not be here');
                    res.statusMessage = 'Bad Request';
                    res.status(400).send('Bad Request : Invalid format');
                    return;
                }
            }
            else {
                res.send("something went wrong");
                return;
            }
        });


};
