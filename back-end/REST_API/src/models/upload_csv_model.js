const csv = require('fast-csv');
const csvReader = function (creader){};
const async = import('async');
const fs = require('fs');
var dbConn  = require('../../config/db.config');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const salt=10;//hash parameter
const dotenv = require("dotenv");
const sha512crypt = require("sha512crypt-node").sha512crypt;
const jwt_decode =require("jwt-decode");
dotenv.config();

var fileRows =[];
csvReader.checkToken = async(tokid,tuname, cat,result) =>{
    qur = "SELECT * FROM "+cat+" WHERE username= '"+ tuname+"'";
    // console.log(qur);
    dbConn.query(qur, (err, res)=>{
        if(err){
            console.log('Error while fetching user by username', err);
            result(err, null);
            return;
        }else{
            // console.log(res[0].sessionID);
            if(res[0].sessionID ==tokid){
            result(null, "ok");
            return;
            }else{
                result(null, "no");
                return;
            }
        }
    })
};


csvReader.findByToken = async (tok, result) => {

    if (!tok) {
        result(null,"fail");
        return;
    }else{
        jwt.verify(tok,  process.env.TOKEN_SECRET, (err, decoded) => {
        if (err) {
            result(null,"fail");
            return;
        }else{
        console.log("Token is verified procceding to further details")
        var csid = jwt_decode(tok).sessionID;
        var csum = jwt_decode(tok).username;
        var csct = jwt_decode(tok).category;
        csvReader.checkToken(csid,csum,csct,(err,res)=>{
            if(err){
                console.log(err);
                result(null,"fail");
            }
            if(res == "ok" && csct == "Admin" ){

                result(null,csum);
                return;
            }else{
                result(null,"fail");
                return;
            }
        });

        }
        });
    }
    console.log("result: "+result);
  };
csvReader.upFile =  ((req, result) => {
    fileRows =[];
    // console.log(req.file);
    // console.log(Object.getOwnPropertyNames(req.file));
    // console.log(Object.getOwnPropertyNames(req));
    csv.parseFile(req.file.path)
    .on("data", function (data) {
      fileRows.push(data); // push each row
    })
    .on("end", function () {
      //fs.unlink(req.file.path);
      fs.unlink(req.file.path, (err => { 
        if (err) console.log(err); 
        else { 
          console.log("\nDeleted file: example_file.txt");  
        } 
      })); 
      result(null,fileRows);
      return;
    })
});
csvReader.upDB =  ((data, result) => {
    var to_exec = "INSERT INTO Charging VALUES ";
    for(var i=0; i<data.length;i++){
        //console.log("object: "+i);
        cur="";
        for(var j=0; j<data[i].length;j++){
            //console.log("this: "+j+" : "+ data[i][j]);
            cur += data[i][j];
        }
        var data_ar = cur.split(';');
        var cur_to_exec = "(";
        for (var k=0; k<data_ar.length;k++){
            if(k <data_ar.length-1){
                if(k==0 || k==1||k==2||k==3 || k==5||k==8||k==13||k==14||k==15||k==16 ){
                    cur_to_exec += "'"+data_ar[k]+"',";
                }else{
                    cur_to_exec += data_ar[k] + ",";
                }

            }else{
                cur_to_exec += data_ar[k];
            }
        }

        cur_to_exec += "),"
        to_exec += cur_to_exec;
  }
//   console.log(to_exec);
to_exec = to_exec.slice(0, -1);
//   result(null,"okey dokey");
    dbConn.query(to_exec,(er,re)=>{
        if(er){
            result(er,null);
            return;
        }else{
            result(null,er);
            return;
        }
    });
});

module.exports=csvReader;
