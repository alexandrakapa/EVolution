var dbConn  = require('../../config/db.config');

const Resetall = function (){};
const Rest = function (){};

Resetall.Reset = async(result)=>{
    dbConn.query("UPDATE Administrator SET username = 'admin', password = '1234'", (err, res)=>{
        if(err){
            console.log("error: ", err);
            result({"Status": "failed"}, err)
        }else {
          Rest.Reset2(result);
          return;
          // console.log("no error");
          // result(null,{"Status": "OK"});
        }
    });
}


Rest.Reset2 = async(result)=>{
    dbConn.query("DELETE FROM Charging", (err, res)=>{
        if(err){
            console.log("error: ", err);
            result({"Status": "failed"}, err)
        }else {

          console.log("no error");
          result(null,{"Status": "OK"});
        }
    });
}

module.exports = Resetall;
