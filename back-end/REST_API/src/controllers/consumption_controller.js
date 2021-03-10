const Consumer = require('../models/consumption_model.js');

exports.consume = (req, res)=> {
    let token = req.headers["x-access-token"];



                Consumer.fetchStats(req,(err,data) =>{
                    if(err){
                        res.status(200).json({
                            message:"error occured"
                        });
                    }
                    if(data){
                      //  var final_array=[];
                      //  for(var i=0; i<data.length;i++){
                      //      final_array.push([data[i]['model'],data[i]['SUM(Charging.charging_price)']])
                       // }
                       //  res.status(200).json({
                       //      arr: final_array

                        // });
                        res.status(200).send(data);
                         return;
                        //res.status(200).send();
                    }
                });
}
