var Sequelize = require('sequelize');
var connectionMysql = require("../config/configMySQL");

var modelCommentUserMaster = connectionMysql.define('usertotalcommentmaster', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        validate: {

        }
    },user_id: {
        type: Sequelize.STRING8,
        allowNull: false,
        validate: {

        }
    },
    total_comment: {
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


module.exports = modelCommentUserMaster;