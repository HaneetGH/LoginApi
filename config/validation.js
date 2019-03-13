var express = require('express');
var app = express();
var jwt = require('jsonwebtoken');
var data_functions = require("./Data");
var resp;
exports.createToken = function (user, email, language) {
    /* var token = jwt.sign(user, app.get('superSecret'), {
         expiresIn: 1377592446 // expires in 24 hours
     });*/
    var token = jwt.sign({user: user}, 'shhhhh');
    // return the information including token as JSON
    resp = {
        success: true,
        message: 'Enjoy your token!',
        rool: user.rool,
        token: token,
        data_user: {
            id: user.data_user.id,
            email: email,
            language: language
        }
    };
    return resp;
};

exports.isAllowed = function (req, res, next) {
    // check header or url parameters or post parameters for token
    var token = req.headers['x-access-token'];

var dataRes;
    // verifies secret and checks exp
    jwt.verify(token, 'shhhhh', function (err, decoded) {


        if (err) {
            var data = {
                success: false,
                msg: "You're Out"
            };
            dataRes= data;
        } else {
            // if everything is good, save to request for use in other routes

            //req.decoded = decoded;
            var data = {
                success: true,
                msg: "You're In"
            };
            dataRes= data;

        }
       /* if (decoded) {
            res.status(200).send({
                success: true,
                msg: "You're In"
            });
            next()
        } else {
            res.status(200).send({
                success: false,
                msg: "You're Out"
            });
            next();
        }*/
    });

return dataRes;
}


