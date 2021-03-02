var dbConn  = require('../config/db.config');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');
const salt=10;//hash parameter
const dotenv = require("dotenv");
dotenv.config();

exports.verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
  
    if (!token) {
      return res.status(403).send({
        message: "No token given!"
      });
    }
  
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
      if (err) {
        return res.status(401).send({
          message: "Authorization Failed!"
        });
      }
      return res.status(403).send({
        message: decoded.username
      });
    });
  };
