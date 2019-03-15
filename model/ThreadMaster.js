var Sequelize = require('sequelize');
var connectionMysql = require("../config/configMySQL");

var modelThreadMaster = connectionMysql.define('threadmaster', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },Title: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {

        }
    },
    Post: {
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


module.exports = modelThreadMaster;