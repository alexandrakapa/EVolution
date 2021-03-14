const UploadModel=require('../models/upload_csv_model');
exports.getFile =(req,res) =>{
    let token = req.headers["x-access-token"];
    console.log("token: "+token);
    let cat="";
   
    UploadModel.findByToken(token,(err,data)=>{
            if(data == "fail"){ 
                console.log(data);
                var um = data;
                 res.status(400).json({
                    message:"Invalid data "+um
                });
            }else {
                console.log("DARA:"+data);
                UploadModel.upFile(req,(err,data) => {
                    if (err) {
                        res.send(err);
                        return;
                    }
                    else if (data.length){
                        console.log("DADA:"+data);
                        UploadModel.upDB(data,(error,result) => {
                            if (error) {
                                res.send(error);
                                return;
                            }else{
                                console.log("ok");
                                res.send(result);
                                return;
                            }
                        });
                    }
                    else {
                        res.statusMessage='No data';
                        res.status(402).send('No .');
                        return;
                    }
                });
               
                }
    })
  
    
}