const Login = require('../models/login.model.js');
//console.time("dbsave");
var begin=Date.now();
exports.login = (req, res)=> {  
    if (req.body.password == null) {return res.status(400).json({isAuth : false, message : 'Auth failed, password field is required'});} 
    if (req.body.username == null) {return res.status(400).json({isAuth : false, message : 'Auth failed, username field is required'});} 
    let token = req.headers["x-access-token"];
    let cat="";
   
    Login.findByToken(token,(err,data)=>{
            if(data != "fail"){ 
                var um = data;
                 res.status(400).json({
                    message:"Welcome back "+um
                });
            }else {
                Login.findByAdmin({'username':req.body.username},function(err,login){
                    if(login) {
                        Login.comparePassword(req.body.password,(err,isMatch)=>{
                            if(!isMatch) return res.json({ isAuth : false,message : "password doesn't match"});
                            var end= Date.now();
                            var timeSpent=(end-begin)/1000+"secs";
                            Login.generateToken((err,login)=>{
                                if(err) return res.status(400).send(err);
                                res.cookie('auth',login.token).json({
                                    accessToken: login.token
                                });
                            });
                        });
                    }else{
                    Login.findByManufacturerUsername({'username':req.body.username},function(err,login){
                    if(login) {
                        Login.comparePassword(req.body.password,(err,isMatch)=>{
                            if(!isMatch) return res.json({ isAuth : false,message : "password doesn't match"});
                            var end= Date.now();
                            var timeSpent=(end-begin)/1000+"secs";

                            Login.generateToken((err,login)=>{
                                if(err) return res.status(400).send(err);
                                res.cookie('auth',login.token).json({
                                    accessToken: login.token
                                });
                            });
                        });
                    }
                    else {
                        var end= Date.now();
                        var timeSpent=(end-begin)/1000+"secs";
                        console.log("here: "+timeSpent);
                        //return res.json({isAuth : false, message : ' Auth failed ,email not found'});
                        Login.findBySupplierUsername({'username':req.body.username},function(err,login){
                            if(login) {
                                Login.comparePassword(req.body.password,(err,isMatch)=>{
                                    if(!isMatch) return res.json({ isAuth : false,message : "password doesn't match"});
                                    var end= Date.now();
                                    var timeSpent=(end-begin)/1000+"secs";
                                    console.log("here: "+timeSpent);
                                    Login.generateToken((err,login)=>{
                                        if(err) return res.status(400).send(err);
                                        res.cookie('auth',login.token).json({
                                            accessToken: login.token
                                        });
                                    });
                                });
                            }
                            else {
                                var end= Date.now();
                                var timeSpent=(end-begin)/1000+"secs";
                                console.log("here: "+timeSpent);
                                console.log("e: "+Object.getOwnPropertyNames(req.body));
                                console.log(req.body.username);
                                Login.findByOwnerUsername({'username':req.body.username},function(err,login){
                                    if(login) {
                                        var end= Date.now();
                                        var timeSpent=(end-begin)/1000+"secs";
                                        console.log("here: "+timeSpent);
                                        Login.comparePassword(req.body.password,(err,isMatch)=>{
                                            if(!isMatch) return res.json({ isAuth : false,message : "password doesn't match"});
                                            //console.timeEnd("dbsave");
                                            var end= Date.now();
                                            var timeSpent=(end-begin)/1000+"secs";
                                            console.log("here: "+timeSpent);
                                            Login.generateToken((err,tok)=>{
                                                if(err) return res.status(400).send(err);
                                                res.cookie('auth',tok.token).json({
                                                    accessToken: tok.token
      
                                                });
                                            });
                                        });
                                    }
                                    else {
                                         res.json({isAuth : false, message : 'Auth failed, username not found'});
                                    } 
                                
                                });
                            } 
                        
                        });
                    } 
                }
                
                )}
            }
                )}
    })
}

