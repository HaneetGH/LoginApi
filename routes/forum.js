var express = require('express');
var router = express.Router();
var threadmaster = require("../model/ThreadMaster");
var commentthread = require("../model/CommentMaster");
var commenRelationtthread = require("../model/CommentThreadRelationMaster");
var threadusermaster = require("../model/ThreadUserMaster");
var validartion = require("../config/validation");
var connectionMysql = require("../config/configMySQL");


router.get('/create', function (req, res, next) {

    if (validartion.isAllowed(req, res, next)) {


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
            resp = {
                success: true,
                message: 'Success',
            };
            res.send(resp);
            // Transaction has been committed
            // result is whatever the result of the promise chain returned to the transaction callback
        }).catch(err => {

            res.send(err);
            // Transaction has been rolled back
            // err is whatever rejected the promise chain returned to the transaction callback
        })

    } else {
        resp = {
            success: false,
            message: 'Not Auth',
        };
        res.send(resp);
    }

});
router.get('/comment', function (req, res, next) {

    if (validartion.isAllowed(req, res, next)) {


        return connectionMysql.transaction(t => {


            // chain all your queries here. make sure you return them.
            return commentthread.create({

                thread_id: req.body.thread_id,
                comment: req.body.comment
            }, {transaction: t}).then(user => {

                return threadusermaster.create({

                    user_id: req.body.userid,
                    threadmaster_id: user.dataValues.id
                }, {transaction: t}).then(user => {


                   /* const job = queue.createJob({id: user.dataValues.id})
                    job.save();
                    job.on('succeeded', (result) => {
                        console.log(`Received result for job ${job.id}: ${result}`);
                    });*/

                });
                ;
            });

        }).then(result => {
            resp = {
                success: true,
                message: 'Success',
            };
            res.send(resp);
            // Transaction has been committed
            // result is whatever the result of the promise chain returned to the transaction callback
        }).catch(err => {

            res.send(err);
            // Transaction has been rolled back
            // err is whatever rejected the promise chain returned to the transaction callback
        })

    } else {
        resp = {
            success: false,
            message: 'Not Auth',
        };
        res.send(resp);
    }

});

module.exports = router;