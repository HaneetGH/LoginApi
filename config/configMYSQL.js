// mysql  =require('sequelize');

var db = "user"; //"bbb";  //Nombre de la database
var user = "root";//"bbi"; //Usuario de la Data Base
var pass = "password";//"secretBBBPassword!2##4"; //Password de la database

var Sequelize = require('sequelize');


const connecion = new Sequelize(db, user, pass, {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = connecion;