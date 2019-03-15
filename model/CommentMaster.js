var Sequelize = require('sequelize');
var connectionMysql = require("../config/configMySQL");

var modelThreadUserMaster = connectionMysql.define('commentmaster', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        validate: {

        }
    },thread_id: {
        type: Sequelize.STRING8,
        allowNull: false,
        validate: {

        }
    },
    comment: {
        type: Sequelize.INTEGER,
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


module.exports = modelThreadUserMaster;