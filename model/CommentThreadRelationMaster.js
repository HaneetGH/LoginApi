var Sequelize = require('sequelize');
var connectionMysql = require("../config/configMySQL");

var modelThreadUserMaster = connectionMysql.define('comment_thread_relation', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        validate: {

        }
    },thread_by: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {

        }
    },
    thread_for: {
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