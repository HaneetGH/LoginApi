var express = require('express');
var router = express.Router();
var userCommentTotal = require("../model/TotalUserCommentMaster");
var threadusermaster = require("../model/ThreadUserMaster");
var validartion = require("../config/validation");
var connectionMysql = require("../config/configMySQL");



function upsert(condition) {


    userCommentTotal.findOne({
        where: {
            condition
        }
    }).then(function (userCompany) {
        if (userCompany) {//
            userCompany.update({
                total_comment: ++userCompany.total_comment
            })
                .success(function () {
                })

        } else {

            userCommentTotal.create({
                where: {//object containing fields to found
                    condition
                },

            }).error(function (err) {//error handling
                    resp = {
                        success: false,
                        message: 'Fail',
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
        }

        //res.send('respond with a resource');
    });

}

router.get(function (req, res, next) {
  /*  queue.process(async (job) => {
        job.on('succeeded', (result) => {
            upsert({user_id: job.data.id}).then(function (result) {
                res.status(200).send({success: true});
            });

            console.log(`Received result for job ${job.id}: ${result}`);
        });
    });*/
});


module.exports = router;