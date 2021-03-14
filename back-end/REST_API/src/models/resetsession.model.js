var dbConn = require('../../config/db.config');
const sha512crypt = require("sha512crypt-node").sha512crypt;
var crypto = require('crypto')
const Resetall = function () { };
const Rest = function () { };

Resetall.Reset = async (result) => {
    var orig_pas = "petrol4ever";
    var ran =crypto.randomBytes(16).toString('base64');
    const salt = '$6$rounds=1000$'+ ran;
    var fin_pas = sha512crypt(orig_pas, salt);
    dbConn.query("UPDATE Admin SET username = 'admin', password = ?",[fin_pas], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result({ "Status": "failed" }, err)
        } else {
            Rest.Reset1(result);
            //Rest.Reset2(result);
            return;
            // console.log("no error");
            // result(null,{"Status": "OK"});
        }
    });
}

Rest.Reset1 = async (result) => {
    dbConn.query("DELETE FROM pays_up", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result({ "Status": "failed" }, err)
        } else {
            //console.log("no error");
            Rest.Reset2(result);
        }
    });
}

Rest.Reset2 = async (result) => {
    dbConn.query("DELETE FROM Charging", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result({ "Status": "failed" }, err)
        } else {
            console.log("no error");
            result(null, { "Status": "OK" });
        }
    });
}

module.exports = Resetall;
