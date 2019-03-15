var Sequelize = require('sequelize');
var connectionMysql = require("../config/configMySQL");

var modelThreadUserMaster = connectionMysql.define('threadusermaster', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },threadmaster_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {

        }
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,

    },
}, {
    freezeTableName: true // Model tableName will be the same as the model name
});


module.exports = modelThreadUserMaster;