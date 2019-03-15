var express = require('express');
var router = express.Router();
var threadmaster = require("../model/ThreadMaster");
var threadusermaster = require("../model/ThreadUserMaster");
var validartion = require("../config/validation");
var connectionMysql = require("../config/configMySQL");
const Queue = require('bee-queue');
const queue = new Queue('example');
router.get('/create', function (req, res, next) {


    return connectionMysql.transaction(t => {


        // chain all your queries here. make sure you return them.
        return threadmaster.create({

            Title: req.body.title,
            Post: req.body.post
        }, {transaction: t}).then(user => {

            return threadusermaster.create({

                user_id: req.body.userid,
                threadmaster_id: user.dataValues.id
            }, {transaction: t});
        });

    }).then(result => {

        res.send(result);
        // Transaction has been committed
        // result is whatever the result of the promise chain returned to the transaction callback
    }).catch(err => {
        res.send(err);
        // Transaction has been rolled back
        // err is whatever rejected the promise chain returned to the transaction callback
    })



});





module.exports = router;