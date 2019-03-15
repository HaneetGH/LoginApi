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
const bcrypt = require('bcrypt');
const saltRounds = 10;
router.get('/login', function (req, res, next) {

    var password = req.body.password;
    modelUser.findOne({
        where: {
            userMasterName: req.body.PrimaryEmail
        }
    }).then(function (userCompany) {
        if (userCompany) {//

            if (/*userCompany.userMasterPass === password*/bcrypt.compareSync(password, userCompany.userMasterPass)) {
                user = userCompany;
                var data = {
                    data_user: user,


                };
                var json = validartion.createToken(data, user.PrimaryEmail, "en");
                res.send(json);
            } else {
                resp = {
                    success: false,
                    message: 'Wrong Password',
                };
                res.status(202).send(resp);
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
    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
        // Store hash in your password DB.

        if (hash) {
            modelUser.findOrCreate({
                where: {//object containing fields to found
                    userMasterName: req.body.PrimaryEmail,
                    userMasterPass: hash
                },

            }).error(function (err) {//error handling
                resp = {
                    success: false,
                    message: 'Already a member',
                };
                    res.send(resp);

                }
            ).then(function () {//run your calllback here
                resp = {
                    success: true,
                    message: 'Welcome to the party',
                };
                res.send(resp)
            });

        } else res.send("Failed, Try Again");


    });
});
module.exports = router;