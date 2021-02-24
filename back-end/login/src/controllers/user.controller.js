const User = require('../models/user.model.js');

exports.login = (req, res)=> {  
    let token = req.headers["x-access-token"];
    console.log(token);
    let cat="";
   
    User.findByToken(token,(err,data)=>{
            if(data != "fail"){ return res.status(400).json({
                    error :true,
                    message:"Welcome back "+data
                });
            }else {
                console.log("nikos42 ");
                User.findByManufacturerUsername({'username':req.body.username},function(err,user){
                    if(user) {
                        User.comparePassword(req.body.password,(err,isMatch)=>{
                            if(!isMatch) return res.json({ isAuth : false,message : "password doesn't match"});
                            user.generateToken((err,user)=>{
                                if(err) return res.status(400).send(err);
                                res.cookie('auth',user.token).json({
                                    accessToken: user.token,
                                    id : user._id
                                    ,username : user.username
                                });
                            });
                        });
                    }
                    else {
                        //return res.json({isAuth : false, message : ' Auth failed ,email not found'});
                        User.findBySupplierUsername({'username':req.body.username},function(err,user){
                            if(user) {
                                User.comparePassword(req.body.password,(err,isMatch)=>{
                                    if(!isMatch) return res.json({ isAuth : false,message : "password doesn't match"});
                                    user.generateToken((err,user)=>{
                                        if(err) return res.status(400).send(err);
                                        res.cookie('auth',user.token).json({
                                            accessToken: user.token,
                                            id : user._id
                                            ,username : user.username
                                        });
                                    });
                                });
                            }
                            else {
                                console.log("e: "+Object.getOwnPropertyNames(req.body));
                                console.log(req.body.username);
                                User.findByOwnerUsername({'username':req.body.username},function(err,user){
                                    if(user) {
                                        User.comparePassword(req.body.password,(err,isMatch)=>{
                                            if(!isMatch) return res.json({ isAuth : false,message : "password doesn't match"});
                                            User.generateToken((err,tok)=>{
                                                if(err) return res.status(400).send(err);
                                                res.cookie('auth',tok.token).json({
                                                    accessToken: tok.token
                                                    ,username : tok.username
                                                });
                                            });
                                        });
                                    }
                                    else {
                                        return res.json({isAuth : false, message : ' Auth failed ,email not found'});
                                    } 
                                
                                });
                            } 
                        
                        });
                    } 
                }
                )}
    })
}

