const Consumer = require('../models/consumption_model.js');

exports.consume = (req, res)=> {
    Consumer.fetchStats(req,(err,data) =>{
            if(err){
              res.send(err);
              return;
            }
            else if(data.length){
              res.send(data);
              return;
            }
            else {  
              res.statusMessage='No data';
              res.status(402).send('No charging stations found.');
              return;
            }
    });
}
