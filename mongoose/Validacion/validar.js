var moment = require("moment");
var mongoose = require('mongoose');
mongoose.set("debug", true);
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/test");
var Schema = mongoose.Schema;

var weekdays = ['monday', 'tuesday', 'wednesday', 'thursday','friday'];

var Usuario = mongoose.model("Usuario", {
    email: {type:String, unique:true, required:true, validate:{validator:/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, msg:'Email no válido'}}
    ,password: {type:String, required:true}
    ,estado: {type:String, default:'activo'}
    ,vencimiento: {type:Date, default:moment().add(1, 'year').calendar()}
    ,nombre: String
    ,edad: {type:Number, min:18, max:60, required:true}
    ,diaNacimiento: {type: String, match: /^(mon|tues|wednes|thurs|fri)day$/i}
    ,diaPreferido: {type: String, enum: weekdays}    
});

var crearUsuario = function () {
	console.log("Guardando usuario ....");
    var u = new Usuario({
        email: "@.cl"
        , password: "1234"
        , nombre: "Andrés Mora"
        , edad: 17
        , diaNacimiento: "Lunes"
    });    
    u.save( function(error, user){
        if(error) {
            console.log(error);
            console.log("##################################");
            Object.keys(error.errors).forEach(function(element){
                console.log( error.errors[element].message );                
            });
        } else {
            console.log("Usuario guardado correctamente!!!");
        }
    });    
};

crearUsuario();




