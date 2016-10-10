// Dependencias
var express     = require("express");
var mongoose 	= require('mongoose');
var bodyParser  = require("body-parser");
var multer      = require("multer"); // para recibir archivos
// ####################################################################
// conexion BD
mongoose.connect("mongodb://localhost/test");
// ####################################################################
// Modelo Mongoose
var Usuario = mongoose.model("Usuario", {
    username:{type:String, unique:true, required:true},
    password:{type:String, required:true}    
});

// ####################################################################
var app = express();
app.use( bodyParser.json() ); // for parsing application/json
app.use( bodyParser.urlencoded({extended: true}) ); // for parsing application/x-www-form-urlencoded
// ####################################################################
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', false);
    // Pass to next layer of middleware
    next();
});
// ####################################################################

app.get("/", function(req, res){
    res.send("POST /usuario para crear Usuarios, espera datos de usuario y password");
});

app.post("/usuario", function(req, res){
    console.dir(req.body);
    console.log(req.body);
    var usuario = new Usuario(req.body);
    usuario.save(function(err){
		if(err) {
			console.log(err);
		} else {
			console.log("Usuario guardado correctamente");
		}
	});
    res.json(usuario);
});

// server listener options
var port    = process.env.PORT || 3000;
var ip      = process.env.IP || "127.0.0.1";
app.listen(port, ip);

