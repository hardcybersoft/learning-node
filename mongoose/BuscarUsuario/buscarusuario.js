var mongoose = require('mongoose');
mongoose.set("debug", true);
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/test");
var Schema = mongoose.Schema;

var Usuario = mongoose.model("Usuario", {
    email:{type:String, unique:true, required:true},
    password:{type:String, required:true},
    estado:String,
    vencimiento:Date,
    nombre:String,
    apellidoPaterno:String
});

var borrarUsuarios = function() {
	console.log("Borrando usuarios");
	Usuario.remove({}, function(err){if(err)console.log(err)});
}

var crearUsuario = function () {
	console.log("Guardando usuario ....");
    var u = new Usuario({
        email: "andres@hardcybersoft.cl"
        , password: "1234"
        , estado: "activo"
        , vencimiento: new Date() + 100
        , nombre: "Andrés"
        , apellidoPaterno: "Mora"
    });
    var u2 = new Usuario({
        email: "pablo@hardcybersoft.cl"
        , password: "4321"
        , estado: "activo"
        , vencimiento: new Date() + 100
        , nombre: "Pablo"
        , apellidoPaterno: "Toro"
    });
    u.save(function(error){console.log(error)});
    u2.save(function(error){console.log(error)});
};

var buscarUsuario = function (){
	var doc = {
		email: "pablo@hardcybersoft.cl"
		, password: "4321"
	};
	Usuario.findOne(doc, function(err, objetos){
		console.log(err);
		console.log(objetos);
	});
}

//borrarUsuarios();
//crearUsuario();
buscarUsuario();



