var Sequelize = require('sequelize');
var connectionMysql = require("../config/configMySQL");

var modelUser = connectionMysql.define('usermaster', {
    userMasterName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {

        }
    },
    userMasterPass: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'not empty'
            },

        }
    },
}, {
    freezeTableName: true // Model tableName will be the same as the model name
});


module.exports = modelUser;