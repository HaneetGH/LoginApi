var express = require('express');
var router = express.Router();
var modelUser = require("../model/User");
var connectionMysql = require("../config/configMySQL");
var validartion = require("../config/validation");
var crypto = require('crypto');
var assert = require('assert');

ALGORITHM = "AES-256-CBC";
HMAC_ALGORITHM = "SHA256";
KEY = crypto.randomBytes(32);
HMAC_KEY = crypto.randomBytes(32);
var key = 'password';
var text = 'I love kittens';
/* GET users listing. */
router.get('/login', function (req, res, next) {

    var password = req.body.password;
    modelUser.findOne({
        where: {
            userMasterName: req.body.PrimaryEmail
        }
    }).then(function (userCompany) {
        if (userCompany) {// si el usuario es de tipo User COmpany
            if (userCompany.userMasterPass === password) {
                user = userCompany;
                var data = {
                    data_user: user,


                };
                var json = validartion.createToken(data, user.PrimaryEmail, "en");
                res.send(json);
            } else {
                res.status(202).send("errors.failedLogin");
            }
        }

        //res.send('respond with a resource');
    });


});
router.get('/fetch', function (req, res, next) {

    var json = validartion.isAllowed(req, res, next);
    if (json.success)
        res.send(json);
    else
        res.send("Other");


});
router.get('/create', function (req, res, next) {
    var IV = new Buffer(crypto.randomBytes(16));
    var cipher = crypto.createCipheriv(ALGORITHM, KEY, IV);
    var encrypted = cipher.update(req.body.password, 'utf8', 'hex') + cipher.final('hex');
    modelUser.findOrCreate({
        where: {//object containing fields to found
            userMasterName: req.body.PrimaryEmail,
            userMasterPass: encrypted
        },

    }).error(function (err) {//error handling
        res.send("FUck");
    }).then(function () {//run your calllback here
        res.send("callback!!");
    });


});
module.exports = router;