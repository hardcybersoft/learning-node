var express     = require("express");
var passport    = require("passport");
var strategy    = require("passport-http");

// ################################################
// ####### configure passport######################
// ################################################
var BasicStrategy = strategy.BasicStrategy;
passport.use(new BasicStrategy(
    function(username, password, done){
        console.log(`username: ${username}`);
        console.log(`password: ${password}`);
        
        var user = {usuario:"juanito", edad:29};
        var contrasena  = "1234";
        
        if(username == user.usuario && password == contrasena) {
            return done(null, user);
        } else {
            return done(null, false, {message: 'Usuario y/o Password incorrecta!!!'});
        }
    }
));


// #################################################
// ########## express ##############################
// #################################################
var app = express();

app.get("/", passport.authenticate('basic', {session: false}), function(request, response){
    response.send("holi con Basic Auth");
});

app.listen(8080);
