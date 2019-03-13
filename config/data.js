var mongoose = require('mongoose');

exports.getData = function (language, res, fun) {
    // body...

    var schema = new mongoose.Schema({ name: 'string', size: 'string' });
    var errors = mongoose.model('Error',schema); //Obtiene el modelo Errors
    var i = 1;
    errors.find(function (err, errors) {
        if (err)
            res.send(500, err.message);
        var arrg = {
        };
        errors.forEach(function (data) {// recorrido de los errores
            data.data.forEach(function (dataLanguage) { // recorrido y deteccion del mensaje respecto al lenguaje
                if (dataLanguage.language === language) {
                    arrg[data.name] = dataLanguage;
                }
            });
            if (i < errors.length) {
                i++;
            } else {
                fun(arrg); // paso a la funcion del arreglo con los mensajes respectivos
            }
        });
    });
};