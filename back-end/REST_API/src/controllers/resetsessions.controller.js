const Resetsessions=require('../models/resetsession.model');


exports.Reset = (req,res)=>{
       Resetsessions.Reset((err, data)=>{
            if(err)
            {
              res.send(err);
              return;
            }
            else {res.send(data); //password changed
            return;
          }
        });
};
