const PaymentModel = require('../models/CreatePayment.model');

function isFloat(n) {
    return Number(n) === n && n % 1 !==0
}

exports.postPayment = (req, res)=> {

    //check if any of the variables is empty
    if ( !( req.params.username > "" && req.params.moneypaid > "" && req.params.paymentway > "" && req.params.bankID > "" && req.params.pointsused > "" ) ) {
        res.statusMessage = 'Bad Request';
        res.status(400).send('Bad Request : Empty Required Field');
        return;
    }

    let m = parseFloat(req.params.moneypaid);
    if ( ( !isFloat(m) && !Number.isInteger(m) ) || m < 0) {
        res.statusMessage = 'Bad Request';
        res.status(400).send('Bad Request : Inserted money is invalid number');
        return;
    }

    let p = parseInt(req.params.pointsused);
    if (!Number.isInteger(p) || p < 0) {
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
                res.send(data)
                return;
            }
            else {
                res.send("something went wrong");
                return;
            }
        });


};
